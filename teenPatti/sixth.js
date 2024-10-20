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

function twoEqualSuitCheck(hand) {
    for (let i = 0; i < hand.length - 1; i++) {
        for (let j = i + 1; j < hand.length; j++) {
            if (hand[i][1] === hand[j][1]) {
                return true;
            }
        }
    }
    return false;
}

function twoEqualSuitCheckAndReturn(hand) {
    for (let i = 0; i < hand.length - 1; i++) {
        for (let j = i + 1; j < hand.length; j++) {
            if (hand[i][1] === hand[j][1]) {
                return [
                    [cardRank[hand[i][0]], cardRank[hand[j][0]]], 
                    hand[i][1]
                ];
            }
        }
    }
    return null; // Return null if no matching suits are found
}

function finalSixthCase() {
    let maxValueOfPlayer = Math.max(...creatingValueArrayOfPlayer());
    let maxValueOfComputer = Math.max(...creatingValueArrayOfComputer());

    let equalSuitPlayerValueAndSuit = twoEqualSuitCheckAndReturn(playerBackendHand);
    let equalSuitComputerValueAndSuit = twoEqualSuitCheckAndReturn(computerBackendHand);

    if (twoEqualSuitCheck(playerBackendHand) && !twoEqualSuitCheck(computerBackendHand)) {
        return "Player wins";
    } else if (!twoEqualSuitCheck(playerBackendHand) && twoEqualSuitCheck(computerBackendHand)) {
        return "Computer wins";
    } else if (twoEqualSuitCheck(playerBackendHand) && twoEqualSuitCheck(computerBackendHand)) {
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

console.log(finalSixthCase());
