document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll(".favorite-button");

  buttons.forEach(button => {

    button.addEventListener("click", function (event) {

      event.preventDefault();
      event.stopPropagation();

      const productId = this.dataset.productId;

      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      if (!favorites.includes(productId)) {
        favorites.push(productId);
      } else {
        favorites = favorites.filter(id => id !== productId);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));

      this.classList.toggle("is-favorite");

    });

  });

});