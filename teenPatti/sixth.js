const cardRank = {
    "A": 14, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13
};

let playerBackendHand = [ [ '2', 'spades' ], [ '5', 'diamonds' ], [ 'K', 'spades' ] ];
let computerBackendHand = [ [ '9', 'diamonds' ], [ 'K', 'diamonds' ], [ '5', 'clubs' ] ];

function creatingValueArrayOfPlayer() {
    return playerBackendHand.map(card => cardRank[card[0]]).sort((a, b) => a - b);
}

function creatingValueArrayOfComputer() {
    return computerBackendHand.map(card => cardRank[card[0]]).sort((a, b) => a - b);
}

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
    return null; // Return null if no matching suits are found
};

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
}

function twoSameSuitCase() {
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
    return "No clear winner"; // In case all comparisons are tied
}

console.log(twoSameSuitCase());
