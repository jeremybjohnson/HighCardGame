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
    let suits = ['C', 'S', 'H', 'D'];
    let ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

    for (let i=0; i < suits.length; i++) {
      for (let j=0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j], values[j]))
      }
    }
  }
  shuffleDeck() {
    let location1, location2, tmp;
    for (let i= 0; i < 1000; i++) {
      location1 = Math.floor(Math.random() * this.cards.length)
      location2 = Math.floor(Math.random() * this.cards.length)
      tmp = this.cards[location1];
      this.cards[location1] = this.cards[location2];
      this.cards[location2] = tmp;
    }
  }
}

// set global let iables for player scores and turn counter
let player1Score = 0;
let player2Score = 0;
let turnCounter = 1;

function startGame() {
  // Reset scores and game counter
  player1Score = 0;
  document.getElementById("p1Score").innerHTML = player1Score;
  document.getElementById("playerScore1").style.backgroundColor = "lightgreen";
  player2Score = 0;
  document.getElementById("p2Score").innerHTML = player2Score;
  document.getElementById("playerScore2").style.backgroundColor = "lightgray";
  turnCounter = 1;
  // reset onclick for cards, random card backs and remove card styles
  // count over 3 rows
  for(let i = 1; i < 4; i++) {
    // count over 4 columns
    for(let j = 1; j < 5; j++){
      // reset onclick
      let x = document.getElementById("card" + i.toString() + j.toString())
      x.disabled = false;
      // generate random number for card backs
      let num = getRandomInt(1, 6);
      // random card back design
      x.innerHTML = "<img src='PNG/backs/" + num + ".png' class='cards img-fluid'>";
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
    document.getElementById("playerScore2").style.backgroundColor = "lightgreen";
    document.getElementById("playerScore1").style.backgroundColor = "lightgray";
  }
  // else player 2 turn - even turnCounter
  else {
    player2Score += cardValue;
    document.getElementById("p2Score").innerHTML = player2Score;
    document.getElementById("playerScore1").style.backgroundColor = "lightgreen";
    document.getElementById("playerScore2").style.backgroundColor = "lightgray";
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

function checkWinner() {
  // displays the winner of the game
  if (player1Score > player2Score) {
    alert("Player 1 Wins " + player1Score + " to " + player2Score + ". Press start to try again.");
  }
  if (player2Score > player1Score) {
    alert("Player 2 Wins " + player2Score + " to " + player1Score  + ". Press start to try again.");
  }
  if (player2Score === player1Score) {
    alert("We have a tie. Press start to try again.");
  }
}

function countCard(cardId) {
  // generate and shuffle a deck of cards
  let deck = new Deck();
  deck.createDeck();
  deck.shuffleDeck();
  // draw the first card - use rank and suit to form image name
  let cardDrawn = deck.cards[0].rank + deck.cards[0].suit + ".png";
  let cardValue = deck.cards[0].value;

  let x = document.getElementById(cardId)
  // insert image of drawn card
  x.innerHTML = "<img src='PNG/" + cardDrawn + "' class='cards img-fluid'>";
  // disable onclick
  x.disabled = true;

  // put colored border around card based on player number
  if (turnCounter % 2 !== 0) {
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
  if (turnCounter === 13) {
      checkWinner();
  }
}
