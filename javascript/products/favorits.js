import { fetchProducts } from "../database/fetch-products.js";

const favoritsURL = "../../database/products/favorits.json";

const container = document.getElementById("favorits-list");

if (container) {
    fetchProducts(favoritsURL, container);
}