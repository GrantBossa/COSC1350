//
//	Student Name:  Grant Bossa
//	File Name: guessingGame.js
//	Date Created: Oct 30, 2024
// considerations for Game

// VARIABLES
var inputGuess;
let myNumber = 0;
let guessCount = 0;
let guessLimit = 10;
var guessPrevious = []; // previous guesses

function processGuess() {
  if (guessCount == 0) {
    // choose a random number between 1 and 100 (inclusive)
    myNumber = Math.floor(Math.random() * 100 + 1);
    //alert("myNumber is : " + myNumber)
    guessCount += 1;
    // debugging
    document.getElementById("myNumber").innerHTML = myNumber;
  }
  // challenge the player to guess the number in 10 turns

  // The game will end once the player guesses correctly, or once they run out of turns.
  // When the game ends, the player should be given an option to start playing again.
  inputGuess = document.getElementById("inputGuess").value* 1;
    
  // validate the input guess
  if (!validateInputGuess() == true) {
    clearInputGuess();
    return;
  }

  if (guessCount <= guessLimit) {
    // After each turn, the player should be told if they are right or wrong
    // and if they are wrong, whether the guess was too low or too high.
    if (inputGuess === myNumber) {
      alert("Game Over! You have guessed the correct number: " + myNumber);
      gameOverProcessing();
      return ;
    } else if (inputGuess < myNumber) {
      alert("Guess number " + guessCount + " : " + inputGuess +" Was too low! Try again." + myNumber );
    } else {
      alert( "Guess number " + guessCount + " : " + inputGuess + " Was too high! Try again." + myNumber );
    }
    guessPrevious[guessCount - 1] = inputGuess 
    document.getElementById("guessCount").innerHTML = guessCount;
    guessCount += 1;
  } else {
    alert( "Game Over! You used all of your turns. The correct number was " + myNumber  );
    gameOverProcessing();
    return ;  
  }
  
  // tell the player what numbers they previously guessed
   document.getElementById("guessPrevious").innerHTML += inputGuess + "  ";
   clearInputGuess();

  // end of processing
  return ;
  
  // JavaScript function that prompts for a yes or no answer
  function askYesNoQuestion(question) {
    let answer = prompt(question + " (yes or no)");
    if (answer.toLowerCase() === "yes") {
      return true;
    } else if (answer.toLowerCase() === "no") {
      return false;
    } else {
      // If the user enters an invalid response, prompt again
      alert("Please enter 'yes' or 'no'");
      return askYesNoQuestion(question);
    }
  }

  // Clear the input text so that the last value doesn't show
  function clearInputGuess() {
    document.getElementById("inputGuess").value = "";
  }

  // common closing point for processing out of turns or correct guess
  function gameOverProcessing() {
    let answer = askYesNoQuestion("Do you want to continue playing?");
    if (answer) {
      alert("Great, me too!");
    } else {
      alert("Oh No! I loved playing with you.");
    }
    // reset values for new game
    clearInputGuess();
    guessPrevious = [];
    guessCount = 0;
    document.getElementById("guessPrevious").innerHTML = "";
    document.getElementById("myNumber").innerHTML = "";
    document.getElementById("guessCount").innerHTML = "";
  }

  // Validate input guess values for alphanumeric, greater than 100 or less than 0
  function validateInputGuess() {
    if (inputGuess > 100 || inputGuess <= 0 || isNaN(inputGuess)) {
      alert("Please enter a number between 1 and 100.");
      return false;
    } else {
      return true;
    }
  }
}
