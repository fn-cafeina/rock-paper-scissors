const buttons = document.querySelector(".buttons");
const context = document.querySelector(".context");

const hdScore = document.querySelector(".human-score");
const cdScore = document.querySelector(".computer-score");

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
  const hc = humanChoice;
  const cc = computerChoice;

  const rvs = hc === "rock" && cc === "scissors";
  const pvr = hc === "paper" && cc === "rock";
  const svp = hc === "scissors" && cc === "paper";

  if(hc === cc) {
    changeContext(humanChoice, computerChoice, "tie");
    blockButtons(true);
  } else {
    if(rvs || pvr || svp) {
      humanScore++;
      updateScores();
      changeContext(humanChoice, computerChoice, "human");
      blockButtons(true);
    } else {
      computerScore++;
      updateScores();
      changeContext(humanChoice, computerChoice, "computer");
      blockButtons(true);
    }
  }

  setTimeout(() => {
    if(checkWinner()) {
      blockButtons(true);
      finishGame();
      restart();
    } else {
      blockButtons(false);
    }
  }, 1000);
}

function restart() {
  while(buttons.firstChild) buttons.removeChild(buttons.firstChild);
  buttons.innerHTML = `<button class="restart-btn" type="button" value="restart">restart</button>`;
  buttons.removeEventListener("click", playGame);
  document.querySelector(".restart-btn").addEventListener("click", () => { location.reload() });
}

function finishGame() {
  if(humanScore > computerScore) {
    context.textContent = "human is the winner.";
  } else {
    context.textContent = "computer is the winner.";
  }
}

function checkWinner() {
  if(humanScore >= 3 || computerScore >= 3) {
    return true;
  }
}

function getEmoji(option) {
  let emoji;

  if(option === "rock") {
    emoji = "🪨";
  }

  if(option === "paper") {
    emoji = "📄";
  }

  if(option === "scissors") {
    emoji = "✂️";
  }

  return emoji;
}

function updateScores() {
  hdScore.textContent = humanScore;
  cdScore.textContent = computerScore;
}

function changeContext(humanChoice, computerChoice, option) {
  if(option === "tie") {
    context.textContent = `${getEmoji(humanChoice)} vs ${getEmoji(computerChoice)}, it's a tie!`;
  } else {
    context.textContent = `${getEmoji(humanChoice)} vs ${getEmoji(computerChoice)}, ${option} wins!`;
  }
}

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  const randomNumber = Math.floor(Math.random() * options.length);

  return options[randomNumber];
}

function blockButtons(option) {
  buttons.querySelectorAll("button").forEach((element) => {
    element.disabled = option;
  });
}

function playGame(event) {
  const target = event.target;

  if(target.tagName === "BUTTON") {
    const humanChoice = target.value;
    const computerChoice = getComputerChoice();

    playRound(humanChoice, computerChoice);
  }
}

buttons.addEventListener("click", playGame);