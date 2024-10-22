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
    let continueGame = true;
    while (continueGame) {
        //showing player's cards
        console.log("Your cards are: " + playerDisplayHand);
    }
        
}