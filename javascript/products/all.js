import { fetchProducts } from "../database/fetch-products.js";

const productsURL = "../../database/products/hot.json";
const gridContainer = document.getElementById("products-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");
const cartBadge = document.querySelector(".cart-badge");
let currentCategory = "all";
let currentSearchQuery = "";

function updateCartBadge() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  if (cartBadge) cartBadge.textContent = orders.length;
}

// Global render trigger using current global states
function renderMenu() {
  fetchProducts(productsURL, gridContainer, currentCategory, currentSearchQuery);
}


searchInput?.addEventListener("input", (e) => {
  currentSearchQuery = e.target.value;
  renderMenu();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    currentCategory = e.target.getAttribute("data-category");
    renderMenu();
  });
});

gridContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("product-buy")) {
    const btn = e.target;
    btn.textContent = "Ajouté !";
    btn.style.backgroundColor = "#2e7d32";
    
    setTimeout(() => {
      updateCartBadge();
      btn.textContent = "Ajouter au panier";
      btn.style.backgroundColor = "";
    }, 400);
  }
});

updateCartBadge();
renderMenu();