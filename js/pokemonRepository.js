const pokemonRepository = (function () {

  const pokemonList = [];

  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'

  // returns the list of all pokemon
  function getAll() {
    return pokemonList;
  }

  // Converts API response to JSON
  function responseToJson(response) {
    return response.json();
  }

  // fetches and processes the list of Pokemon from the API
  function loadList() {
    pokemonUI.showLoadingMessage();
    return fetch(apiUrl)
      .then(responseToJson)
      .then(processPokemonList)
      .catch(logError)
  }

  function processPokemonList(json) {
    pokemonUI.hideLoadingMessage();
    json.results.forEach(addPokemonFromList);
  }

  // Extract and add Pokemon information to the repository
  function addPokemonFromList(item) {
    let pokemon = {
      name: item.name,
      detailsUrl: item.url
    };
    add(pokemon);
  }

  // Validation function for adding pokemon to the repository
  function add(pokemon) {

    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);

    } else {
      console.error('Invalid Pokémon object. Ensure it has the right properties.');
    }
  }

  // Fetches and processes details for each Pokemon
  function loadDetails(pokemon) {
    pokemonUI.showLoadingMessage();
    return fetch(pokemon.detailsUrl)
      .then(responseToJson)
      .then(function (details) {
        processPokemonDetails(details, pokemon);
      })
      .catch(logError);
  }

  // Fetches the specific details for each Pokemon
  function processPokemonDetails(details, pokemon) {
    pokemonUI.hideLoadingMessage();
    pokemon.imgUrl = details.sprites.front_default;
    pokemon.height = details.height;
    pokemon.type = details.types.map(getPokemonType);
  }

  function getPokemonType(typeInfo) {
    return typeInfo.type.name;
  }

  // Centralized error log
  function logError(e) {
    pokemonUI.hideLoadingMessage();
    console.error(e);
  }

  return {
    add,
    getAll,
    loadList,
    loadDetails
  };

})();