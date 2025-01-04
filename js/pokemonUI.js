const pokemonUI = (function () {

  // Create a list item of Pokemon
  function createListItem(pokemon) {
    let listItem = document.createElement("li");
    listItem.classList.add("pokemon-list__item");

    let pokemonNameButton = createPokemonName(pokemon, listItem);
    listItem.appendChild(pokemonNameButton);

    return listItem;
  }

  // Create a button of Pokemon name
  function createPokemonName(pokemon, listItem) {
    let nameButton = document.createElement("button");
    nameButton.textContent = pokemon.name;
    nameButton.classList.add("pokemon-list__name-button");

    // event listener to display information on click
    nameButton.addEventListener("click", function () {
      let detailsContainer = listItem.querySelector(".pokemon-list__details");

      if (!detailsContainer) {
        detailsContainer = createPokemonDetails(pokemon);
        listItem.appendChild(detailsContainer);
      }

      detailsContainer.classList.toggle("hidden");

    });

    return nameButton;
  }

  // function to create Pokemon's detials
  function createPokemonDetails(pokemon) {
    let detailsContainer = document.createElement("div");
    detailsContainer.classList.add("pokemon-list__details", "hidden");

    let pokemonHeight = createPokemonHeight(pokemon.height);
    detailsContainer.appendChild(pokemonHeight);

    if (isPokemonBig(pokemon.height)) {
      let bigMessage = createBigMessage();
      detailsContainer.appendChild(bigMessage);
    }

    return detailsContainer;
  }

  // function to create the Pokemon's height element
  function createPokemonHeight(height) {
    let heightElement = document.createElement("div");
    heightElement.textContent = `Height: ${height} m`;
    heightElement.classList.add("pokemon-list__height");
    return heightElement;
  }

  // fuction to determine if pokemon is big
  function isPokemonBig(height) {
    return height > 1;
  }

  // function to create "wow..." message
  function createBigMessage() {
    let bigMessageElement = document.createElement("div");
    bigMessageElement.textContent = "Wow, that's big!";
    bigMessageElement.classList.add("pokemon-list__big");
    return bigMessageElement;
  }

  // Render the Pokemon list in the UI
  function populatePokemonList(pokemonList, listElement) {
    pokemonList.forEach(function (pokemon) {
      let listItem = createListItem(pokemon);
      listElement.appendChild(listItem);
    });
  }

  return {
    populatePokemonList,
  };

})();