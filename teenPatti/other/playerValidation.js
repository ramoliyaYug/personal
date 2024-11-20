function playerValidation(event) {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const amount = parseInt(document.getElementById("amount").value);
    const errorDisplay = document.getElementById("errorDisplay");

    // Validate name
    if (name === "") {
        errorDisplay.innerText = "Please enter your name";
        return;
    }
    // Validate age
    if (age < 18) {
        errorDisplay.innerText = "Please enter a valid age";
        return;
    }
    // Validate amount
    if (amount <= 0) {
        errorDisplay.innerText = "Please enter a valid amount";
        return;
    }
    
    // Hide form and show start button if validation passes
    document.querySelector(".parentFormDiv").style.display = "none";
    document.querySelector(".parentStartBtn").style.display = "flex";
}
