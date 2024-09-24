let cart = [];

function add(vastu, price) {
  cart.push({ vastu, price });
//   console.log(`${vastu} added to cart wtih price of ${price}`);
//   console.log(cart);
  return cart;
}

function total() {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price;
  }
  let arrLength = cart.length;
//   console.log(arrLength);
//   console.log(`Total amount spent is ${totalPrice}`);

  document.getElementById('totalItems').textContent = arrLength;
  document.getElementById('kharcha').textContent = `₹${totalPrice}`;

//   document.getElementById('cart').textContent = final;

//   console.log(`Total amount spent is ₹${totalPrice}`);
//   console.log(`Total items purchased: ${arrLength}`);

  cart = [];
//   console.log("Cart has been cleared:", cart);
}