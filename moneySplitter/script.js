let personArr = [];
let itemList = [];
let personTotals = {};

document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark');
    
    if (document.body.classList.contains('dark')) {
        this.innerText = '☀️ Light Mode';
    } else {
        this.innerText = '🌙 Dark Mode';
    }
});


// Function to add persons
function addingPersonToArray() {
    let name = document.getElementById("nameOfPersons").value;

    if (name.trim() !== "") {
        personArr.push(name);
        document.getElementById("nameOfPersons").value = "";

        updatePersonList();
        updateCheckboxList();
    }
}

// Function to update the list of persons on UI
function updatePersonList() {
    let listContainer = document.getElementById("listOfPersons");
    listContainer.innerHTML = "";

    personArr.forEach(person => {
        let personItem = document.createElement("span");
        personItem.innerText = person;
        listContainer.appendChild(personItem);
        listContainer.appendChild(document.createElement("br"));
    });
}

// Function to update the checkbox list for persons
function updateCheckboxList() {
    let checkboxList = document.getElementById("checkboxList");
    checkboxList.innerHTML = "";

    personArr.forEach((person, index) => {
        let label = document.createElement("label");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = index;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(person));
        checkboxList.appendChild(label);
        checkboxList.appendChild(document.createElement("br"));
    });
}

// Function to add items and selected persons to the item list
function addItem() {
    let itemName = document.getElementById("nameOfItems").value;
    let amount = document.getElementById("amount").value;
    let selectedPersons = Array.from(document.querySelectorAll("#checkboxList input[type='checkbox']:checked")).map(checkbox => checkbox.value);

    if (itemName.trim() !== "" && amount.trim() !== "" && selectedPersons.length > 0) {
        let selectedPersonNames = selectedPersons.map(index => personArr[index]);

        // Create an object to store the item and related information
        let itemData = {
            item: itemName,
            amount: parseFloat(amount),
            persons: selectedPersonNames
        };

        // Add to the item list
        itemList.push(itemData);

        // Clear input fields
        document.getElementById("nameOfItems").value = "";
        document.getElementById("amount").value = "";
        document.querySelectorAll("#checkboxList input[type='checkbox']").forEach(checkbox => checkbox.checked = false);

        // Update the table with the new item
        updateItemTable();
    }
}

// Function to update the item table with the current itemList
function updateItemTable() {
    let tableBody = document.querySelector("#itemTable tbody");
    tableBody.innerHTML = "";

    itemList.forEach(item => {
        let row = document.createElement("tr");

        let itemCell = document.createElement("td");
        itemCell.innerText = item.item;

        let amountCell = document.createElement("td");
        amountCell.innerText = item.amount;

        let personsCell = document.createElement("td");
        personsCell.innerText = item.persons.join(", ");

        row.appendChild(itemCell);
        row.appendChild(amountCell);
        row.appendChild(personsCell);

        tableBody.appendChild(row);
    });
}

// Function to calculate and display total amount each person owes
function calculateTotalPerPerson() {
    // Reset person totals
    personTotals = {};

    personArr.forEach(person => {
        personTotals[person] = 0;
    });

    // Calculate each person's contribution
    itemList.forEach(item => {
        let splitAmount = item.amount / item.persons.length;

        item.persons.forEach(person => {
            personTotals[person] += splitAmount;
        });
    });

    // Display the totals
    let totalDiv = document.getElementById("totalPerPerson");
    totalDiv.innerHTML = "<h3>Amount Owed by Each Person:</h3>";

    for (let person in personTotals) {
        let totalItem = document.createElement("p");
        totalItem.innerText = `${person}: ₹${personTotals[person].toFixed(2)}`;
        totalDiv.appendChild(totalItem);
    }
}
