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
const guessedLettersArray = [];


// Function to display the symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        // console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

// Event listener for Guess! button
guessButton.addEventListener ("click", function (e) {
    //  Prevent reloading of page after button click
    e.preventDefault();
    // Blank message paragraph
    message.innerText = "";
    // Input value
    const guess = textInput.value;
    // Input value check
    const legitGuess = checkInput(guess);

    if (legitGuess) {
        // If the input is a letter, add it to the guessed letters list
        makeGuess(guess);
    }
    //console.log(guess);

    textInput.value = "";
});

// Text input checker
const checkInput = function (input)  {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        // Message for empty input
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        // Message for more than one letter
        message.innerText = "Please enter one letter only";
    } else if (!input.match(acceptedLetter)) {
        // Message for non-letter input
        message.innerText = "Please enter a letter from A to Z";
    } else {
        // Valid input
        return input;
    }
};

// Function to capture input
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLettersArray.includes(guess)) {
        message.innerText = "Woops! You've already guessed that letter. Let's give it another go.";
    } else {
        guessedLettersArray.push(guess);
        console.log(guessedLettersArray);
        showGuessedLettersArray();
        updateWordInProgress(guessedLettersArray);
    }
};

// Function to update the page with guessed letters
const showGuessedLettersArray = function () {
    // Clear the list
    guessedLetters.innerHTML = "";
    for (const letter of guessedLettersArray) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLetters.append(li);
    }
};

// Function to update the word in progress
const updateWordInProgress = function (guessedLettersArray) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for(const letter of wordArray){
        if (guessedLettersArray.includes(letter)){
        revealWord.push(letter.toUpperCase());
        } else {
        revealWord.push("●");
        }
    }
    console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
}