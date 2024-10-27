let playerBet;
let playerWallet = 0;
function playerBetValidation(){
    playerBet = parseInt(prompt("Enter your bet amount: "));
    while (isNaN(playerBet) || playerBet <= 0) {
        console.log("Invalid bet amount. Please enter a positive number.");
        playerBet = parseInt(prompt("Enter your bet amount: "));
    }

    playerWallet = playerWallet - playerBet;

    if (playerWallet < 0) {
        console.log("Insufficient funds. Please add more funds.");
        return false;
    } else {
        return true;
    }
}