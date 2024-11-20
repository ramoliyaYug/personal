// Initializing the variables for the game
let playerHand = [];
let computerHand = [];

let turnOf = "";
let lastBet = 0;
let winner;
let winningAmount = 0;

let lastPlayerBet = 0;
let lastComputerBet = 0;

let playerWallet = 100000;
let computerWallet = 0;
//defining the rank/value of the cards
const cardRank = {
  A: 14,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
};

// Define the suits and values of the cards in the deck
let suits = ["spades", "hearts", "diamonds", "clubs"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// Creating the deck
function createDeck() {
  let backendDeck = [];
  for (let suit of suits) {
    for (let value of values) {
      backendDeck.push([value, suit]);
    }
  }
  return backendDeck;
}
// Storing the created deck in the variable
const backendDeck = createDeck();

// Shuffling the deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
// Storing the shuffled deck in the variable
const shuffledDeck = shuffleDeck(backendDeck);

// Function to format card for display
function formatCard(card) {
  return `${card[0]} of ${card[1]}`;
}

// Dealing the card to the playerHand
function dealPlayerHand(deck) {
  // Deal the first card
  let card1 = deck.pop();
  playerHand.push(card1);
  let doneCard1 = formatCard(card1);
  document.getElementById("playerCard1").innerText = doneCard1;

  // Deal the second card
  let card2 = deck.pop();
  playerHand.push(card2);
  let doneCard2 = formatCard(card2);
  document.getElementById("playerCard2").innerText = doneCard2;

  // Deal the third card
  let card3 = deck.pop();
  playerHand.push(card3);
  let doneCard3 = formatCard(card3);
  document.getElementById("playerCard3").innerText = doneCard3;

  // document.getElementById("showPlayerCardBtn").disabled = true;

  // Return the player's backend data for potential tracking
  return { backendPlayer: playerHand, playerCard: playerHand.map(formatCard) };
}

// Storing the playerHand in the variable
let playerCard = dealPlayerHand(shuffledDeck);

function displayPlayerCardOnDom() {
  document.getElementById("playerCard1").style.display = "inline";
  document.getElementById("playerCard2").style.display = "inline";
  document.getElementById("playerCard3").style.display = "inline";
}

//storing the player backend hand in seperate variable
let playerBackendHand = playerCard.backendPlayer;
//storing the player display hand in seperate variable
let playerDisplayHand = playerCard.playerCard;
// let playerBackendHand = [ [ 'A', 'diamonds' ], [ '3', 'diamonds' ], [ 'A', 'spades' ] ];

// Dealing the card to the computerHand
function dealComputerHand(deck) {
  // Deal the first card
  let card1 = deck.pop();
  computerHand.push(card1);
  let doneCard1 = formatCard(card1);
  document.getElementById("computerCard1").innerText = doneCard1;

  // Deal the second card
  let card2 = deck.pop();
  computerHand.push(card2);
  let doneCard2 = formatCard(card2);
  document.getElementById("computerCard2").innerText = doneCard2;

  // Deal the third card
  let card3 = deck.pop();
  computerHand.push(card3);
  let doneCard3 = formatCard(card3);
  document.getElementById("computerCard3").innerText = doneCard3;

  // Return the computer's backend data for potential tracking
  return {
    backendComputer: computerHand,
    computerCard: computerHand.map(formatCard),
  };
}
// Storing the computerHand in the variable
let computerCard = dealComputerHand(shuffledDeck);
//storing the computer backend hand in seperate variable
let computerBackendHand = computerCard.backendComputer;
//storing the computer display hand in seperate variable
let computerDisplayHand = computerCard.computerCard;
// let computerBackendHand = [ [ '5', 'clubs' ], [ '6', 'clubs' ], [ '7', 'diamonds' ] ];

//defining the special sequence of the cards in array formate
let specialSequenceArray = [2, 3, 14];

//function to create and store the only player's card's value in sorted formate
function creatingValueArrayOfPlayer() {
  let playerValueArray = playerBackendHand
    .map((card) => cardRank[card[0]])
    .sort((a, b) => a - b);
  return playerValueArray;
}

//function to create and store the only computer's card's value in sorted formate
function creatingValueArrayOfComputer() {
  let computerValueArray = computerBackendHand
    .map((card) => cardRank[card[0]])
    .sort((a, b) => a - b);
  return computerValueArray;
}

//ffunction to check if the player has three equal value cards or not
function threeEqualValueCheckOfPlayer() {
  for (let i = 0; i < 3; i++) {
    if (
      playerBackendHand[i][0] === playerBackendHand[i + 1][0] &&
      playerBackendHand[i + 1][0] === playerBackendHand[i + 2][0]
    ) {
      return true;
    }
    return false;
  }
}

//ffunction to check if the computer has three equal value cards or not
function threeEqualValueCheckOfComputer() {
  for (let i = 0; i < 3; i++) {
    if (
      computerBackendHand[i][0] === computerBackendHand[i + 1][0] &&
      computerBackendHand[i + 1][0] === computerBackendHand[i + 2][0]
    ) {
      return true;
    }
    return false;
  }
}

//function to check if player and computer both have three equal value cards or not
function threeEqualValueCheckSubCase() {
  let playerValue = cardRank[playerBackendHand[0][0]];
  let computerValue = cardRank[computerBackendHand[0][0]];
  if (playerValue > computerValue) {
    return "Player wins";
  } else if (playerValue < computerValue) {
    return "Computer wins";
  }
}

//function to check if the first case is happening or not
function checkingFirstCase() {
  if (threeEqualValueCheckOfPlayer()) {
    return true;
  } else if (threeEqualValueCheckOfComputer()) {
    return true;
  }
  return false;
}

//function to deciding the winner theough first case.
function threeEqualValueCardCase() {
  if (threeEqualValueCheckOfPlayer() === threeEqualValueCheckOfComputer()) {
    return threeEqualValueCheckSubCase();
  } else if (threeEqualValueCheckOfPlayer()) {
    return "Player wins";
  } else if (threeEqualValueCheckOfComputer()) {
    return "Computer wins";
  } else {
    return null;
  }
}

//function to check if player has equal suit cards or not
function threeEqualSuitsCheckOfPlayer() {
  for (let i = 0; i < 3; i++) {
    if (
      playerBackendHand[i][1] === playerBackendHand[i + 1][1] &&
      playerBackendHand[i + 1][1] === playerBackendHand[i + 2][1]
    ) {
      return true;
    }
    return false;
  }
}

//function to check if computer has equal suit cards or not
function threeEqualSuitsCheckOfComputer() {
  for (let i = 0; i < 3; i++) {
    if (
      computerBackendHand[i][1] === computerBackendHand[i + 1][1] &&
      computerBackendHand[i + 1][1] === computerBackendHand[i + 2][1]
    ) {
      return true;
    }
    return false;
  }
}

//function to check if player has sequence cards or not
function sequenceCheckOfPlayer() {
  let playerValueArray = creatingValueArrayOfPlayer();
  for (let i = 0; i < 2; i++) {
    if (
      playerValueArray[i] + 1 === playerValueArray[i + 1] &&
      playerValueArray[i + 1] + 1 === playerValueArray[i + 2]
    ) {
      return true;
    }
  }
  return false;
}

//function to check if computer has sequence cards or not
function sequenceCheckOfComputer() {
  let computerValueArray = creatingValueArrayOfComputer();
  for (let i = 0; i < 2; i++) {
    if (
      computerValueArray[i] + 1 === computerValueArray[i + 1] &&
      computerValueArray[i + 1] + 1 === computerValueArray[i + 2]
    ) {
      return true;
    }
  }
  return false;
}

//function to check if player has special sequence cards or not
function specialSequenceOfPlayer() {
  let playerValueArray = creatingValueArrayOfPlayer();
  if (
    playerValueArray.every(
      (element, index) => element === specialSequenceArray[index]
    )
  ) {
    return true;
  }
  return false;
}

//function to check if computer has special sequence cards or not
function specialSequenceOfComputer() {
  let computerValueArray = creatingValueArrayOfComputer();
  if (
    computerValueArray.every(
      (element, index) => element === specialSequenceArray[index]
    )
  ) {
    return true;
  }
  return false;
}

//function to check if the second case is happening or not
function checkingSecondCase() {
  if (threeEqualSuitsCheckOfPlayer() && sequenceCheckOfPlayer()) {
    return true;
  } else if (threeEqualSuitsCheckOfComputer() && sequenceCheckOfComputer()) {
    return true;
  } else if (sequenceCheckOfPlayer()) {
    return true;
  } else if (sequenceCheckOfComputer()) {
    return true;
  } else if (specialSequenceOfPlayer()) {
    return true;
  } else if (specialSequenceOfComputer()) {
    return true;
  }
  return false;
}

//function to deciding the winner theough second case.
function suitSequenceCase() {
  if (threeEqualSuitsCheckOfPlayer()) {
    if (sequenceCheckOfPlayer() || specialSequenceOfPlayer()) {
      return "Player wins";
    }
  }

  if (threeEqualSuitsCheckOfComputer()) {
    if (sequenceCheckOfComputer() || specialSequenceOfComputer()) {
      return "Computer wins";
    }
  }

  let playerValueArray = creatingValueArrayOfPlayer();
  let computerValueArray = creatingValueArrayOfComputer();

  if (threeEqualSuitsCheckOfPlayer() && threeEqualSuitsCheckOfComputer()) {
    if (sequenceCheckOfPlayer() && sequenceCheckOfComputer()) {
      if (playerValueArray[2] > computerValueArray[2]) {
        return "Player wins";
      } else if (playerValueArray[2] < computerValueArray[2]) {
        return "Computer wins";
      } else if (playerValueArray[2] === computerValueArray[2]) {
        if (playerValueArray[1] > computerValueArray[1]) {
          return "Player wins";
        } else if (playerValueArray[1] < computerValueArray[1]) {
          return "Computer wins";
        } else if (playerValueArray[1] === computerValueArray[1]) {
          if (playerValueArray[0] > computerValueArray[0]) {
            return "Player wins";
          } else if (playerValueArray[0] < computerValueArray[0]) {
            return "Computer wins";
          }
        }
      }
    }
  }
  return caseHandler();
}

//function to check if the third case is happening or not
function checkingThirdCase() {
  if (threeEqualSuitsCheckOfPlayer() && threeEqualSuitsCheckOfComputer()) {
    return true;
  } else if (threeEqualSuitsCheckOfPlayer()) {
    return true;
  } else if (threeEqualSuitsCheckOfComputer()) {
    return true;
  }
  return false;
}

//function to deciding the winner theough third case.
function suitOnlyCase() {
  let playerValueArray = creatingValueArrayOfPlayer();
  let computerValueArray = creatingValueArrayOfComputer();

  if (threeEqualSuitsCheckOfPlayer() && !threeEqualSuitsCheckOfComputer()) {
    return "Player wins";
  } else if (
    !threeEqualSuitsCheckOfPlayer() &&
    threeEqualSuitsCheckOfComputer()
  ) {
    return "Computer wins";
  } else if (
    threeEqualSuitsCheckOfPlayer() &&
    threeEqualSuitsCheckOfComputer()
  ) {
    if (playerValueArray[2] > computerValueArray[2]) {
      return "Player wins";
    } else if (playerValueArray[2] < computerValueArray[2]) {
      return "Computer wins";
    } else if (playerValueArray[2] === computerValueArray[2]) {
      if (playerValueArray[1] > computerValueArray[1]) {
        return "Player wins";
      } else if (playerValueArray[1] < computerValueArray[1]) {
        return "Computer wins";
      } else if (playerValueArray[1] === computerValueArray[1]) {
        if (playerValueArray[0] > computerValueArray[0]) {
          return "Player wins";
        } else if (playerValueArray[0] < computerValueArray[0]) {
          return "Computer wins";
        }
      }
    }
  }
}

//function to check if the fourth case is happening or not
function checkingFourthCase() {
  if (sequenceCheckOfPlayer()) {
    return true;
  } else if (sequenceCheckOfComputer()) {
    return true;
  } else if (specialSequenceOfPlayer()) {
    return true;
  } else if (specialSequenceOfComputer()) {
    return true;
  }
  return false;
}

//function to decide the winner theough fourth case
function onlySequenceCase() {
  let playerHasSequence = sequenceCheckOfPlayer() || specialSequenceOfPlayer();
  let computerHasSequence =
    sequenceCheckOfComputer() || specialSequenceOfComputer();
  let playerValueArray = creatingValueArrayOfPlayer();
  let computerValueArray = creatingValueArrayOfComputer();

  if (playerHasSequence && !computerHasSequence) {
    return "Player wins";
  } else if (!playerHasSequence && computerHasSequence) {
    return "Computer wins";
  } else if (playerHasSequence && computerHasSequence) {
    if (playerValueArray[2] > computerValueArray[2]) {
      return "Player wins";
    } else if (playerValueArray[2] < computerValueArray[2]) {
      return "Computer wins";
    } else if (playerValueArray[2] === computerValueArray[2]) {
      if (playerValueArray[1] > computerValueArray[1]) {
        return "Player wins";
      } else if (playerValueArray[1] < computerValueArray[1]) {
        return "Computer wins";
      } else if (playerValueArray[1] === computerValueArray[1]) {
        if (playerValueArray[0] > computerValueArray[0]) {
          return "Player wins";
        } else if (playerValueArray[0] < computerValueArray[0]) {
          return "Computer wins";
        }
      }
    }
  }
}

//function to check if player has two equal value cards or not, this function will return the value of the card
function twoEqualValueCheckOfPlayer() {
  for (let i = 0; i < playerBackendHand.length - 1; i++) {
    for (let j = i + 1; j < playerBackendHand.length; j++) {
      if (playerBackendHand[i][0] === playerBackendHand[j][0]) {
        return cardRank[playerBackendHand[i][0]];
      }
    }
  }
  return null;
}

//function to check if player has two equal value cards or not, this function will return true or false
function twoEqualValueCheckOfPlayerReturnFunction() {
  for (let i = 0; i < playerBackendHand.length - 1; i++) {
    for (let j = i + 1; j < playerBackendHand.length; j++) {
      if (playerBackendHand[i][0] === playerBackendHand[j][0]) {
        return true;
      }
    }
  }
  return false;
}

//function to check if computer has two equal value cards or not, this function will return the value of the card
function twoEqualValueCheckOfComputer() {
  for (let i = 0; i < computerBackendHand.length - 1; i++) {
    for (let j = i + 1; j < computerBackendHand.length; j++) {
      if (computerBackendHand[i][0] === computerBackendHand[j][0]) {
        return cardRank[computerBackendHand[i][0]];
      }
    }
  }
  return null;
}

//function to check if computer has two equal value cards or not, this function will return true or false
function twoEqualValueCheckOfComputerReturnFunction() {
  for (let i = 0; i < computerBackendHand.length - 1; i++) {
    for (let j = i + 1; j < computerBackendHand.length; j++) {
      if (computerBackendHand[i][0] === computerBackendHand[j][0]) {
        return true;
      }
    }
  }
  return false;
}

//function to get third card value
function getThirdCardValue(hand, repeatedValue) {
  return hand
    .map((card) => cardRank[card[0]])
    .find((value) => value !== repeatedValue);
}

//function to check if the fifth case is happening or not
function checkingFifthCase() {
  if (twoEqualValueCheckOfPlayerReturnFunction()) {
    return true;
  } else if (twoEqualValueCheckOfComputerReturnFunction()) {
    return true;
  }
  return false;
}

//function to decide the winner theough fifth case
function twoSameValueCase() {
  let playerRepeatedValue = twoEqualValueCheckOfPlayer();
  let computerRepeatedValue = twoEqualValueCheckOfComputer();

  if (playerRepeatedValue && !computerRepeatedValue) {
    return "Player wins";
  } else if (!playerRepeatedValue && computerRepeatedValue) {
    return "Computer wins";
  } else if (playerRepeatedValue && computerRepeatedValue) {
    if (playerRepeatedValue > computerRepeatedValue) {
      return "Player wins";
    } else if (playerRepeatedValue < computerRepeatedValue) {
      return "Computer wins";
    } else {
      let playerThirdCardValue = getThirdCardValue(
        playerBackendHand,
        playerRepeatedValue
      );
      let computerThirdCardValue = getThirdCardValue(
        computerBackendHand,
        computerRepeatedValue
      );

      if (playerThirdCardValue > computerThirdCardValue) {
        return "Player wins";
      } else if (playerThirdCardValue < computerThirdCardValue) {
        return "Computer wins";
      }
    }
  }
}

//function to check if player has two equal suit cards or not, this function will return the array of suit and value
function twoEqualSuitCheckOfPlayer() {
  for (let i = 0; i < playerBackendHand.length - 1; i++) {
    for (let j = i + 1; j < playerBackendHand.length; j++) {
      if (playerBackendHand[i][1] === playerBackendHand[j][1]) {
        return [
          [
            cardRank[playerBackendHand[i][0]],
            cardRank[playerBackendHand[j][0]],
          ],
          playerBackendHand[i][1],
        ];
      }
    }
  }
  return null;
}

//function to check if player has two equal suit cards or not, this function will return true or false
function twoEqualSuitCheckOfPlayerReturnFunction() {
  for (let i = 0; i < playerBackendHand.length - 1; i++) {
    for (let j = i + 1; j < playerBackendHand.length; j++) {
      if (playerBackendHand[i][1] === playerBackendHand[j][1]) {
        return true;
      }
    }
  }
  return false;
}

//function to check if computer has two equal suit cards or not, this function will return the array of suit and value
function twoEqualSuitCheckOfComputer() {
  for (let i = 0; i < computerBackendHand.length - 1; i++) {
    for (let j = i + 1; j < computerBackendHand.length; j++) {
      if (computerBackendHand[i][1] === computerBackendHand[j][1]) {
        return [
          [
            cardRank[computerBackendHand[i][0]],
            cardRank[computerBackendHand[j][0]],
          ],
          computerBackendHand[i][1],
        ];
      }
    }
  }
  return null;
}

//function to check if computer has two equal suit cards or not, this function will return true or false
function twoEqualSuitCheckOfComputerReturnFunction() {
  for (let i = 0; i < computerBackendHand.length - 1; i++) {
    for (let j = i + 1; j < computerBackendHand.length; j++) {
      if (computerBackendHand[i][1] === computerBackendHand[j][1]) {
        return true;
      }
    }
  }
  return false;
}

//function to check if sixth case is happening or not
function checkingSixthCase() {
  if (twoEqualSuitCheckOfPlayerReturnFunction()) {
    return true;
  } else if (twoEqualSuitCheckOfComputerReturnFunction()) {
    return true;
  }
  return false;
}

//function to decide the winner theough sixth case
function twoSameSuitCase() {
  let maxValueOfPlayer = Math.max(...creatingValueArrayOfPlayer());
  let maxValueOfComputer = Math.max(...creatingValueArrayOfComputer());

  let equalSuitPlayerValueAndSuit = twoEqualSuitCheckOfPlayer();
  let equalSuitComputerValueAndSuit = twoEqualSuitCheckOfComputer();

  if (
    twoEqualSuitCheckOfPlayerReturnFunction() &&
    !twoEqualSuitCheckOfComputerReturnFunction()
  ) {
    return "Player wins";
  } else if (
    !twoEqualSuitCheckOfPlayerReturnFunction() &&
    twoEqualSuitCheckOfComputerReturnFunction()
  ) {
    return "Computer wins";
  } else if (
    twoEqualSuitCheckOfPlayerReturnFunction() &&
    twoEqualSuitCheckOfComputerReturnFunction()
  ) {
    if (equalSuitPlayerValueAndSuit[1] !== equalSuitComputerValueAndSuit[1]) {
      if (maxValueOfPlayer > maxValueOfComputer) {
        return "Player wins";
      } else if (maxValueOfPlayer < maxValueOfComputer) {
        return "Computer wins";
      }
    } else {
      let sortedEqualSuitPlayerValue = equalSuitPlayerValueAndSuit[0].sort(
        (a, b) => a - b
      );
      let sortedEqualSuitComputerValue = equalSuitComputerValueAndSuit[0].sort(
        (a, b) => a - b
      );

      if (sortedEqualSuitPlayerValue[1] > sortedEqualSuitComputerValue[1]) {
        return "Player wins";
      } else if (
        sortedEqualSuitPlayerValue[1] < sortedEqualSuitComputerValue[1]
      ) {
        return "Computer wins";
      } else if (
        sortedEqualSuitPlayerValue[1] === sortedEqualSuitComputerValue[1]
      ) {
        if (sortedEqualSuitPlayerValue[0] > sortedEqualSuitComputerValue[0]) {
          return "Player wins";
        } else if (
          sortedEqualSuitPlayerValue[0] < sortedEqualSuitComputerValue[0]
        ) {
          return "Computer wins";
        }
      }
    }
  }
  return lastCase();
}

//deciding the winner through seventh case
function lastCase() {
  let playerValueArray = creatingValueArrayOfPlayer();
  let computerValueArray = creatingValueArrayOfComputer();

  if (playerValueArray[2] > computerValueArray[2]) {
    return "Player wins";
  } else if (playerValueArray[2] < computerValueArray[2]) {
    return "Computer wins";
  } else if (playerValueArray[2] === computerValueArray[2]) {
    if (playerValueArray[1] > computerValueArray[1]) {
      return "Player wins";
    } else if (playerValueArray[1] < computerValueArray[1]) {
      return "Computer wins";
    } else if (playerValueArray[1] === computerValueArray[1]) {
      if (playerValueArray[0] > computerValueArray[0]) {
        return "Player wins";
      } else if (playerValueArray[0] < computerValueArray[0]) {
        return "Computer wins";
      }
    }
  }
}

//final function to decide the winner
function finalWinner() {
  if (checkingFirstCase()) {
    return threeEqualValueCardCase();
  } else if (checkingSecondCase()) {
    return suitSequenceCase();
  } else if (checkingThirdCase()) {
    return suitOnlyCase();
  } else if (checkingFourthCase()) {
    return onlySequenceCase();
  } else if (checkingFifthCase()) {
    return twoSameValueCase();
  } else if (checkingSixthCase()) {
    return twoSameSuitCase();
  } else {
    return lastCase();
  }
}

function caseHandler() {
  if (checkingThirdCase()) {
    return suitOnlyCase();
  } else if (checkingFourthCase()) {
    return onlySequenceCase();
  } else if (checkingFifthCase()) {
    return twoSameValueCase();
  } else if (checkingSixthCase()) {
    return twoSameSuitCase();
  } else {
    return lastCase();
  }
}

function printingAllCasesReturnValues() {
  console.log("First Case: " + checkingFirstCase());
  console.log("Second Case: " + checkingSecondCase());
  console.log("Third Case: " + checkingThirdCase());
  console.log("Fourth Case: " + checkingFourthCase());
  console.log("Fifth Case: " + checkingFifthCase());
  console.log("Sixth Case: " + checkingSixthCase());
  console.log("Seventh Case: " + lastCase());
}
// console.log(playerDisplayHand);
// console.log(computerDisplayHand);
// printingAllCasesReturnValues();
console.log(finalWinner());

let playerName = "yug";
let playerAge;

let computerNameGlobal = "";
function playerValidation(event) {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const amount = parseInt(document.getElementById("amount").value);
  const errorDisplay = document.getElementById("errorDisplay");

  // Validate name
  if (name === "") {
    errorDisplay.innerText = "Please enter your name";
    return;
  }
  // Validate age
  if (age < 18) {
    errorDisplay.innerText = "Please enter a valid age";
    return;
  }
  // Validate amount
  if (amount <= 0) {
    errorDisplay.innerText = "Please enter a valid amount";
    return;
  }
  if(amount > 10000000){
    errorDisplay.innerText = "Amount should be less than 10000000";
    return;
  }

  // Hide form and show start button if validation passes
  document.querySelector(".parentFormDiv").style.display = "none";
  document.querySelector(".parentStartBtn").style.display = "flex";
}

function startGame() {
  // Select the start button container and hide it
  let parentStartBtn = document.querySelector(".parentStartBtn");
  parentStartBtn.style.display = "none";

  // Select the game container and show it
  let parentGameDiv = document.querySelector(".parentGameDiv");
  parentGameDiv.style.display = "flex";

  playerName = document.getElementById("name").value.trim();
  playerAge = parseInt(document.getElementById("age").value);
  playerAmount = parseInt(document.getElementById("amount").value);
  playerWallet = playerAmount;

  document.getElementById("playerName").innerText = playerName;
  document.getElementById("playerAge").innerText = playerAge;
  document.getElementById("playerAmount").innerText = playerWallet;
}

function bet() {
    let betInput = document.getElementById("bet");
    let betValue = Number(betInput.value);
  
    if (betValue > lastBet) {
      if (betValue > playerWallet) {
        alert("Insufficient funds");
      } else {
        playerWallet = playerWallet - betValue;
        lastBet = betValue;
        document.getElementById("playerAmount").innerText = playerWallet;
        document.getElementById("lastBet").innerText = lastBet;
        turnOf = computerNameGlobal;
        document.getElementById("turnOf").innerText = turnOf;
        betInput.disabled = true;
        let tempWinningAmount = Number(winningAmount + betValue);
        winningAmount = tempWinningAmount;
        document.getElementById("winnerAmount").innerText = winningAmount;
        document.getElementById("showComputerCardBtn").disabled = false;
  
        // Clear input value after 2 seconds
        // setTimeout(() => {
        //   betInput.value = "";
        // }, 2000);
      }
    } else {
      alert("Please enter a bet greater than last bet");
  
      // Clear input value after 1 seconds
      // setTimeout(() => {
      //   betInput.value = "";
      // }, 1000);
    }
  }

function endGameOfPlayer() {
  // Define elements inside the function
  const lastBetElement = document.getElementById("lastBet");
  const winnerElement = document.getElementById("winner");
  const winningAmountElement = document.getElementById("winnerAmount");

  // Update elements with game data
  if (turnOf == playerName) {
    lastBetElement.innerText = lastBet;
    winnerElement.innerText = winner;
    winningAmountElement.innerText = winningAmount;
    const displayWinner = finalWinner();
    document.getElementById("winner").innerText = displayWinner;

    document.getElementById("computerCards").style.display = "flex";
    document.getElementById("showPlayerCardBtn").disabled = true;
    document.getElementById("bet").disabled = true;
    document.getElementById("nextMoveBtn").disabled = true;
    document.getElementById("showComputerCardBtn").disabled = true;
    document.getElementById("playAgainBtn").disabled = false;
  } else {
    alert("it's not your turn");
  }
}

// function endGameOfViaComputer(){
//     let compCardDiv = document.getElementById("computerCards");
//     document.getElementById("bet").disabled = false;
//     let betValue = document.getElementById("bet").value
//     if(betValue<lastBet){
//         alert("enter bet amount more than last bet to show computer cards and end game")
//     }else{
//         //function moddified from playerEndoing function;
//         compCardDiv.style.display = "flex";

//     }
// }
function endGameOfViaComputer() {
  let compCardDiv = document.getElementById("computerCards");
  let betField = document.getElementById("bet");
  let walletElement = document.getElementById("playerAmount");
  let betValue = parseInt(betField.value); // Convert bet input to an integer

  betField.disabled = false;

  if (turnOf == playerName) {
    if (betValue < lastBet || betValue > playerWallet || betValue == null || betValue == "" || betValue == undefined || isNaN(betValue) || betValue <= 0) {
      alert(
        "Enter a bet amount greater than the last bet to show computer cards and end the game."
      );
    } else {
      if (betValue > playerWallet) {
        alert(
          "Insufficient funds in your wallet. Please enter a valid amount."
        );
      } else {
        // Deduct bet amount from wallet
        playerWallet -= betValue;
        walletElement.innerText = playerWallet;

        // Show computer cards
        compCardDiv.style.display = "flex";
        const displayWinner = finalWinner();
        document.getElementById("winner").innerText = displayWinner;
        document.getElementById("showComputerCardBtn").disabled = true;
        document.getElementById("playAgainBtn").disabled = false;
        document.getElementById("nextMoveBtn").disabled = true;
        document.getElementById("bet").disabled = true;
      }
    }
  } else {
    alert("it's not your turn");
  }
}

function modifiedWinner(){
    if(playerWallet == 0 || computerWallet==0){
      const lastBetElement = document.getElementById("lastBet");
      const winnerElement = document.getElementById("winner");
      const winningAmountElement = document.getElementById("winnerAmount");

      lastBetElement.innerText = lastBet;
      winnerElement.innerText = winner;
      winningAmountElement.innerText = winningAmount;
      const displayWinner = finalWinner();
      document.getElementById("winner").innerText = displayWinner;
  
      document.getElementById("computerCards").style.display = "flex";
      document.getElementById("showPlayerCardBtn").disabled = true;
      document.getElementById("bet").disabled = true;
      document.getElementById("nextMoveBtn").disabled = true;
      document.getElementById("showComputerCardBtn").disabled = true;
      document.getElementById("playAgainBtn").disabled = false;
    }
}

function computerAutomation() {
  if (turnOf == computerNameGlobal) {
    let computerBet = computerBetAmountCalculation();
    lastBet = computerBet;
    document.getElementById("lastBet").innerText = computerBet;
    winningAmount += computerBet;
    document.getElementById("winnerAmount").innerText = winningAmount;
    document.getElementById("bet").disabled = false;
    turnOf = playerName;
    document.getElementById("turnOf").innerText = turnOf;
  } else {
    alert("please play your turn");
  }
}

function computerBetAmountCalculation() {
  let computerBet = 0;
  let increment = 0;

  // Add base increment with overlapping ranges
  if (checkingFirstCase()) {
    increment = Math.floor(Math.random() * (20000 - 12000) + 1) + 12000;
  } else if (checkingSecondCase()) {
    increment = Math.floor(Math.random() * (18000 - 11000) + 1) + 11000;
  } else if (checkingThirdCase()) {
    increment = Math.floor(Math.random() * (16000 - 10000) + 1) + 10000;
  } else if (checkingFourthCase()) {
    increment = Math.floor(Math.random() * (14000 - 9000) + 1) + 9000;
  } else if (checkingFifthCase()) {
    increment = Math.floor(Math.random() * (12000 - 8000) + 1) + 8000;
  } else if (checkingSixthCase()) {
    increment = Math.floor(Math.random() * (10000 - 7000) + 1) + 7000;
  } else {
    increment = Math.floor(Math.random() * (9000 - 6000) + 1) + 6000;
  }

  // Add dynamic noise to increment
  const noiseFactor = Math.random() * 0.2 + 0.9; // Random multiplier between 0.9 and 1.1
  increment = Math.floor(increment * noiseFactor);

  // Add random offset to the final bet calculation
  const randomOffset1 = Math.floor(Math.random() * 2000) - 1000; // Offset between -1000 and 1000
  const randomOffset2 = Math.floor(Math.random() * 500); // Positive offset up to 500
  const randomWeight = Math.random() > 0.5 ? 1 : -1; // Random positive or negative weighting

  computerBet += lastBet + increment + randomOffset1 + randomWeight * randomOffset2;

  return computerBet;
}


//computer names array
let computerNames = [
  "ShadowFury",
  "CyberWolf",
  "PixelPhantom",
  "NeonNova",
  "AeroBlaze",
  "QuantumAce",
  "LunarSpecter",
  "IronVortex",
  "CrimsonSaber",
  "EchoRider",
];

function randomComputerGenerator() {
  //generating random name for computer from array;
  let computerName =
    computerNames[Math.floor(Math.random() * computerNames.length)];
  computerNameGlobal = computerName;
  document.getElementById("computerName").innerText = computerNameGlobal;

  //generating random age for computer
  let computerAge = Math.floor(Math.random() * (100 - 18) + 18);
  document.getElementById("computerAge").innerText = computerAge;

  //generating random wallet for computer
  computerWallet = Math.floor(Math.random() * (10000000 - 10000) + 10000);

  document.getElementById("computerAmount").innerText = computerWallet;
}

window.onload = randomComputerGenerator;
