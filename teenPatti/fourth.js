const cardRank = {
    "A": 14, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13
}

let specialSequenceArray = [2,3,14]

let playerBackendHand = [ [ '6', 'hearts' ], [ '7', 'diamonds' ], [ '8', 'hearts' ] ];

let computerBackendHand = [ [ '7', 'diamonds' ], [ '8', 'hearts' ], [ '9', 'hearts' ] ];

//no need of recreating the function again just call it
function creatingValueArrayOfPlayer(){
    let playerValueArray = playerBackendHand.map(card => cardRank[card[0]]).sort((a,b)=>a-b);
    return playerValueArray;
}

function creatingValueArrayOfComputer(){
    let computerValueArray = computerBackendHand.map(card => cardRank[card[0]]).sort((a,b)=>a-b);
    return computerValueArray;
}

function threeEqualSuitsCheckOfPlayer(){
    for(let i = 0; i<3; i++){
        if(playerBackendHand[i][1] === playerBackendHand[i+1][1] && playerBackendHand[i+1][1] === playerBackendHand[i+2][1]){
            return true;
        }
        return false;
    }
}

function threeEqualSuitsCheckOfComputer(){
    for(let i = 0; i<3; i++){
        if(computerBackendHand[i][1] === computerBackendHand[i+1][1] && computerBackendHand[i+1][1] === computerBackendHand[i+2][1]){
            return true;
        }
        return false;
    }
}

function sequenceCheckOfPlayer(){
    let playerValueArray = creatingValueArrayOfPlayer();
    for(let i = 0; i<2; i++){
        if(playerValueArray[i] + 1 === playerValueArray[i+1] && playerValueArray[i+1] + 1 === playerValueArray[i+2]){
            return true;
        }
    }
    return false;
}

function sequenceCheckOfComputer(){
    let computerValueArray = creatingValueArrayOfComputer();
    for(let i = 0; i<2; i++){
        if(computerValueArray[i] + 1 === computerValueArray[i+1] && computerValueArray[i+1] + 1 === computerValueArray[i+2]){
            return true;
        }
    }
    return false;
}

function specialSequenceOfPlayer(){
    let playerValueArray = creatingValueArrayOfPlayer();
    if(playerValueArray.every((element, index)=> element === specialSequenceArray[index])){
        return true;
    }
    return false;
}

function specialSequenceOfComputer(){
    let computerValueArray = creatingValueArrayOfComputer();
    if(computerValueArray.every((element, index)=> element === specialSequenceArray[index])){
        return true;
    }
    return false;
}

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
        // Compare the highest card in the sequence
        if (playerValueArray[2] > computerValueArray[2]) {
            return "Player wins";
        } else if (playerValueArray[2] < computerValueArray[2]) {
            return "Computer wins";
        } else {
            // If the highest card is the same, compare the second highest card
            if (playerValueArray[1] > computerValueArray[1]) {
                return "Player wins";
            } else if (playerValueArray[1] < computerValueArray[1]) {
                return "Computer wins";
            } else {
                // If the second highest card is also the same, compare the third
                if (playerValueArray[0] > computerValueArray[0]) {
                    return "Player wins";
                } else if (playerValueArray[0] < computerValueArray[0]) {
                    return "Computer wins";
                }
            }
        }
    } else {
        // If no sequences, compare the highest card
        if (playerValueArray[2] > computerValueArray[2]) {
            return "Player wins";
        } else if (playerValueArray[2] < computerValueArray[2]) {
            return "Computer wins";
        } else if (playerValueArray[1] > computerValueArray[1]) {
            return "Player wins";
        } else if (playerValueArray[1] < computerValueArray[1]) {
            return "Computer wins";
        } else if (playerValueArray[0] > computerValueArray[0]) {
            return "Player wins";
        } else if (playerValueArray[0] < computerValueArray[0]) {
            return "Computer wins";
        } else {
            return "It's a tie";
        }
    }
}

console.log(onlySequenceCase());