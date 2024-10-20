//importing prompt-sync
const prompt = require("prompt-sync")();

//asking for username
let userName = prompt("Enter your name: ");

//validating the username
if(userName == NaN || userName == null || userName== undefined){
    console.log("Invalid username. Please enter a non-empty string.");
    return;
}
//asking for age of the user
let userAge = prompt("Enter your age: ");

//validating age of the user
if(userAge<18){
    console.log("Sorry, you are not eligible to play Teen Patti.");
    return;
}

//asking the user for wallet amount
let playerWallet = parseInt(prompt("Enter your wallet amount: "));

//validating wallet amount
if(isNaN(playerWallet) || playerWallet <= 0){
    console.log("Invalid wallet amount. Please enter a positive number.");
    return;
}

// Initializing the variables for the game
let playerHand = [];
let computerHand = [];

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
    playerHand.push(deck.pop());
    playerHand.push(deck.pop());
    playerHand.push(deck.pop());
    return { backendPlayer: playerHand, playerCard: playerHand.map(formatCard) };
}
// Storing the playerHand in the variable
let playerCard = dealPlayerHand(shuffledDeck);

// Dealing the card to the computerHand
function dealComputerHand(deck) {
    computerHand.push(deck.pop());
    computerHand.push(deck.pop());
    computerHand.push(deck.pop());
    return { backendComputer: computerHand, computerCard: computerHand.map(formatCard) };
}
// Storing the computerHand in the variable
let computerCard = dealComputerHand(shuffledDeck);


