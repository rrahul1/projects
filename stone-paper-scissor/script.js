// Constants for the game choices
const choices = ["stone", "paper", "scissors"];

// Elements
const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const resultMessageEl = document.getElementById("result-message");
const userChoiceResultEl = document.getElementById("user-choice-result");
const computerChoiceResultEl = document.getElementById(
   "computer-choice-result"
);
const userScoreResultEl = document.getElementById("user-score-result");
const computerScoreResultEl = document.getElementById("computer-score-result");
const homeScreen = document.getElementById("home-screen");
const resultScreen = document.getElementById("result-screen");
const nextScreen = document.getElementById("next-screen");
const playAgainResultButton = document.getElementById("play-again-result");
const playAgainNextButton = document.getElementById("play-again-next");
const resetButton = document.getElementById("reset");
const rulesButton = document.getElementById("rules");
const rulesDisplay = document.getElementById("rules-display");
const closeRulesButton = document.getElementById("close-rules");
const choiceButtons = document.querySelectorAll(".choice");
const winMessageEl = document.getElementById("win-message");
const nextButton = document.getElementById("next");
const pcScoreRes = document.getElementById("computer-choice-result");
const userScorRes = document.getElementById("user-choice-result");
const choice = document.querySelectorAll(".choice");

// Scores
let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

// Update the scores on the UI
userScoreEl.textContent = userScore;
computerScoreEl.textContent = computerScore;
userScoreResultEl.textContent = userScore;
computerScoreResultEl.textContent = computerScore;

// Event listeners
choiceButtons.forEach((button) => {
   button.addEventListener("click", handleChoice);
});

playAgainResultButton.addEventListener("click", () => {
   resultScreen.classList.add("hidden");
   homeScreen.classList.remove("hidden");
});

playAgainNextButton.addEventListener("click", () => {
   nextScreen.classList.add("hidden");
   homeScreen.classList.remove("hidden");
});

// Functions
function handleChoice(event) {
   const userChoice = event.target.getAttribute("data-choice");
   const computerChoice = choices[Math.floor(Math.random() * choices.length)];
   const result = determineWinner(userChoice, computerChoice);
   if (result !== "draw") {
      updateScores(result);
   }
   displayResult(userChoice, computerChoice, result);
   homeScreen.classList.add("hidden");
   resultScreen.classList.remove("hidden");
   // Show/hide Next button based on result
   if (result === "user") {
      nextButton.classList.remove("hidden");
      nextButton.addEventListener("click", () => {
         resultScreen.classList.add("hidden");
         winMessageEl.textContent = "Hurray!!";
         nextScreen.classList.remove("hidden");
      });
   } else {
      nextButton.classList.add("hidden");
   }
}

function determineWinner(userChoice, computerChoice) {
   if (userChoice === computerChoice) return "draw";
   if (
      (userChoice === "stone" && computerChoice === "scissors") ||
      (userChoice === "paper" && computerChoice === "stone") ||
      (userChoice === "scissors" && computerChoice === "paper")
   ) {
      return "user";
   }

   return "computer";
}

function updateScores(result) {
   if (result === "user") {
      userScore++;
      localStorage.setItem("userScore", userScore);
   } else if (result === "computer") {
      computerScore++;
      localStorage.setItem("computerScore", computerScore);
   }
   userScoreEl.textContent = userScore;
   computerScoreEl.textContent = computerScore;
   userScoreResultEl.textContent = userScore;
   computerScoreResultEl.textContent = computerScore;
}

function displayResult(userChoice, computerChoice, result) {
   let resultMessage = `You chose ${userChoice}, computer chose ${computerChoice}. `;
   if (result === "user") {
      resultMessage += "You win!";
      pcScoreRes.classList.remove("animate");
      userScorRes.classList.add("animate");
   } else if (result === "computer") {
      resultMessage += "You lose!";
      userScorRes.classList.remove("animate");
      pcScoreRes.classList.add("animate");
   } else if (userChoice === computerChoice) {
      resultMessage += "It's a draw!";
      pcScoreRes.classList.remove("animate");
      userScorRes.classList.remove("animate");
   }
   resultMessageEl.textContent = resultMessage;
   userChoiceResultEl.textContent = userChoice;
   computerChoiceResultEl.textContent = computerChoice;
}

resetButton.addEventListener("click", resetScores);

rulesButton.addEventListener("click", () => {
   rulesDisplay.classList.remove("hidden2");
});

closeRulesButton.addEventListener("click", () => {
   rulesDisplay.classList.add("hidden2");
});

function resetScores() {
   userScore = 0;
   computerScore = 0;
   localStorage.setItem("userScore", userScore);
   localStorage.setItem("computerScore", computerScore);
   userScoreEl.textContent = userScore;
   computerScoreEl.textContent = computerScore;
   userScoreResultEl.textContent = userScore;
   computerScoreResultEl.textContent = computerScore;
}
