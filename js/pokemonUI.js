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
  function createPokemonName(pokemon) {
    let nameButton = document.createElement("button");
    nameButton.textContent = pokemon.name;
    nameButton.classList.add("pokemon-list__name-button");

    // event listener to display information on click
    nameButton.addEventListener("click", function () {
      pokemonRepository.loadDetails(pokemon)
        .then(function () {
          showModal(pokemon);
        });
    });

    return nameButton;
  }

  // Create and display modal
  function showModal(pokemon) {
    //create modal container
    let modalContainer = document.createElement("div");
    modalContainer.classList.add("modal__container");

    // Create modal content
    let modalContent = document.createElement("div");
    modalContent.classList.add("modal__content");

    // Add close button
    let modalCloseButton = document.createElement("button");
    modalCloseButton.textContent = "Close";
    modalCloseButton.classList.add("modal__close-button");
    modalCloseButton.addEventListener("click", function () {
      hideModal(modalContainer);
    });

    // Add Pokemon details to modal
    modalContent.innerHTML += `
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.imgUrl}" alt="${pokemon.name}">
      <p>Type: ${pokemon.type.join(', ')}</p>
      <p>Height: ${pokemon.height}m</p>`;

    //Append close button and content to container
    modalContent.appendChild(modalCloseButton);
    modalContainer.appendChild(modalContent);

    // Add modal content to modal container
    document.body.appendChild(modalContainer);

    // Add event listener to close modal pressing 'Esc'
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        hideModal(modalContainer);
        document.removeEventListener("keydown", onKeyPress);
      }
    });
  }

  function hideModal(modalContainer) {
    modalContainer.remove();
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