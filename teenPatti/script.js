//importing prompt-sync
const prompt = require("prompt-sync")();

// Initializing the variables for the game
let playerName;
let playerAge;
let playerWallet = 0;
let playerBet;
let computerBet;
let playerHand = [];
let computerHand = [];
//defining the rank/value of the cards
const cardRank = {
    "A": 14, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13
};

// Define the suits and values of the cards in the deck
let suits = ["spades", "hearts", "diamonds", "clubs"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// Function to validate name
function validateName(name) {
    return name.length > 0;
}

// Function to validate age
function validateAge(age) {
    return age >= 18;
}

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
    playerHand.push(deck.pop());
    playerHand.push(deck.pop());
    playerHand.push(deck.pop());
    return { backendPlayer: playerHand, playerCard: playerHand.map(formatCard) };
}
// Storing the playerHand in the variable
let playerCard = dealPlayerHand(shuffledDeck);
//storing the player backend hand in seperate variable
let playerBackendHand = playerCard.backendPlayer;
//storing the player display hand in seperate variable
let playerDisplayHand = playerCard.playerCard;
// let playerBackendHand = [ [ 'A', 'diamonds' ], [ '3', 'diamonds' ], [ 'A', 'spades' ] ];

// Dealing the card to the computerHand
function dealComputerHand(deck) {
    computerHand.push(deck.pop());
    computerHand.push(deck.pop());
    computerHand.push(deck.pop());
    return { backendComputer: computerHand, computerCard: computerHand.map(formatCard) };
}
// Storing the computerHand in the variable
let computerCard = dealComputerHand(shuffledDeck);
//storing the computer backend hand in seperate variable
let computerBackendHand = computerCard.backendComputer;
//storing the computer display hand in seperate variable
let computerDisplayHand = computerCard.computerCard;
// let computerBackendHand = [ [ '5', 'clubs' ], [ '6', 'clubs' ], [ '7', 'diamonds' ] ];

//defining the special sequence of the cards in array formate
let specialSequenceArray = [2,3,14];

//function to create and store the only player's card's value in sorted formate
function creatingValueArrayOfPlayer(){
    let playerValueArray = playerBackendHand.map(card => cardRank[card[0]]).sort((a,b)=>a-b);
    return playerValueArray;
}

//function to create and store the only computer's card's value in sorted formate
function creatingValueArrayOfComputer(){
    let computerValueArray = computerBackendHand.map(card => cardRank[card[0]]).sort((a,b)=>a-b);
    return computerValueArray;
}

//ffunction to check if the player has three equal value cards or not
function threeEqualValueCheckOfPlayer(){
    for(let i = 0; i<3; i++){
        if(playerBackendHand[i][0] === playerBackendHand[i+1][0] && playerBackendHand[i+1][0] === playerBackendHand[i+2][0]){
            return true;
        }
        return false;
    }
};

//ffunction to check if the computer has three equal value cards or not
function threeEqualValueCheckOfComputer(){
    for(let i = 0; i<3; i++){
        if(computerBackendHand[i][0] === computerBackendHand[i+1][0] && computerBackendHand[i+1][0] === computerBackendHand[i+2][0]){
            return true;
        }
        return false;
    }
};

//function to check if player and computer both have three equal value cards or not
function threeEqualValueCheckSubCase(){
    let playerValue = cardRank[playerBackendHand[0][0]];
    let computerValue = cardRank[computerBackendHand[0][0]];
    if(playerValue > computerValue){
        return "Player wins";
    }else if(playerValue < computerValue){
        return "Computer wins";
    }
};

//function to check if the first case is happening or not
function checkingFirstCase(){
    if(threeEqualValueCheckOfPlayer()){
        return true;
    }else if(threeEqualValueCheckOfComputer()){
        return true;
    }
    return false;
}

//function to deciding the winner theough first case.
function threeEqualValueCardCase(){
    if(threeEqualValueCheckOfPlayer() === threeEqualValueCheckOfComputer()){
        return threeEqualValueCheckSubCase();
    }else if(threeEqualValueCheckOfPlayer()){
        return "Player wins";
    }else if(threeEqualValueCheckOfComputer()){
        return "Computer wins";
    }else{
        return null;
    }
};

//function to check if player has equal suit cards or not
function threeEqualSuitsCheckOfPlayer(){
    for(let i = 0; i<3; i++){
        if(playerBackendHand[i][1] === playerBackendHand[i+1][1] && playerBackendHand[i+1][1] === playerBackendHand[i+2][1]){
            return true;
        }
        return false;
    }
};

