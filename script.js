// --- JAVASCRIPT LOGIC ---
const weapons = document.querySelectorAll(".weapon");
const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");
const resultMessage = document.getElementById("result-message");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resetBtn = document.getElementById("reset-btn");

let playerScore = 0;
let computerScore = 0;

// Dictionary to map choices to specific hand emojis
const handEmojis = {
  rock: "👊",
  paper: "🤚",
  scissors: "✌️",
};

const options = ["rock", "paper", "scissors"];

weapons.forEach((weapon) => {
  weapon.addEventListener("click", function () {
    const playerChoice = this.getAttribute("data-choice");
    const computerChoice = options[Math.floor(Math.random() * 3)];

    // Disable buttons during animation to prevent spamming
    weapons.forEach((btn) => (btn.style.pointerEvents = "none"));

    // Reset hands to rock for the shaking animation
    playerHand.textContent = "👊";
    computerHand.textContent = "👊";
    resultMessage.textContent = "Wait for it...";
    resultMessage.style.color = "white";

    // Trigger animation
    playerHand.style.animation = "shakePlayer 1s ease";
    computerHand.style.animation = "shakeComputer 1s ease";

    // Wait for the 1-second animation to finish before showing results
    setTimeout(() => {
      // Remove animation so it can be re-triggered next round
      playerHand.style.animation = "";
      computerHand.style.animation = "";

      // Show the chosen weapons
      playerHand.textContent = handEmojis[playerChoice];
      computerHand.textContent = handEmojis[computerChoice];

      // Check who won
      checkWinner(playerChoice, computerChoice);

      // Re-enable buttons
      weapons.forEach((btn) => (btn.style.pointerEvents = "auto"));
    }, 1000);
  });
});

function checkWinner(player, computer) {
  if (player === computer) {
    resultMessage.textContent = "It's a Draw! 🤝";
    resultMessage.style.color = "#aaa";
    return;
  }

  const playerWins =
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper");

  if (playerWins) {
    playerScore++;
    playerScoreEl.textContent = playerScore;
    resultMessage.textContent = "You Win! 🎉";
    resultMessage.style.color = "#00ffcc";
  } else {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    resultMessage.textContent = "Computer Wins! 🤖";
    resultMessage.style.color = "#ff4757";
  }
}

// Reset game functionality
resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";
  resultMessage.textContent = "Choose your weapon!";
  resultMessage.style.color = "#ffcc00";
  playerHand.textContent = "👊";
  computerHand.textContent = "👊";
});
