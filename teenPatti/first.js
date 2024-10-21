const cardRank = {
    "A": 14, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13
}

let playerBackendHand = [ [ '8', 'spades' ], [ '4', 'diamonds' ], [ 'K', 'clubs' ] ];

let computerBackendHand = [ [ 'A', 'hearts' ], [ 'A', 'hearts' ], [ 'A', 'diamonds' ] ];

function threeEqualValueCheckOfPlayer(){
    for(let i = 0; i<3; i++){
        if(playerBackendHand[i][0] === playerBackendHand[i+1][0] && playerBackendHand[i+1][0] === playerBackendHand[i+2][0]){
            return true;
        }
        return false;
    }
}

function threeEqualValueCheckOfComputer(){
    for(let i = 0; i<3; i++){
        if(computerBackendHand[i][0] === computerBackendHand[i+1][0] && computerBackendHand[i+1][0] === computerBackendHand[i+2][0]){
            return true;
        }
        return false;
    }
}

function threeEqualValueCheckSubCase(){
    let playerValue = cardRank[playerBackendHand[0][0]];
    let computerValue = cardRank[computerBackendHand[0][0]];
    if(playerValue > computerValue){
        return "Player wins";
    }else if(playerValue < computerValue){
        return "Computer wins";
    }
}

function threeEqualValueCardCase(){
    if(threeEqualValueCheckOfPlayer() === threeEqualValueCheckOfComputer()){
        return threeValueCheckSubCase();
    }else if(threeEqualValueCheckOfPlayer()){
        return "Player wins";
    }else if(threeEqualValueCheckOfComputer()){
        return "Computer wins";
    }
}

console.log(threeCardCase());