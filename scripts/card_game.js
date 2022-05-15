"use strict";

class Card {
  constructor(suit, rank, value){
    this.suit = suit;
    this.rank = rank;
    this.value = value;
  }
}

class Deck {
  constructor() {
    this.cards = [];
  }
  createDeck() {
    var suits = ['C', 'S', 'H', 'D']
    var ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

    for (var i=0; i < suits.length; i++) {
      for (var j=0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j], values[j]))
      }
    }
  }
  shuffleDeck() {
    var location1, location2, tmp;
    for (var i= 0; i < 1000; i++) {
      location1 = Math.floor(Math.random() * this.cards.length)
      location2 = Math.floor(Math.random() * this.cards.length)
      tmp = this.cards[location1];
      this.cards[location1] = this.cards[location2];
      this.cards[location2] = tmp;
    }
  }
}

// set global variables for player scores and turn counter
var player1Score = 0;
var player2Score = 0;
var turnCounter = 1;

function startGame() {
  // Reset scores and game counter
  player1Score = 0;
  document.getElementById("p1Score").innerHTML = player1Score;
  player2Score = 0;
  document.getElementById("p2Score").innerHTML = player2Score;
  turnCounter = 1;
  // reset onclick for cards, random card backs and remove card styles
  // count over 3 rows
  for(var i = 1; i < 4; i++) {
    // count over 4 columns
    for(var j = 1; j < 5; j++){
      // reset onclick
      var x = document.getElementById("card" + i.toString() + j.toString())
      x.disabled = false;
      // generate random number for card backs
      var num = getRandomInt(1, 6);
      // random card back design
      x.innerHTML = "<img src='PNG/backs/" + num + ".png' class='cards'>";
      // reset onclick borders and background colors for cards
      x.style.border = "";
      x.style.backgroundColor = "";
    }
  }
}

function updateScore(cardValue) {
  // if player 1 turn - odd turnCounter
  if (turnCounter % 2 != 0) {
    player1Score += cardValue;
    document.getElementById("p1Score").innerHTML = player1Score;
  }
  // else player 2 turn - even turnCounter
  else {
    player2Score += cardValue;
    document.getElementById("p2Score").innerHTML = player2Score;
  }
  // increment turn counter to swap players
  turnCounter++;
}

function getRandomInt(min, max) {
  // return random integer inclusive of min and max
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function winnerTimer() {
  // timer function for checkWinner
  var x = setTimeout(checkWinner, 2000);
}

function checkWinner() {
  // displays the winner of the game
  if (turnCounter == 13 && player1Score > player2Score) {
    alert("Player 1 Wins " + player1Score + " to " + player2Score + ". Press start to try again.");
  }
  if (turnCounter == 13 && player2Score > player1Score) {
    alert("Player 2 Wins " + player2Score + " to " + player1Score  + ". Press start to try again.");
  }
  if (turnCounter == 13 && player2Score == player1Score) {
    alert("We have a tie. Press start to try again.");
  }
}

function countCard(cardId) {
  // generate and shuffle a deck of cards
  var deck = new Deck();
  deck.createDeck();
  deck.shuffleDeck();
  // draw the first card - use rank and suit to form image name
  var cardDrawn = deck.cards[0].rank + deck.cards[0].suit + ".png";
  var cardValue = deck.cards[0].value;

  var x = document.getElementById(cardId)
  // insert image of drawn card
  x.innerHTML = "<img src='PNG/" + cardDrawn + "' class='cards'>";
  // disable onclick
  x.disabled = true;

  // put colored border around card based on player number
  if (turnCounter % 2 != 0) {
    x.style.border = "3px solid IndianRed";
    x.style.borderRadius = "10px";
    x.style.backgroundColor = "IndianRed";
  }
  else {
    x.style.border = "3px solid SteelBlue";
    x.style.borderRadius = "10px";
    x.style.backgroundColor = "SteelBlue";
  }
  // update player score
  updateScore(cardValue);
  winnerTimer();
}
