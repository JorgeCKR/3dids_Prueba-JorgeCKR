document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll(".favorite-button");

  buttons.forEach(button => {

    button.addEventListener("click", function (event) {

      event.preventDefault();
      event.stopPropagation();

      const productHandle = this.dataset.productHandle;

      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      if (!favorites.includes(productHandle)) {
        favorites.push(productHandle);
      } else {
        favorites = favorites.filter(id => id !== productId);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));

      this.classList.toggle("is-favorite");

    });

  });

});

document.addEventListener("DOMContentLoaded", function () {

  const favoritesGrid = document.getElementById("favorites-grid");

  if (!favoritesGrid) return;

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    favoritesGrid.innerHTML = "<p>No tienes favoritos guardados.</p>";
    return;
  }

  favorites.forEach(productId => {

    fetch(`/products/${productId}.js`)
      .then(response => response.json())
      .then(product => {

        const productCard = `
          <div class="favorite-item">
            <a href="${product.url}">
              <img src="${product.featured_image}" alt="${product.title}">
              <h3>${product.title}</h3>
              <p>${(product.price / 100).toFixed(2)} €</p>
            </a>
          </div>
        `;

        favoritesGrid.insertAdjacentHTML("beforeend", productCard);

      });

  });

});

const favoritesSaved = JSON.parse(localStorage.getItem("favorites")) || [];

document.querySelectorAll(".favorite-button").forEach(button => {

  const handle = button.dataset.productHandle;

  if (favoritesSaved.includes(handle)) {
    button.classList.add("is-favorite");
  }

});