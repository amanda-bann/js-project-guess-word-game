const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesDisplay = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

// Initial word to test the game
let word = "magnolia";
const guessedLettersArray = [];
let remainingGuesses = 8;


// Function to fetch words from the API
const getWord = async function () {
    const reponse = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await reponse.text();
    const wordArray = words.split("\n");
    // console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

// Call the function to start the game
getWord();
// Function to display the symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        // console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

// placeholder(word);

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
        countGuesses(guess);
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
    // Call the function to check if the player has won
    checkWin();
};

// Function to count remaining guesses
const countGuesses = function (guess) {
    const wordUpper = word.toUpperCase();
    if(!wordUpper.includes(guess)){
        message.innerText = `Sorry, the word has no ${guess}`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Nice! The word does have the letter ${guess}`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over!! The word was <span class="highlight">${word}</span>`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};


// Function to check if the player has won
const checkWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};