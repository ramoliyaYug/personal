const nameInputSection = document.getElementById('nameInputSection');
const mainContent = document.getElementById('mainContent');
const greeting = document.getElementById('greeting');
const nameInput = document.getElementById('nameInput');
const submitName = document.getElementById('submitName');

const tipsButton = document.getElementById('tipsButton');
const wishButton = document.getElementById('wishButton');
const tipsPopup = document.getElementById('tipsPopup');
const wishPopup = document.getElementById('wishPopup');
const finalMessage = document.getElementById('finalMessage');
const closeTips = document.getElementById('closeTips');
const sendWish = document.getElementById('sendWish');
const closeFinal = document.getElementById('closeFinal');

submitName.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        greeting.textContent = `Best of Luck, ${name}! 🎉`;
        nameInputSection.classList.add('hidden');
        mainContent.classList.remove('hidden');
    } else {
        alert("Please enter a valid name!");
    }
});

tipsButton.addEventListener('click', () => {
    tipsPopup.classList.remove('hidden');
});

closeTips.addEventListener('click', () => {
    tipsPopup.classList.add('hidden');
});

wishButton.addEventListener('click', () => {
    wishPopup.classList.remove('hidden');
});

sendWish.addEventListener('click', () => {
    alert('Your wish will surely come true! 🌟');
    wishPopup.classList.add('hidden');
    finalMessage.classList.remove('hidden');
});

closeFinal.addEventListener('click', () => {
    finalMessage.classList.add('hidden');
});