//function to check if computer has equal suit cards or not
function threeEqualSuitsCheckOfComputer(){
    for(let i = 0; i<3; i++){
        if(computerBackendHand[i][1] === computerBackendHand[i+1][1] && computerBackendHand[i+1][1] === computerBackendHand[i+2][1]){
            return true;
        }
        return false;
    }
};

//function to check if player has sequence cards or not
function sequenceCheckOfPlayer(){
    let playerValueArray = creatingValueArrayOfPlayer();
    for(let i = 0; i<2; i++){
        if(playerValueArray[i] + 1 === playerValueArray[i+1] && playerValueArray[i+1] + 1 === playerValueArray[i+2]){
            return true;
        }
    }
    return false;
};

//function to check if computer has sequence cards or not
function sequenceCheckOfComputer(){
    let computerValueArray = creatingValueArrayOfComputer();
    for(let i = 0; i<2; i++){
        if(computerValueArray[i] + 1 === computerValueArray[i+1] && computerValueArray[i+1] + 1 === computerValueArray[i+2]){
            return true;
        }
    }
    return false;
};

//function to check if player has special sequence cards or not
function specialSequenceOfPlayer(){
    let playerValueArray = creatingValueArrayOfPlayer();
    if(playerValueArray.every((element, index)=> element === specialSequenceArray[index])){
        return true;
    }
    return false;
};

//function to check if computer has special sequence cards or not
function specialSequenceOfComputer(){
    let computerValueArray = creatingValueArrayOfComputer();
    if(computerValueArray.every((element, index)=> element === specialSequenceArray[index])){
        return true;
    }
    return false;
};

//function to check if the second case is happening or not
function checkingSecondCase(){
    if(threeEqualSuitsCheckOfPlayer() && sequenceCheckOfPlayer()){
        return true;
    }else if(threeEqualSuitsCheckOfComputer() && sequenceCheckOfComputer()){
        return true;
    }else if(sequenceCheckOfPlayer()){
        return true;
    }else if(sequenceCheckOfComputer()){
        return true;
    }else if(specialSequenceOfPlayer()){
        return true;
    }else if(specialSequenceOfComputer()){
        return true;
    }
    return false;
};

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
function checkingThirdCase(){
    if(threeEqualSuitsCheckOfPlayer() && threeEqualSuitsCheckOfComputer()){
        return true;
    }else if (threeEqualSuitsCheckOfPlayer()){
        return true;
    }else if (threeEqualSuitsCheckOfComputer()){
        return true;
    }
    return false;
};

//function to deciding the winner theough third case.
function suitOnlyCase() {
    let playerValueArray = creatingValueArrayOfPlayer();
    let computerValueArray = creatingValueArrayOfComputer();

    if (threeEqualSuitsCheckOfPlayer() && !threeEqualSuitsCheckOfComputer()) {
        return "Player wins";
    } else if (!threeEqualSuitsCheckOfPlayer() && threeEqualSuitsCheckOfComputer()) {
        return "Computer wins";
    } else if (threeEqualSuitsCheckOfPlayer() && threeEqualSuitsCheckOfComputer()) {
        if(playerValueArray[2]>computerValueArray[2]){
            return "Player wins";
        }else if(playerValueArray[2]<computerValueArray[2]){
            return "Computer wins";
        }else if(playerValueArray[2]===computerValueArray[2]){
            if(playerValueArray[1]>computerValueArray[1]){
                return "Player wins";
            }else if(playerValueArray[1]<computerValueArray[1]){
                return "Computer wins";
            }else if(playerValueArray[1]===computerValueArray[1]){
                if(playerValueArray[0]>computerValueArray[0]){
                    return "Player wins";
                }else if(playerValueArray[0]<computerValueArray[0]){
                    return "Computer wins";
                }
            }
        }
    }
};

//function to check if the fourth case is happening or not
function checkingFourthCase(){
    if(sequenceCheckOfPlayer()){
        return true;
    }else if(sequenceCheckOfComputer()){
        return true;
    }else if(specialSequenceOfPlayer()){
        return true;
    }else if(specialSequenceOfComputer()){
        return true;
    }
    return false;
};

//function to decide the winner theough fourth case
function onlySequenceCase() {
    let playerHasSequence = sequenceCheckOfPlayer() || specialSequenceOfPlayer();
    let computerHasSequence = sequenceCheckOfComputer() || specialSequenceOfComputer();
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
};

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
};

