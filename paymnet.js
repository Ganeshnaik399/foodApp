function Openorders(){
    document.getElementById("openn").style.display="block";
}
/**?............oreder */
let cart = [];

function addToCart(btn){
    let card = btn.closest(".item-list");

    let name = card.querySelector("h3").innerText;
    let price = parseInt(
        card.querySelector("h5").innerText.replace("₹","")
    );

    let item = cart.find(i => i.name === name);

    if(item){
        item.qty += 1;
    } else {
        cart.push({name, price, qty:1});
    }

    alert(name + " added to cart");
}
function Openorders(btn){

    // 1. close all popups
    document.querySelectorAll(".openn").forEach(el => {
        el.style.display = "none";
    });

    // 2. find correct card
    let card = btn.closest(".item-list");

    // 3. open only that card popup
    let popup = card.querySelector(".openn");

    popup.style.display = "block";
}
function openOrder(){
    let popup = document.getElementById("orderPopup");
    let itemsDiv = document.getElementById("cartItems");

   let total = 0;

    if(cart.length === 0){
        itemsDiv.innerHTML = "<h3>Your Cart is Empty 🛒</h3>";
        popup.style.display="flex";
        return;
    }

   itemsDiv.innerHTML = `
  <div class="cart-header">
    <span>Item</span>
    <span>Price × Qty</span>
    <span>Total</span>
    <span>Action</span>
  </div>
`;

cart.forEach((item,index) => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    itemsDiv.innerHTML += `
    <div class="cart-row">

      <span>${item.name}</span>

      <span>
        ₹${item.price} × 
        <input type="number" min="1" value="${item.qty}" 
          onchange="updateQty(${index}, this.value)">
      </span>

      <span>₹${itemTotal}</span>

      <button onclick="removeItem(${index})">❌</button>

    </div>
    `;
});

    // DISCOUNT
    let discount = total > 1000 ? total * 0.05 : 0;
    let finalTotal = total - discount;

    itemsDiv.innerHTML += `
      <hr>
      <h3>Total: ₹${total}</h3>
      <h4>Discount: ₹${discount}</h4>
      <h2>Final: ₹${finalTotal}</h2>
      <button onclick="readyToShip()">Proceed</button>
    `;

    popup.style.display="flex";
}
function updateQty(index, qty){
    cart[index].qty = parseInt(qty);
    openOrder();
}
function removeItem(index){
    cart.splice(index,1);
    openOrder();
}
function closeOrder(){
    document.getElementById("orderPopup").style.display="none";
    document.querySelectorAll(".openn").forEach(el => {
    el.style.display = "none";
});
}
function readyToShip(){
    let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    let discount = total > 1000 ? total * 0.05 : 0;
    let finalTotal = total - discount;

    document.getElementById("cartItems").innerHTML = `
        <h2>🧾 Order Summary</h2>
        ${cart.map(item => `
            <div style="display:flex;justify-content:space-between;margin:5px;">
                <span>${item.name} (${item.qty})</span>
                <span>₹${item.price * item.qty}</span>
            </div>
        `).join("")}
        <hr>
        <h3>Total: ₹${total}</h3>
        <h4>Discount: ₹${discount}</h4>
        <h2>Payable: ₹${finalTotal}</h2>

        <input type="text" placeholder="Enter Address" style="width:80%;padding:8px;margin:10px 0;">

        <button onclick="payment(${finalTotal})">Proceed to Pay</button>
    `;
}
function payment(amount){
    document.getElementById("cartItems").innerHTML = `
        <h2>Select Payment Method</h2>
        <button onclick="upi(${amount})">UPI</button>
        <button onclick="card(${amount})">Debit Card</button>
        <button onclick="cod(${amount})">Cash on Delivery</button>
    `;
}

function upi(amount){
    document.getElementById("cartItems").innerHTML = `
        <h3>UPI Payment</h3>
        <p>Pay ₹${amount}</p>

        <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=ganesh@upi&pn=Store&am=${amount}" />

        <p>OR Enter UPI ID</p>
        <input id="upiId" placeholder="example@upi">

        <p id="timer">Time Left: 03:00</p>

        <button onclick="validateUpi(${amount})">Pay Now</button>
    `;

    startTimer(180);
}
function startTimer(seconds){
    let timer = document.getElementById("timer");

    let interval = setInterval(() => {
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;

        timer.innerText = `Time Left: ${min}:${sec < 10 ? "0"+sec : sec}`;
        seconds--;

        if(seconds < 0){
            clearInterval(interval);
            timer.innerText = "Session Expired ❌";
        }
    }, 1000);
}
function validateUpi(amount){
    let upi = document.getElementById("upiId").value;

    if(!upi.includes("@")){
        alert("Invalid UPI ID");
        return;
    }

    success(amount, "UPI");
}
function card(amount){
    document.getElementById("cartItems").innerHTML = `
        <h3>Debit Card Payment</h3>

        <input placeholder="Card Number" id="cardNo"><br>
        <input placeholder="Card Holder Name"><br>
        <input placeholder="MM/YY"><br>
        <input placeholder="CVV" type="password"><br>

        <button onclick="verifyCard(${amount})">Pay ₹${amount}</button>
    `;
}
function verifyCard(amount){
    let card = document.getElementById("cardNo").value;

    if(card.length < 12){
        alert("Invalid Card Number");
        return;
    }

    success(amount, "Card");
}
function cod(amount){
    success(amount, "Cash on Delivery");
}

function success(amount, method){
    let orderId = "ORD" + Math.floor(Math.random()*100000);

    document.getElementById("cartItems").innerHTML = `
        <h2> Payment Successful</h2>
           <div style="display:flex;justify-content:center"><img style="width:100px;height:100px;border-radius:50px" src="https://fastpan.utiindia.in/WL-CNT/main/assest/img/success.gif"></div>
        <div style="border:1px solid #ccc;padding:10px;margin:10px;">
            <h3>Receipt</h3>
            <p>Order ID: ${orderId}</p>
            <p>Amount Paid: ₹${amount}</p>
            <p>Payment Method: ${method}</p>
            <p>Status: ✅ Completed</p>
        </div>

        <button onclick="goHome()">Back to Home</button>
    `;

    cart = [];
}
function goHome(){
    document.getElementById("orderPopup").style.display = "none";
    location.reload(); // simple redirect
}