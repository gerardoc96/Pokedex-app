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
      showDetails(pokemon, this);
    });

    return nameButton;
  }

  function showDetails(pokemon, buttonElement) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      // Find the parent list item of the clicked button
      let listItem = buttonElement.parentNode;

      // Check if a details container already exists in this list item
      let detailsContainer = listItem.querySelector('.pokemon-details');
      if (!detailsContainer) {
        detailsContainer = document.createElement('div');
        detailsContainer.classList.add('pokemon-details');
        listItem.appendChild(detailsContainer);
      }

      // Populate the details
      detailsContainer.innerHTML = `
        <p><strong>${pokemon.name}</strong></p>
        <img src="${pokemon.imgUrl}" alt="${pokemon.name}">
        <p>Type: ${pokemon.type.join(', ')}</p>
        <p>Height: ${pokemon.height}m</p>
      `;

      // Toggle visibility
      detailsContainer.style.display =
        detailsContainer.style.display === 'block' ? 'none' : 'block';
    });
  }
  // Render the Pokemon list in the UI
  function populatePokemonList(pokemonList, listElement) {
    listElement.innerHTML = "";
    pokemonList.forEach(function (pokemon) {
      let listItem = createListItem(pokemon);
      listElement.appendChild(listItem);
    });
  }

  function showLoadingMessage() {
    const loadingMessage = document.createElement('div');
    loadingMessage.id = 'loading-message';
    loadingMessage.textContent = 'Loading...';
    document.body.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }

  return {
    populatePokemonList,
    showLoadingMessage,
    hideLoadingMessage
  };

})();