let cart = [];
let amountYouHave = 1000;
document.getElementById('money').innerText = amountYouHave;
let totalCost = 0;

// Add item to the cart array
function add(id, items, price, quantity) {
  // Check if the item is already in the cart
  let exists = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      exists = true;
      break;
    }
  }
  // If the item is not in the cart, add it
  if (!exists) {
    cart.push({ id, items, price, quantity });
  }
  return cart;
}

// Manage quantity addition with if-else statements
function quantityManageAdd(x) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === x) {
      cart[i].quantity += 1;
      document.getElementById(`lable${x}`).innerText = cart[i].quantity;
      break;
    }
  }
}

// Manage quantity subtraction with if-else statements
function quantityManageSubtract(x) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === x && cart[i].quantity > 0) {
      cart[i].quantity -= 1;
      document.getElementById(`lable${x}`).innerText = cart[i].quantity;
      break;
    }
  }
}

// Calculate total quantity and total price
function total() {
  let totalItems = 0;

  // Calculate the total number of items and total cost
  for (let i = 0; i < cart.length; i++) {
    totalItems += cart[i].quantity;
    totalCost += cart[i].price * cart[i].quantity;
  }

  // Display total items and total cost
  document.getElementById('totalItems').innerText = totalItems;
  document.getElementById('kharcha').innerText = totalCost;

  // Reset displayed quantities to 0
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`lable${i}`).innerText = 0;
  }

  // Empty the cart after calculation
  cart = [];
  return totalCost;
}

// Check if the amount you have is enough to buy the items in the cart  
  function checkAmount() {
    if (totalCost <= amountYouHave) {
      document.getElementById('display').innerText = "";
      let remainingAmount = amountYouHave - totalCost;
      document.getElementById('money').innerText = remainingAmount;
      // return true;
    } else {
      document.getElementById('display').innerText = "Insufficient amount";
      document.getElementById('paisa').innerText = amountYouHave;
      // return false;
    }
  }