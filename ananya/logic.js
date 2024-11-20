// Generate a random number between 1 and 100
let cnum = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

let attemptsData = document.getElementById("Attempts");
let userinp = document.getElementById("inp");
let subBtn = document.getElementById("submit");
let resBtn = document.getElementById("resBtn");
let message = document.getElementById("msg");

function check() {
    let usernum = parseInt(userinp.value);
    if (cnum === usernum) {
        message.innerHTML = "Congratulations! You guessed the number!";
        message.style.color = "green";
        resBtn.style.display = "block";
        subBtn.style.display = "none";
    } else if (cnum < usernum) {
        message.innerHTML = "Too high! Try again.";
        message.style.color = "red";
    } else {
        message.innerHTML = "Too low! Try again.";
        message.style.color = "red";
    }
    attempts++;
    attemptsData.innerHTML = attempts;

    setTimeout(() => {
        userinp.value = "";
        message.innerHTML = "";
    }, 1000);
}

function restart() {
    cnum = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsData.innerHTML = attempts;
    message.innerHTML = "";
    message.style.color = "black";
    userinp.value = "";
    resBtn.style.display = "none";
    subBtn.style.display = "block";
}

subBtn.addEventListener("click", check);
resBtn.addEventListener("click", restart);
