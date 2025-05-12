const firstName = localStorage.getItem('firstName');
const lastName = localStorage.getItem('lastName');

if (!firstName || !lastName) {
  alert("You must be signed in to access the products.");
  window.location.href = "../pages/login.html"; 
}
document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".products");
    const totalContainer = document.querySelector(".cart-total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalContainer.style.display = "none";
        return;
    }

    function updateCartDisplay() {
        cartContainer.innerHTML = "";
        let totalPrice = 0;
        let totalItems = 0;
        let totalSavings = 0;

        cart.forEach((item, index) => {
            const price = parseInt(item.price);
            const quantity = item.quantity || 1;
            const offer = 5;
            const itemTotal = price * quantity;
            const savings = Math.round(price * offer / 100) * quantity;

            totalPrice += itemTotal;
            totalItems += quantity;
            totalSavings += savings;

            const productHTML = document.createElement("div");
            productHTML.classList.add("product");
            productHTML.innerHTML = `
                <div class="product-info">
                    <h3 class="product-name">${item.name}</h3>
                    <h4 class="product-price">₹ ${price.toLocaleString()}</h4>
                    <h4 class="product-offer">${offer}%</h4>
                    <p class="product-quantity">
                        Qnt:
                        <input type="number" min="1" value="${quantity}" data-index="${index}" class="qty-input">
                    </p>
                    <button class="remove-btn" data-index="${index}">🗑 Remove</button>
                </div>
            `;
            cartContainer.appendChild(productHTML);
        });

        totalContainer.innerHTML = `
            <p><span>Total Price</span><span>₹ ${totalPrice.toLocaleString()}</span></p>
            <p><span>Number of Items</span><span>${totalItems}</span></p>
            <p><span>You Save</span><span>₹ ${totalSavings.toLocaleString()}</span></p>
            <a href="../pages/payment.html" id="checkout-btn">Proceed to Checkout</a>
        `;

        // Save total to localStorage on checkout
        const checkoutBtn = document.getElementById("checkout-btn");
        if (checkoutBtn) {
            checkoutBtn.addEventListener("click", () => {
                localStorage.setItem("totalPrice", totalPrice);
            });
        }

        addEventListeners(); // re-bind events
    }

    function addEventListeners() {
        document.querySelectorAll(".qty-input").forEach(input => {
            input.addEventListener("change", (e) => {
                let index = e.target.dataset.index;
                let newQty = Math.max(1, parseInt(e.target.value));
                cart[index].quantity = newQty;
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
            });
        });

        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                let index = e.target.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }

    updateCartDisplay();
});
