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

  function loadList() {
    pokemonUI.showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();

    }).then(function (json) {
      pokemonUI.hideLoadingMessage();
      json.results.forEach(function (item) {

        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });

    }).catch(function (e) {
      pokemonUI.hideLoadingMessage();
      console.error(e);
    });

  }

  function loadDetails(pokemon) {
    pokemonUI.showLoadingMessage();
    return fetch(pokemon.detailsUrl)

      .then(function (response) {
        return response.json();

      }).then(function (details) {
        pokemonUI.hideLoadingMessage();
        pokemon.imgUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.type = details.types.map(function (typeInfo) {
          return typeInfo.type.name;
        });

      }).catch(function (e) {
        pokemonUI.hideLoadingMessage();
        console.error(e);
      });


  }
  function getAll() {
    return pokemonList;
  }

  return {
    add,
    getAll,
    loadList,
    loadDetails
  };

})();