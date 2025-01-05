document.addEventListener('DOMContentLoaded', function () {
  let pokemonListUI = document.getElementById("pokemon-list");

  //Fetch pokemon from the repository and render them in UI
  pokemonRepository.loadList().then(function () {
    let allPokemon = pokemonRepository.getAll();
    pokemonUI.populatePokemonList(allPokemon, pokemonListUI);

  }).catch(function (error) {
    console.error('Error loading Pokemon:', error);
  });

});



