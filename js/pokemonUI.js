const pokemonUI = (function () {
  // Render the Pokemon list in the UI
  function populatePokemonList(pokemonList, listElement) {
    listElement.innerHTML = "";
    pokemonList.forEach(function (pokemon) {
      let listItem = createListItem(pokemon);
      listElement.appendChild(listItem);
    });
  }

  function createListItem(pokemon) {
    //Create a colum for the grid
    let listItem = document.createElement("div");
    listItem.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");

    // Create a card for each Pokemon
    let nameCard = document.createElement("div");
    nameCard.classList.add("card", "h-100", "text-center", "shadow-sm");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Add Pokemon name as a button
    let nameButton = document.createElement("div");
    nameButton.textContent = pokemon.name;
    nameButton.classList.add("btn", "btn-primary", "w-100");

    // Event listener to display additional information on click
    nameButton.addEventListener("click", function () {
      pokemonRepository.loadDetails(pokemon)
        .then(function () {
          showModal(pokemon);
        });
    });

    cardBody.appendChild(nameButton);
    nameCard.appendChild(cardBody);
    listItem.appendChild(nameCard);

    return listItem;
  }

  // Create and display modal
  function showModal(pokemon) {

    // check if modal is already present
    if (document.querySelector(".modal__container")) {
      return;
    }

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

    // Add event listener to close modal when clicking outside of the modal content
    modalContainer.addEventListener("click", function (event) {
      if (!modalContent.contains(event.target)) {
        hideModal(modalContainer);
      }
    });
  }

  function hideModal(modalContainer) {
    modalContainer.remove();
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