//function to check if player has two equal value cards or not, this function will return true or false
function twoEqualValueCheckOfPlayerReturnFunction(){
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
};

//function to check if computer has two equal value cards or not, this function will return true or false
function twoEqualValueCheckOfComputerReturnFunction(){
    for (let i = 0; i < computerBackendHand.length - 1; i++) {
        for (let j = i + 1; j < computerBackendHand.length; j++) {
            if (computerBackendHand[i][0] === computerBackendHand[j][0]) {
                return true;
            }
        }
    }
    return false;
};

//function to get third card value
function getThirdCardValue(hand, repeatedValue) {
    return hand.map(card => cardRank[card[0]]).find(value => value !== repeatedValue);
};

//function to check if the fifth case is happening or not
function checkingFifthCase() {
    if (twoEqualValueCheckOfPlayerReturnFunction()){
        return true;
    }else if (twoEqualValueCheckOfComputerReturnFunction()){
        return true;
    }
    return false;
};

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
            let playerThirdCardValue = getThirdCardValue(playerBackendHand, playerRepeatedValue);
            let computerThirdCardValue = getThirdCardValue(computerBackendHand, computerRepeatedValue);

            if (playerThirdCardValue > computerThirdCardValue) {
                return "Player wins";
            } else if (playerThirdCardValue < computerThirdCardValue) {
                return "Computer wins";
            }
        }
    }
};

//function to check if player has two equal suit cards or not, this function will return the array of suit and value
function twoEqualSuitCheckOfPlayer() {
    for (let i = 0; i < playerBackendHand.length - 1; i++) {
        for (let j = i + 1; j < playerBackendHand.length; j++) {
            if (playerBackendHand[i][1] === playerBackendHand[j][1]) {
                return [
                    [cardRank[playerBackendHand[i][0]], cardRank[playerBackendHand[j][0]]], 
                    playerBackendHand[i][1]
                ];
            }
        }
    }
    return null;
};

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
};

//function to check if computer has two equal suit cards or not, this function will return the array of suit and value
function twoEqualSuitCheckOfComputer(){
    for (let i = 0; i < computerBackendHand.length - 1; i++) {
        for (let j = i + 1; j < computerBackendHand.length; j++) {
            if (computerBackendHand[i][1] === computerBackendHand[j][1]) {
                return [
                    [cardRank[computerBackendHand[i][0]], cardRank[computerBackendHand[j][0]]], 
                    computerBackendHand[i][1]
            ]
            }
        }
    }
    return null;
};

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
};

//function to check if sixth case is happening or not
function checkingSixthCase() {
    if (twoEqualSuitCheckOfPlayerReturnFunction()){
        return true;
    }else if (twoEqualSuitCheckOfComputerReturnFunction()){
        return true;
    }
    return false;
};

//function to decide the winner theough sixth case
function twoSameSuitCase(){
    let maxValueOfPlayer = Math.max(...creatingValueArrayOfPlayer());
    let maxValueOfComputer = Math.max(...creatingValueArrayOfComputer());

    let equalSuitPlayerValueAndSuit = twoEqualSuitCheckOfPlayer();
    let equalSuitComputerValueAndSuit = twoEqualSuitCheckOfComputer();
    
    
    if (twoEqualSuitCheckOfPlayerReturnFunction() && !twoEqualSuitCheckOfComputerReturnFunction()) {
        return "Player wins";
    } else if (!twoEqualSuitCheckOfPlayerReturnFunction() && twoEqualSuitCheckOfComputerReturnFunction()) {
        return "Computer wins";
    } else if (twoEqualSuitCheckOfPlayerReturnFunction() && twoEqualSuitCheckOfComputerReturnFunction()) {
        if (equalSuitPlayerValueAndSuit[1] !== equalSuitComputerValueAndSuit[1]) {
            if (maxValueOfPlayer > maxValueOfComputer) {
                return "Player wins";
            } else if (maxValueOfPlayer < maxValueOfComputer) {
                return "Computer wins";
            }
        } else {
            let sortedEqualSuitPlayerValue = equalSuitPlayerValueAndSuit[0].sort((a, b) => a - b);
            let sortedEqualSuitComputerValue = equalSuitComputerValueAndSuit[0].sort((a, b) => a - b);
            
            if (sortedEqualSuitPlayerValue[1] > sortedEqualSuitComputerValue[1]) {
                return "Player wins";
            } else if (sortedEqualSuitPlayerValue[1] < sortedEqualSuitComputerValue[1]) {
                return "Computer wins";
            } else if (sortedEqualSuitPlayerValue[1] === sortedEqualSuitComputerValue[1]) {
                if (sortedEqualSuitPlayerValue[0] > sortedEqualSuitComputerValue[0]) {
                    return "Player wins";
                } else if (sortedEqualSuitPlayerValue[0] < sortedEqualSuitComputerValue[0]) {
                    return "Computer wins";
                }
            }
        }
    }
    return lastCase();
}

