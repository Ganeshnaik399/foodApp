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
function showSignup(){
    document.getElementById("loginForm").style.display="none";
    document.getElementById("signupForm").style.display="block";
}
function formopen()
{
    document.getElementById("boxs").style.display="block";
    document.getElementById("click-btn").style.display="none";
}
function formclose()
{
    document.getElementById("boxs").style.display="none";
    document.getElementById("click-btn").style.display="block";
}

function showLogin(){
    document.getElementById("signupForm").style.display="none";
    document.getElementById("loginForm").style.display="block";
}