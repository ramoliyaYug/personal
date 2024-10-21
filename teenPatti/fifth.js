const cardRank = {
    "A": 14, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13
};

let specialSequenceArray = [2, 3, 14];

let playerBackendHand = [['7', 'hearts'], ['7', 'diamonds'], ['8', 'hearts']];
let computerBackendHand = [['7', 'diamonds'], ['9', 'hearts'], ['9', 'hearts']];

function creatingValueArrayOfPlayer() {
    return playerBackendHand.map(card => cardRank[card[0]]).sort((a, b) => a - b);
}

function creatingValueArrayOfComputer() {
    return computerBackendHand.map(card => cardRank[card[0]]).sort((a, b) => a - b);
}

function twoEqualValueCheckOfPlayer() {
    for (let i = 0; i < playerBackendHand.length - 1; i++) {
        for (let j = i + 1; j < playerBackendHand.length; j++) {
            if (playerBackendHand[i][0] === playerBackendHand[j][0]) {
                return cardRank[playerBackendHand[i][0]];
            }
        }
    }
    return null;
}

function twoEqualValueCheckOfComputer() {
    for (let i = 0; i < computerBackendHand.length - 1; i++) {
        for (let j = i + 1; j < computerBackendHand.length; j++) {
            if (computerBackendHand[i][0] === computerBackendHand[j][0]) {
                return cardRank[computerBackendHand[i][0]];
            }
        }
    }
    return null;
}

function getThirdCardValue(hand, repeatedValue) {
    return hand.map(card => cardRank[card[0]]).find(value => value !== repeatedValue);
}

function twoSameValueCase() {
    let playerRepeatedValue = twoEqualValueCheckOfPlayer();
    let computerRepeatedValue = twoEqualValueCheckOfComputer();

    if (playerRepeatedValue && !computerRepeatedValue) {
        return "Player wins";
    } else if (!playerRepeatedValue && computerRepeatedValue) {
        return "Computer wins";
    } else if (playerRepeatedValue && computerRepeatedValue) {
        if (playerRepeatedValue > computerRepeatedValue) {
            return "Player wins";
        } else if (playerRepeatedValue < computerRepeatedValue) {
            return "Computer wins";
        } else {
            let playerThirdCardValue = getThirdCardValue(playerBackendHand, playerRepeatedValue);
            let computerThirdCardValue = getThirdCardValue(computerBackendHand, computerRepeatedValue);

            if (playerThirdCardValue > computerThirdCardValue) {
                return "Player wins";
            } else if (playerThirdCardValue < computerThirdCardValue) {
                return "Computer wins";
            }
        }
    }
}

console.log(twoSameSuitCase());