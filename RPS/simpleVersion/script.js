let playerPlay;
let compPlay;
let result;
let playerScore = 0;
let computerScore = 0;
function rock() {
  playerPlay = "rock";
  document.getElementById("playChoosed").innerText = "ROCK";
  return playerPlay;
}
function paper() {
  playerPlay = "paper";
  document.getElementById("playChoosed").innerText = "PAPER";
  return playerPlay;
}
function scissors() {
  playerPlay = "scissors";
  document.getElementById("playChoosed").innerText = "SCISSORS";
  return playerPlay;
}

function computerPlay() {
  let chance = Math.floor(Math.random() * 3) + 1;

  switch (chance) {
    case 1:
      compPlay = "rock";
      document.getElementById("compChoosed").innerText = "ROCK";
      break;
    case 2:
      compPlay = "paper";
      document.getElementById("compChoosed").innerText = "PAPER";
      break;
    case 3:
      compPlay = "scissors";
      document.getElementById("compChoosed").innerText = "SCISSORS";
      break;
    default:
      console.log("Error: Invalid chance value.");
  }
  return compPlay;
}

function playRound() {
    if(playerPlay == "rock" && compPlay == "paper"){
        computerScore += 1;
        document.getElementById('computerScore').innerText = computerScore;
        result = "You Lose!";
    }
    else if(playerPlay == "rock" && compPlay == "scissors"){
        playerScore += 1;
        document.getElementById('playerScore').innerText = playerScore;
        result = "You Win!";
    }
    else if(playerPlay == "paper" && compPlay == "rock"){
        playerScore += 1;
        document.getElementById('playerScore').innerText = playerScore;
        result = "You Win!";
    }
    else if(playerPlay == "paper" && compPlay == "scissors"){
        computerScore += 1;
        document.getElementById('computerScore').innerText = computerScore;
        result = "You Lose!";
    }
    else if(playerPlay == "scissors" && compPlay == "rock"){
        computerScore += 1;
        document.getElementById('computerScore').innerText = computerScore;
        result = "You Lose!";
    }
    else if(playerPlay == "scissors" && compPlay == "paper"){
        playerScore += 1;
        document.getElementById('playerScore').innerText = playerScore;
        result = "You Win!";
    }
    else{
        result = "It's a Tie!";
    }
    document.getElementById("res").innerText = result;
    return result;
}

function playAgain(){
    playerPlay = "";
    compPlay = "";
    result = "";
    playerScore = 0;
    computerScore = 0;
    document.getElementById("playChoosed").innerText = "";
    document.getElementById("compChoosed").innerText = "";
    document.getElementById("res").innerText = "";
    document.getElementById('playerScore').innerText = 0;
    document.getElementById('computerScore').innerText = 0;
}