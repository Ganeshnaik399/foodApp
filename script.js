function toggleMenu(){
    document.getElementById("navbar").classList.toggle("active");
}
/* FILTER FUNCTION */
let selectedCategory = "all";
let selectedPrice = "all";

/* CATEGORY FILTER */
function filterMenu(category) {
    selectedCategory = category;
    applyFilters();

    document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
}

/* PRICE FILTER */
function filterPrice(price) {
    let menu = document.getElementById("price-menu");

    menu.style.display = "grid";
    setTimeout(() => {
        menu.classList.add("show");
    }, 10);

    selectedPrice = price;
    applyFilters();
}

/* MAIN FILTER FUNCTION */
function applyFilters() {
    let items = document.querySelectorAll(".card");

    items.forEach(item => {
        let category = item.getAttribute("data-category");
        let price = item.getAttribute("data-price");

        let showCategory = (selectedCategory === "all" || category === selectedCategory);
        let showPrice = (selectedPrice === "all" || price === selectedPrice);

        if (showCategory && showPrice) {
            item.style.display = "block";   // ✅ FORCE SHOW
            setTimeout(() => {
                item.classList.remove("hide");
            }, 10);
        } else {
            item.classList.add("hide");
            setTimeout(() => {
                item.style.display = "none";  // ✅ FORCE HIDE
            }, 300);
        }
    });
}
function filterMenu(category, e) {
    selectedCategory = category;
    applyFilters();

    document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
}
// SCROLL ANIMATION
const cards = document.querySelectorAll(".card1");

window.addEventListener("scroll", () => {
    const triggerBottom = window.innerHeight * 0.85;

    cards.forEach(card1 => {
        const boxTop = card1.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            card1.classList.add("show");
        }
    });
});
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
    document.getElementById("cartItems").innerHTML = `
      <h3 style="margin-left:50px;">Ready to Ship 🚚</h3>
      <input style="width:250px;height:30px;border-radius:10px;" type="text" placeholder="Enter Address"></br>
      <button style="font-size:15px;margin:2%;cursor:pointer;" id="proceed" onclick="payment()">Proceed to Payment</button>
    `;
}
function payment(){
    document.getElementById("cartItems").innerHTML = `
      <h3>Select Payment</h3>
      <button style="cursor:pointer;width:100px;" onclick="upi()">UPI</button>
      <button style="cursor:pointer;" onclick="card()">Card</button>
      <button style="cursor:pointer;" onclick="cod()">Cash on Delivery</button>
    `;
}

function upi(){
    document.getElementById("cartItems").innerHTML = `
      <h3>Scan & Pay</h3>
      <img style="border:1px solid black;padding:10px;margin-left:50px;" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https//github.com/ganeshnaik399"><br>
      <button style="background-color:yellow;border:none;width:200px;border-radius:10px; height:30px;margin-left:40px;margin-top:10px;font-style:bold;cursor:pointer;" onclick="success()">Done</button>
    `;
}

function card(){
    document.getElementById("cartItems").innerHTML = `  
    <input type="text" placeholder="Card Number">
      <input placeholder="CVV">
      <button style="background-color:yellow;width:50px;border-radius:5px; cursor:pointer;:hover{background-color:green;}" onclick="verify()">verify</button>
      <label style="display:none;color:green;" id="label">name:Ganesh naik  /verified</label><br>
      <button style="background-color:red;border:none;width:200px;border-radius:10px; height:30px;margin-left:40px;margin-top:10px;font-style:bold;cursor:pointer;" onclick="success()">Pay</button>
    `;
}
function verify(){
    document.getElementById("label").style.display="block";
}
function cod(){
    success();
}

function success(){
    document.querySelectorAll(".openn").forEach(el => {
        el.style.display = "none";
    });

    document.getElementById("cartItems").innerHTML = `
      <h4>🎉 Order Placed Successfully🎉</h4>
      <h3>Thank you sir/Madam</h3>
      <h1 style="color:yellow;">Enjoy The Taste</h1>
    `;

    cart = [];
}
function openLogin() {
    document.getElementById("loginPopup").style.display = "block";
}

function closeLogin() {
    document.getElementById("loginPopup").style.display = "none";
}
function flipToRegister() {
    document.getElementById("flipCard").classList.add("flipped");
}
function flipToLogin() {
    document.getElementById("flipCard").classList.remove("flipped");
}