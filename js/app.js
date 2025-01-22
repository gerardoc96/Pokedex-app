document.addEventListener('DOMContentLoaded', function () {
  let pokemonListUI = document.getElementById("pokemon-list");

  //Fetch pokemon from the repository and render them in UI
  pokemonRepository.loadList().then(function () {
    let allPokemon = pokemonRepository.getAll();
    pokemonUI.populatePokemonList(allPokemon, pokemonListUI);

    //Search functionality
    let searchform = document.querySelector('form[role="search"]');
    searchform.addEventListener('submit', function (event) {
      event.preventDefault();

      // Making it case-insensitive
      let searchInput = searchform.querySelector('input[type="search"]').value.toLowerCase();
      let filteredPokemon = allPokemon.filter(function (pokemon) {
        return pokemon.name.toLowerCase().includes(searchInput);
      });
      pokemonUI.populatePokemonList(filteredPokemon, pokemonListUI);
    });

    // Live search functionality
    let searchInputLive = searchform.querySelector('input[type="search"]');
    searchInputLive.addEventListener('input', function () {
      let searchInput = searchInputLive.value.toLowerCase();
      let filteredPokemon = allPokemon.filter(function (pokemon) {
        return pokemon.name.toLowerCase().includes(searchInput);
      });
      pokemonUI.populatePokemonList(filteredPokemon, pokemonListUI);
    });


  }).catch(function (error) {
    console.error('Error loading Pokemon:', error);
  });

});



