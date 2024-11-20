const cardRank = {
    "A": 14, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13
};

let playerBackendHand = [['4', 'diamonds'], ['3', 'hearts'], ['8', 'hearts']];
let computerBackendHand = [['7', 'diamonds'], ['A', 'hearts'], ['9', 'hearts']];

function creatingValueArrayOfPlayer() {
    return playerBackendHand.map(card => cardRank[card[0]]).sort((a, b) => a - b);
}

function creatingValueArrayOfComputer() {
    return computerBackendHand.map(card => cardRank[card[0]]).sort((a, b) => a - b);
}

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
}

console.log(lastCase());