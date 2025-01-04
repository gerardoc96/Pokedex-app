document.addEventListener('DOMContentLoaded', function () {
  let pokemonListUI = document.getElementById("pokemon-list");

  //Get all Pokemon from the repository and render them in the UI
  let allPokemon = pokemonRepository.getAll();
  pokemonUI.populatePokemonList(allPokemon, pokemonListUI);
});