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
        favorites = favorites.filter(id => id !== productHandle);
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

  favorites.forEach(productHandle => {

    fetch(`/products/${productHandle}.js`)
      .then(response => response.json())
      .then(product => {

        const productCard = `
        <li class="product-grid__item favorite-item">

          <div class="iqitwishlist-product-box">

            <div class="thumbnail-container border">

              <button 
                class="remove-favorite position-absolute"
                data-handle="${product.handle}"
              >
                🗑
              </button>

              <a href="${product.url}">
                <img 
                  src="${product.images[0]}" 
                  alt="${product.title}" 
                  class="img-fluid"
                >
              </a>

            </div>

            <div class="product-description">

              <div class="h3 product-title mt-2 fs-10 font-weight-normal">

                <a href="${product.url}">
                  ${product.title}
                </a>

                <div class="mt-1">
                  <span class="product-price font-weight-bold">
                    ${(product.price / 100).toFixed(2)} €
                  </span>
                </div>

              </div>

            </div>

          </div>

        </li>
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

document.addEventListener("click", function(e){

  if(!e.target.classList.contains("remove-favorite")) return;

  const handle = e.target.dataset.handle;

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites = favorites.filter(item => item !== handle);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  e.target.closest(".favorite-item").remove();

});