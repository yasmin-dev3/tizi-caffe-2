const container = document.getElementById("cart-container");
const totalElement = document.getElementById("cart-total");

let orders = JSON.parse(localStorage.getItem("orders")) || [];

let total = 0;

if (orders.length === 0) {

    container.innerHTML = "<h2>Votre panier est vide.</h2>";

} else {

    orders.forEach((product, index) => {

        total += Number(product.price);

        const card = document.createElement("div");

        card.className = "cart-item";

        card.innerHTML = `
            <img src="${product.img}" alt="${product.alt}" width="120">

            <div class="cart-info">
                <h3>${product.title}</h3>
                <p>${product.subtitle}</p>
                <h4>${product.price} DA</h4>
            </div>

            <button class="delete-btn" data-index="${index}">
                Supprimer
            </button>
        `;

        container.appendChild(card);

    });

    totalElement.textContent = `Total : ${total} DA`;

}

// --------------------
// Supprimer un produit
// --------------------

document.querySelectorAll(".delete-btn").forEach((button) => {

    button.addEventListener("click", () => {

        const index = Number(button.dataset.index);

        orders.splice(index, 1);

        localStorage.setItem("orders", JSON.stringify(orders));

        location.reload();

    });

});

// --------------------
// Vider le panier
// --------------------

const clearBtn = document.getElementById("clear-cart");

clearBtn.addEventListener("click", () => {

    localStorage.removeItem("orders");

    location.reload();

});

// --------------------
// Commander
// --------------------

const commanderBtn = document.getElementById("commander");

commanderBtn.addEventListener("click", () => {

    if (orders.length === 0) {

        alert("Votre panier est vide.");

        return;

    }

    alert("Merci ! Votre commande a été enregistrée avec succès.");

    localStorage.removeItem("orders");

    window.location.href = "/";

});