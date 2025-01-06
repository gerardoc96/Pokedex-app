const pokemonRepository = (function () {

  const pokemonList = [];

  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'

  // Add the Pokemon to the repository
  function add(pokemon) {

    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);

    } else {
      console.error('Invalid Pokémon object. Ensure it has the right properties.');
    }
  }

  function loadDetails(pokemon) {
    pokemonUI.showLoadingMessage();
    return fetch(pokemon.detailsUrl)
      .then(fetchPokemonDetails)
      .then(function (details) {
        processPokemonDetails(details, pokemon);
      })
      .catch(handleLoadListError);
  }

  function loadList() {
    pokemonUI.showLoadingMessage();
    return fetch(apiUrl)
      .then(fetchPokemonList)
      .then(processPokemonList)
      .catch(handleLoadListError)
  }

  function getAll() {
    return pokemonList;
  }

  function getPokemonType(typeInfo) {
    return typeInfo.type.name;
  }

  function fetchPokemonList(response) {
    return response.json();
  }

  function fetchPokemonDetails(response) {
    return response.json();
  }

  function processPokemonDetails(details, pokemon) {
    pokemonUI.hideLoadingMessage();
    pokemon.imgUrl = details.sprites.front_default;
    pokemon.height = details.height;
    pokemon.type = details.types.map(getPokemonType);
  }

  function processPokemonList(json) {
    pokemonUI.hideLoadingMessage();
    json.results.forEach(addPokemonFromList);
  }


  function addPokemonFromList(item) {
    let pokemon = {
      name: item.name,
      detailsUrl: item.url
    };
    add(pokemon);
  }

  function handleLoadListError(e) {
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