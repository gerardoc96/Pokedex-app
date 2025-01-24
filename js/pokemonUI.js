const pokemonUI = (function () {
  //Centralized modal elements
  let modalElements = {
    name: document.getElementById("pokemonName"),
    img: document.getElementById("pokemonImg"),
    type: document.getElementById("pokemonType"),
    height: document.getElementById("pokemonHeight"),
  };

  //Centralized DOM manipulation
  function createElementWithClass(tag, classList) {
    let element = document.createElement(tag);
    if (classList) element.classList.add(...classList);
    return element;
  }

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
    let listItem = createElementWithClass('div', ["col-12", "col-sm-6", "col-md-4", "col-lg-2"]);

    // Create a card for each Pokemon
    let nameCard = createElementWithClass('div', ["card", "text-center", "shadow-sm"]);
    let cardBody = createElementWithClass('div', ["card-body"]);

    // Add Pokemon name as a button
    let nameButton = createElementWithClass('div', ["btn", "btn-primary", "w-100"]);
    nameButton.textContent = pokemon.name;

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
    modalElements.name.textContent = pokemon.name;
    modalElements.img.src = pokemon.imgUrl;
    modalElements.img.alt = pokemon.name;
    modalElements.type.textContent = `Type: ${pokemon.type.join(', ')}`;
    modalElements.height.textContent = `Height: ${pokemon.height}m`;

    // Display using Bootstrap's Js API
    let pokemonModal = new bootstrap.Modal(document.getElementById("pokemonModal"));
    pokemonModal.show();
  }

  return {
    populatePokemonList
  };

})();