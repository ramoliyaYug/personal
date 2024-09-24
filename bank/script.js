const correctEmail = "yug@gmail.com";
const correctPassword = "yug";

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get input values
    const enteredEmail = document.getElementById("email").value;    
    const enteredPassword = document.getElementById("password").value;

    // Check if entered credentials match the correct ones
    if (enteredEmail === correctEmail && enteredPassword === correctPassword) {
      // Redirect to another page if credentials are correct
      window.location.href = "welcome.html"; // Change to the desired page
    } else {
      // Show error message if credentials are incorrect
      document.getElementById("errorMessage").style.display = "block";
    }
  });
