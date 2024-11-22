// Get references to buttons and forms
const studentButton = document.getElementById('studentButton');
const wardenButton = document.getElementById('wardenButton');
const studentForm = document.getElementById('studentForm');
const wardenForm = document.getElementById('wardenForm');

// Function to show student login form and hide warden form
studentButton.addEventListener('click', () => {
    studentForm.style.display = 'block'; // Show student form
    wardenForm.style.display = 'none';  // Hide warden form
});

// Function to show warden login form and hide student form
wardenButton.addEventListener('click', () => {
    wardenForm.style.display = 'block'; // Show warden form
    studentForm.style.display = 'none'; // Hide student form
});