//deciding the winner through seventh case
function lastCase(){
    let playerValueArray = creatingValueArrayOfPlayer();
    let computerValueArray = creatingValueArrayOfComputer();

    if (playerValueArray[2] > computerValueArray[2]) {
        return "Player wins";
    } else if (playerValueArray[2] < computerValueArray[2]) {
        return "Computer wins";
    }else if(playerValueArray[2] === computerValueArray[2]){
        if(playerValueArray[1] > computerValueArray[1]){
            return "Player wins";
        }else if(playerValueArray[1] < computerValueArray[1]){
            return "Computer wins";
        }else if(playerValueArray[1] === computerValueArray[1]){
            if(playerValueArray[0] > computerValueArray[0]){
                return "Player wins";
            }else if(playerValueArray[0] < computerValueArray[0]){
                return "Computer wins";
            }
        }
    }
};

//final function to decide the winner
function finalWinner(){
    if(checkingFirstCase()){
        return threeEqualValueCardCase();
    }else if(checkingSecondCase()){
        return suitSequenceCase();
    }else if(checkingThirdCase()){
        return suitOnlyCase();
    }else if(checkingFourthCase()){
        return onlySequenceCase();
    }else if(checkingFifthCase()){
        return twoSameValueCase();
    }else if(checkingSixthCase()){
        return twoSameSuitCase();
    }else {
        return lastCase();
    }
}

function caseHandler(){
    if(checkingThirdCase()){
        return suitOnlyCase();
    }else if(checkingFourthCase()){
        return onlySequenceCase();
    }else if(checkingFifthCase()){
        return twoSameValueCase();
    }else if(checkingSixthCase()){
        return twoSameSuitCase();
    }else {
        return lastCase();
    }
};

function gameFlow(){
    // Asking for player's name
    playerName = prompt("Enter your name: ");
    while (!validateName(playerName)) {
        console.log("Invalid name. Please try again.");
        playerName = prompt("Enter your name: ");
    }

    // Asking for player's age
    playerAge = parseInt(prompt("Enter your age: "));
    while (!validateAge(playerAge)) {
        console.log("You must be 18 or older to play.");
        playerAge = parseInt(prompt("Enter your age: "));
    }

    //asking to add initial amount in player's wallet
    playerWallet = parseInt(prompt("Enter the amount to add to your wallet: "));
    while (playerWallet <= 0) {
        console.log("Please enter a valid amount.");
        playerWallet = parseInt(prompt("Enter the amount to add to your wallet: "));
    }

    //game loop
    console.log("Your cards are: " + playerDisplayHand);
    let continueGame = true;
    while (continueGame) {
        //showing player's cards
        let readyToBet = prompt("Are you ready to bet (y/n)? ").toLowerCase();
        if (readyToBet === 'y') {
            // Player enters bet amount
            playerBet = parseInt(prompt("Enter your bet amount: "));
            while (playerBet <= 0 || playerBet > playerWallet) {
                console.log("Invalid bet. Please enter a valid amount.");
                playerBet = parseInt(prompt("Enter your bet amount: "));
            }

            // Computer automation function
            console.log("computer");

            // Asking if the player wants to play the next move
            let nextMove = prompt("Do you want to play the next move (y/n)? ").toLowerCase();
            if (nextMove === 'n') {
                continueGame = false;
            }
        } else {
            continueGame = false;
        }
    }
}



function printingAllCasesReturnValues(){
    console.log("First Case: "+ checkingFirstCase());
    console.log("Second Case: "+ checkingSecondCase());
    console.log("Third Case: "+ checkingThirdCase());
    console.log("Fourth Case: "+ checkingFourthCase());
    console.log("Fifth Case: "+ checkingFifthCase());
    console.log("Sixth Case: "+ checkingSixthCase());
    console.log("Seventh Case: "+ lastCase());
}
// console.log(playerDisplayHand);
// console.log(computerDisplayHand);
// printingAllCasesReturnValues();
console.log(finalWinner());
gameFlow();