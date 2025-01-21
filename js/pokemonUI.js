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

  // Create modal with Pokemon detials
  function showModal(pokemon) {
    document.getElementById("pokemonName").textContent = pokemon.name;
    document.getElementById("pokemonImg").src = pokemon.imgUrl;
    document.getElementById("pokemonImg").alt = pokemon.name;
    document.getElementById("pokemonType").textContent = `Type: ${pokemon.type.join(', ')}`;
    document.getElementById("pokemonHeight").textContent = `Height: ${pokemon.height}m`;

    // Display using Bootstrap's Js API
    let pokemonModal = new bootstrap.Modal(document.getElementById("pokemonModal"));
    pokemonModal.show();
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