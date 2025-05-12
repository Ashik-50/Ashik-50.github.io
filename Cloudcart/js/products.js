document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const name = card.querySelector("h3").textContent;
      const priceText = card.querySelector("p").textContent;
      const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10); 

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${name} added to cart!`);
    });
  });
});
