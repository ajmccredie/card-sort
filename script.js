// Game setup: Use image pairs instead of color pairs
let images = [
    'images/image1.png', 'images/image1.png', 'images/image2.png', 'images/image2.png', 
    'images/image3.png', 'images/image3.png', 'images/image4.png', 'images/image4.png', 
    'images/image5.png', 'images/image5.png', 'images/image6.png', 'images/image6.png', 
    'images/image7.png', 'images/image7.png', 'images/image8.png', 'images/image8.png', 
    'images/image9.png', 'images/image9.png', 'images/image10.png', 'images/image10.png'
  ]; // 10 pairs of images
  
  let shuffledImages;
  let cards = [];
  let flippedCards = [];
  let turns = 0;
  let matchedPairs = 0;
  let timerInterval;
  let timeElapsed = 0;
  const confettiCount = 50; // Number of confetti elements
  
  // Gameboard and stats
  const gameBoard = document.getElementById('game-board');
  const turnsDisplay = document.getElementById('turns');
  const timeDisplay = document.getElementById('time');
  const playAgainButton = document.getElementById('play-again');
  const celebration = document.getElementById('celebration');
  const finalScoreDisplay = document.getElementById('final-score');
  
  // Shuffle the images
  function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
  }
  
  // Create the card elements and append them to the board
  function createCards() {
    shuffledImages = shuffle([...images]); // Clone and shuffle the array
    gameBoard.innerHTML = ''; // Clear the game board
    
    shuffledImages.forEach(image => {
      const card = document.createElement('div');
      card.classList.add('card');
      
      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner');
      
      const cardFront = document.createElement('div');
      cardFront.classList.add('card-front');
      
      const cardBack = document.createElement('div');
      cardBack.classList.add('card-back');
      cardBack.style.backgroundImage = `url(${image})`; // Assign image to card back
      
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);
      
      card.addEventListener('click', () => flipCard(card, image));
      
      gameBoard.appendChild(card);
      cards.push(card);
    });
  }
  
  
  // Handle card flip
  function flipCard(card, image) {
      if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('hidden')) return;
      
      card.classList.add('flipped');
      flippedCards.push({ card, image });
      
      if (flippedCards.length === 2) {
          checkMatch();
      }
  }
  
  // Check for match
  function checkMatch() {
      turns++;
      turnsDisplay.textContent = turns;
      
      const [firstCard, secondCard] = flippedCards;
      
      if (firstCard.image === secondCard.image) {
          matchedPairs++;
          setTimeout(() => {
              // Make the matched cards invisible using the hidden class
              firstCard.card.classList.add('hidden');
              secondCard.card.classList.add('hidden');
          }, 500);
      } else {
          // If they don't match, flip them back over after 1 second
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
  
  // End the game
  function endGame() {
      clearInterval(timerInterval);
      
      // Show the celebration message and final score
      celebration.style.display = 'block';
      finalScoreDisplay.textContent = `You completed the game in ${turns} turns and ${timeElapsed} seconds!`;
      
      // Trigger confetti animation (as before)
      for (let i = 0; i < confettiCount; i++) {
          let confetti = document.createElement('div');
          confetti.classList.add('confetti');
          document.body.appendChild(confetti);
          
          // Set random position and animation
          confetti.style.left = Math.random() * 100 + 'vw';
          confetti.style.animationDelay = Math.random() * 2 + 's';
          setTimeout(() => confetti.remove(), 5000); // Remove confetti after 5 seconds
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
    
    // Hide the celebration message and remove confetti
    celebration.style.display = 'none';
    document.querySelectorAll('.confetti').forEach(confetti => confetti.remove());
  }
  
  // Initialize the game
  function initGame() {
    resetGame();
  }
  
  // Play again button click
  playAgainButton.addEventListener('click', resetGame);
  
  window.onload = initGame;
  