// Game setup
let colors = ['#FF5733', '#FF5733', '#33FF57', '#33FF57', '#3357FF', '#3357FF', '#F3FF33', '#F3FF33', 
    '#FF33A6', '#FF33A6', '#33FFF3', '#33FFF3', '#FFD733', '#FFD733', '#A633FF', '#A633FF', 
    '#33FFA1', '#33FFA1', '#FF5733', '#FF5733']; // 10 pairs (20 cards)
let shuffledColors;
let cards = [];
let flippedCards = [];
let turns = 0;
let matchedPairs = 0;
let timerInterval;
let timeElapsed = 0;

// Gameboard and stats
const gameBoard = document.getElementById('game-board');
const turnsDisplay = document.getElementById('turns');
const timeDisplay = document.getElementById('time');
const playAgainButton = document.getElementById('play-again');

// Shuffle the cards
function shuffle(array) {
return array.sort(() => 0.5 - Math.random());
}

// Create the card elements and append them to the board
function createCards() {
shuffledColors = shuffle([...colors]); // Clone and shuffle the array
gameBoard.innerHTML = ''; // Clear the game board

shuffledColors.forEach(color => {
const card = document.createElement('div');
card.classList.add('card');

const cardInner = document.createElement('div');
cardInner.classList.add('card-inner');

const cardFront = document.createElement('div');
cardFront.classList.add('card-front');

const cardBack = document.createElement('div');
cardBack.classList.add('card-back');
cardBack.style.backgroundColor = color; // Assign color to card back

cardInner.appendChild(cardFront);
cardInner.appendChild(cardBack);
card.appendChild(cardInner);

card.addEventListener('click', () => flipCard(card, color));

gameBoard.appendChild(card);
cards.push(card);
});
}

// Handle card flip
function flipCard(card, color) {
if (flippedCards.length === 2 || card.classList.contains('flipped')) return;

card.classList.add('flipped');
flippedCards.push({ card, color });

if (flippedCards.length === 2) {
checkMatch();
}
}

// Check for match
function checkMatch() {
turns++;
turnsDisplay.textContent = turns;

const [firstCard, secondCard] = flippedCards;

if (firstCard.color === secondCard.color) {
matchedPairs++;
firstCard.card.classList.add('hidden');
secondCard.card.classList.add('hidden');
} else {
setTimeout(() => {
firstCard.card.classList.remove('flipped');
secondCard.card.classList.remove('flipped');
}, 1000);
}

flippedCards = [];

if (matchedPairs === colors.length / 2) {
clearInterval(timerInterval);
alert(`You've matched all pairs in ${turns} turns and ${timeElapsed} seconds!`);
}
}

// Start the timer
function startTimer() {
clearInterval(timerInterval);
timeElapsed = 0;
timeDisplay.textContent = timeElapsed;

timerInterval = setInterval(() => {
timeElapsed++;
timeDisplay.textContent = timeElapsed;
}, 1000);
}

// Reset the game
function resetGame() {
turns = 0;
matchedPairs = 0;
flippedCards = [];
turnsDisplay.textContent = 0;
createCards();
startTimer();
}

// Initialize the game
function initGame() {
resetGame();
}

// Play again button click
playAgainButton.addEventListener('click', resetGame);

window.onload = initGame;
