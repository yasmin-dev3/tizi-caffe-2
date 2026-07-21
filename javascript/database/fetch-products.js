export function fetchProducts(productsUrl, container, categoryFilter = "all", searchQuery = "") {
  container.innerHTML = "";

  fetch(productsUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load products");
      return response.json();
    })
    .then((products) => {
      // Filter by BOTH category and search term dynamically
      const filteredProducts = products.filter((product) => {
        const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
        
        const cleanSearch = searchQuery.toLowerCase().trim();
        const matchesSearch = !cleanSearch || 
          product.title.toLowerCase().includes(cleanSearch) || 
          product.subtitle.toLowerCase().includes(cleanSearch);

        return matchesCategory && matchesSearch;
      });

      if (filteredProducts.length === 0) {
        container.innerHTML = `
          <div class="no-products">
            <p>☕ Aucun produit ne correspond à votre recherche.</p>
          </div>
        `;
        return;
      }

      // Render items loop
      filteredProducts.forEach((product) => {
        const productCard = document.createElement("article");
        productCard.className = "product-card";

        const badgeHTML = product.badge 
          ? `<div class="product-badge ${product.badgeClass || ''}">${product.badge}</div>` 
          : '';

        productCard.innerHTML = `
          ${badgeHTML}
          <div class="product-visual">
            <img src="${product.img}" alt="${product.alt}" class="product-img" loading="lazy" />
          </div>
          <div class="product-body">
            <div class="product-rating star">${product.ratingValue} ★</div>
            <div class="product-title">${product.title}</div>
            <div class="product-subtitle">${product.subtitle}</div>
            <div class="product-action">
              <div class="product-price">${product.price} DA</div>
              <button class="product-buy">Ajouter au panier</button>
            </div>
          </div>
        `;
        container.appendChild(productCard);

        const productBuy = productCard.querySelector(".product-buy");
        productBuy?.addEventListener("click", () => {

    alert(product.title + " ajouté au panier");

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push(product);

    localStorage.setItem("orders", JSON.stringify(orders));

    const badge = document.querySelector(".cart-badge");

    if (badge) {
        badge.textContent = orders.length;
    }

});
      });
    })
    .catch((error) => {
      console.error(error);
      container.innerHTML = `<p class="error-message">Erreur de chargement des produits.</p>`;
    });
}