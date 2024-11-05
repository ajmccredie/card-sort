let images = [
  'images/image1.png', 'images/image1.png', 'images/image2.png', 'images/image2.png',
  'images/image3.png', 'images/image3.png', 'images/image4.png', 'images/image4.png',
  'images/image5.png', 'images/image5.png', 'images/image6.png', 'images/image6.png',
  'images/image7.png', 'images/image7.png', 'images/image8.png', 'images/image8.png',
  'images/image9.png', 'images/image9.png', 'images/image10.png', 'images/image10.png'
];

let shuffledImages;
let cards = [];
let flippedCards = [];
let turns = 0;
let matchedPairs = 0;
let timerInterval;
let timeElapsed = 0;
let timerStarted = false;
const confettiCount = 50;

const gameBoard = document.getElementById('game-board');
const turnsDisplay = document.getElementById('turn-count');
const timeDisplay = document.getElementById('timer');
const playAgainButton = document.getElementById('play-again-btn');
const startOverButton = document.getElementById('start-over-btn');

// Shuffle the images
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Create cards
function createCards() {
  shuffledImages = shuffle([...images]);
  gameBoard.innerHTML = '';

  shuffledImages.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.style.backgroundImage = `url(${image})`;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    // Start timer on the first card flip
    card.addEventListener('click', () => {
      if (!timerStarted) {
        startTimer();
        document.getElementById('instructions').style.display = 'none'; // Hide instructions
        timerStarted = true;
      }
      flipCard(card, image);
    });

    gameBoard.appendChild(card);
    cards.push(card);
  });
}

// Flip card function
function flipCard(card, image) {
  if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('hidden')) return;

  card.classList.add('flipped');
  flippedCards.push({ card, image });

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Check for a match
function checkMatch() {
  turns++;
  turnsDisplay.textContent = turns;

  const [firstCard, secondCard] = flippedCards;

  if (firstCard.image === secondCard.image) {
    matchedPairs++;
    setTimeout(() => {
      firstCard.card.classList.add('hidden');
      secondCard.card.classList.add('hidden');
    }, 500);
  } else {
    setTimeout(() => {
      firstCard.card.classList.remove('flipped');
      secondCard.card.classList.remove('flipped');
    }, 1000);
  }

  flippedCards = [];

  if (matchedPairs === images.length / 2) {
    endGame();
  }
}

// Update time display in hours, minutes, seconds format
function updateTimeDisplay() {
  const hours = String(Math.floor(timeElapsed / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((timeElapsed % 3600) / 60)).padStart(2, '0');
  const seconds = String(timeElapsed % 60).padStart(2, '0');
  timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// Start the timer
function startTimer() {
  clearInterval(timerInterval);
  timeElapsed = 0;
  updateTimeDisplay();

  timerInterval = setInterval(() => {
    timeElapsed++;
    updateTimeDisplay();
  }, 1000);
}

// Celebration confetti
function launchConfetti() {
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    document.body.appendChild(confetti);
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    setTimeout(() => confetti.remove(), 5000);
  }
}

// End game
function endGame() {
  clearInterval(timerInterval);
  launchConfetti();
  $('#celebrationModal').modal('show');
  document.getElementById('final-turns').textContent = turns;
  document.getElementById('final-time').textContent = timeDisplay.textContent;
}

// Reset the game
function resetGame() {
  turns = 0;
  matchedPairs = 0;
  flippedCards = [];
  turnsDisplay.textContent = 0;
  timeDisplay.textContent = '00:00:00';
  timerStarted = false;
  document.getElementById('instructions').style.display = 'block'; // Show instructions again
  createCards();
}

// Event listeners
startOverButton.addEventListener('click', resetGame);
playAgainButton.addEventListener('click', resetGame);
document.getElementById('play-again-modal-btn').addEventListener('click', () => {
  resetGame();
  $('#celebrationModal').modal('hide');
});

// Initialize the game board on load
window.onload = createCards;
