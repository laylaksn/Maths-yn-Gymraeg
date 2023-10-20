const flashcardData = [
  { "english": "Addition", "welsh": "Ychwanegu" },
  { "english": "Subtraction", "welsh": "Tynnu" },
  { "english": "Function", "welsh": "Ffwythiant" },
  // Add more terms here
];

function shuffleFlashcards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Get elements from the DOM
const termElement = document.getElementById('term');
const translationInput = document.getElementById('translation');
const nextButton = document.getElementById('nextBtn');
const scoreElement = document.getElementById('score');

// Initialize a variable to keep track of the current flashcard index and the score
let currentCardIndex = 0;
let score = 0;

// Function to display the current flashcard
function showCurrentCard() {
  termElement.textContent = flashcardData[currentCardIndex].welsh;
  translationInput.value = ''; // Clear the input field for each new flashcard
}

// Event listener for the "Next Card" button
nextButton.addEventListener('click', () => {
  handleNextCard();
});

// Event listener for the Enter key press in the input field
translationInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    handleNextCard();
  }
});

// Function to handle going to the next card
function handleNextCard() {
  // Get the expected translation for the current flashcard
  const expectedTranslation = flashcardData[currentCardIndex].english;

  // Check if the entered translation matches the expected translation (case-insensitive)
  if (translationInput.value.toLowerCase() === expectedTranslation.toLowerCase()) {
    score++; // Increase the score for a correct translation
  }

  // Update the score display
  scoreElement.textContent = 'Score: ' + score;

  currentCardIndex++;

  if (currentCardIndex >= flashcardData.length) {
    // All flashcards have been shown; reset the index and reshuffle (optional)
    currentCardIndex = 0;
    shuffleFlashcards(flashcardData);
  }

  showCurrentCard();
}

// Call showCurrentCard() to display the first flashcard when the page loads
showCurrentCard();