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


//another version of player validation

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