const cardRank = {
    "A": 14, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13
};

let playerBackendHand = [['8', 'spades'], ['4', 'spades'], ['A', 'spades']];
let computerBackendHand = [['9', 'hearts'], ['4', 'hearts'], ['A', 'hearts']];

function creatingValueArrayOfPlayer() {
    let playerValueArray = playerBackendHand.map(card => cardRank[card[0]]).sort((a, b) => a - b);
    return playerValueArray;
}

function creatingValueArrayOfComputer() {
    let computerValueArray = computerBackendHand.map(card => cardRank[card[0]]).sort((a, b) => a - b);
    return computerValueArray;
}

function threeEqualSuitsCheckOfPlayer() {
    return playerBackendHand[0][1] === playerBackendHand[1][1] && playerBackendHand[1][1] === playerBackendHand[2][1];
}

function threeEqualSuitsCheckOfComputer() {
    return computerBackendHand[0][1] === computerBackendHand[1][1] && computerBackendHand[1][1] === computerBackendHand[2][1];
}


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
}

console.log(suitOnlyCase());