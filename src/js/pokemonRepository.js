const pokemonRepository = (function () {

  const pokemonList = [];

  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=250'

  // returns the list of all pokemon
  function getAll() {
    return pokemonList;
  }

  // Converts API response to JSON
  function responseToJson(response) {
    return response.json();
  }

  // Centralized error log
  function logError(e) {
    console.error(e);
  }

  // fetches and processes the list of Pokemon from the API
  function loadList() {
    return fetch(apiUrl)
      .then(responseToJson)
      .then(function (json) {
        json.results.forEach(addPokemonFromList);
      })
      .catch(logError)
  }

  // Extract initial pokemon information
  function addPokemonFromList(item) {
    let pokemon = {
      name: item.name,
      detailsUrl: item.url
    };
    add(pokemon);
  }

  // add pokemon informaton to the repository
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // Fetches and processes details for each Pokemon
  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(responseToJson)
      .then(function (details) {
        processPokemonDetails(details, pokemon);
      })
      .catch(logError);
  }

  // Fetches the specific details for each Pokemon
  function processPokemonDetails(details, pokemon) {
    pokemon.imgUrl = details.sprites.front_default;
    pokemon.height = details.height;
    pokemon.type = details.types.map(function (typeInfo) {
      return typeInfo.type.name;
    });
  }

  //Filters pokemon by name for the search function
  function filterPokemonByName(query) {
    return pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase().includes(query.toLowerCase())
    });
  }

  return {
    add,
    getAll,
    loadList,
    loadDetails,
    filterPokemonByName
  };

})();