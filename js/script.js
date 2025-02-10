const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

// Initial word to test the game
const word = "magnolia";


// Function to display the symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

// Event listener for Guess! button
guessButton.addEventListener ("click", function (e) {
    //  Prevent reloading of page after button click
    e.preventDefault();
    const guess = textInput.value;
    //console.log(guess);
    textInput.value = "";
});

// Text input checker
const checkInput = function (input)  {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
// Message for empty input
        message.innerText = "Please enter a letter";
    } else if (input.legth > 1) {
// Message for more than one letter
        message.innerText = "Please enter one letter only";
    } else if (!input.match(acceptedLetter)) {
// Message for non-letter input
        message.innerText = "Please enter a letter from A to Z";
    } else {

        return input;
    }
};