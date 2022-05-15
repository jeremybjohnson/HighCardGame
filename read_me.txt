Game Rules

Game board features 12 independent decks.
Players take turns selecting one card at a time.
The value of the cards are: aces - 1, numbered cards - number on card, face cards - 10.
After the 12th card is drawn, the player with the most points wins.
The start button resets the game to play again.


Code Notes

HTML & CSS
HTML document uses Bootstrap Grid for a layout.
Id's are used for the player heading, score box and score for css.
Classes, .cards and .cardsRow are used to reference cards for CSS.
Each card has an ID. They are organized as card-row-column starting at 1.
For example, card22 is the second card in the second row.
Each button ties a card image to an onclick function of the form countCard22().
The numbering scheme is identical to the card ID.
The start button calls startGame() which resets the game board and scores.
The deck backs are randomly picked from a set of 6 colors.

Javascript

Classes
2 classes are used for the game. Card and Deck.
Card defines the suit, rank and value of the cards. Aces are value 1, face cards are value 10 and numbered cards have a value of their number.
Deck generates a list "cards" contains 2 methods createDeck (creates the deck) and shuffleDeck(shuffles the deck).

Global Variables
Player scored - player1Score, player2Score
turnCounter = starts at 1 and increments each turn. Odd number turnCounter equates to player 1's turn. Even numbers are player 2's turn.

Functions

startGame() - resets scores, counter and onclick styling. It also randomly assigns card back designs from a set of 6 designs. Finally it reenables the onclick capability of the button tied to each card.

updateScore(cardValue) - determines the player turn and increments the appropriate score by cardValue. Increments turnCounter.

getRandomInt(min, max) - determines inclusive random int from min to max.

timer() - is used with checkWinner() to delay alert dialog until final card is revealed

checkWinner() - Displays the winner and scores after the last card is revealed.

countCard(cardId) - takes the card ID as an argument
Calls Deck class, creates a deck and shuffles it.
The first card is drawn.
cardDrawn concatenates the rank and suit of the card to be used to call the card image.
cardValue returns the value of the card for score keeping.
The image of the drawn card is inserted.
onClick is disabled for that deck.
Player 1 cards are outlined with red.
Player 2 cards are outlined with blue.
updateScore is called to update the score.
timer is called to check if the game is completed and assign a winner.
