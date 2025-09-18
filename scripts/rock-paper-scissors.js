const choices = ["rock", "paper", "scissors"];
let randomChoice = "";
let result = "";
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

document.querySelector(
  ".js-score"
).innerHTML = `<p class="js-score">Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}</p>`;

// Calculating the result
function check(userChoice) {
  randomChoice = pickComputerMove();

  // if (randomChoice === userChoice) {
  //   result = "Tie";
  // } else if (userChoice === "rock" && randomChoice === "paper") {
  //   result = "You lose";
  // } else if (userChoice === "rock" && randomChoice === "scissors") {
  //   result = "You won";
  // } else if (userChoice === "paper" && randomChoice === "rock") {
  //   result = "You won";
  // } else if (userChoice === "paper" && randomChoice === "scissors") {
  //   result = "You lose";
  // } else if (userChoice === "scissors" && randomChoice === "rock") {
  //   result = "You lose";
  // } else if (userChoice === "scissors" && randomChoice === "paper") {
  //   result = "You won";
  // }
  //Yes! You can write it in a shorter and cleaner way using an object map to define the winning conditions. Here's the compact version:
  //Why this works:
  // The rules object defines what each choice beats.
  // If rules[userChoice] equals randomChoice, it means the user won.
  // If it's not a tie and not a win, then it’s a loss.

  const rules = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  if (randomChoice === userChoice) {
    result = "Tie";
  } else if (rules[userChoice] === randomChoice) {
    result = "You won";
  } else {
    result = "You lose";
  }

  // Update score based on result
  if (result === "You won") {
    score.wins += 1;
  } else if (result === "You lose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-Choices"
  ).innerHTML = `You <img class="move-icon" src="assets/${userChoice}-emoji.png">   computer <img class="move-icon" src="assets/${randomChoice}-emoji.png">`;

  displayScore();
}

function pickComputerMove() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  displayScore();

  localStorage.setItem("score", JSON.stringify(score));
}

function displayScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `<p class="js-score">Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}</p>`;
}

let intervalID;
let isAutoPlaying = false;

function autoplay() {
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
      const autoChoice = pickComputerMove();
      check(autoChoice);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
  }

  let temp = document.querySelector(".jsAutoPlayButton");
  if (temp.innerText === "Auto Play") {
    temp.innerText = "Stop Auto Play";
  } else temp.innerText = "Auto Play";
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  check("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  check("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  check("scissors");
});

document.body.addEventListener('keydown', (event) => {
  let key = event.key;
  if(key.toUpperCase() === 'R') {
    check('rock');
  }
  else if(key.toUpperCase() === 'P') {
    check('paper');
  }
  else if(key.toUpperCase() === 'S') {
    check('scissors');
  }
  else if(key.toUpperCase() === 'A') {
    autoplay();
  }
})