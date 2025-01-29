document.addEventListener('DOMContentLoaded', function () { let pokemonListUI = document.getElementById("pokemon-list"); let searchform = document.querySelector('form[role="search"]'); let searchInput = searchform.querySelector('input[type="search"]'); pokemonRepository.loadList().then(function () { let allPokemon = pokemonRepository.getAll(); pokemonUI.populatePokemonList(allPokemon, pokemonListUI); searchInput.addEventListener('input', function () { handleSearch(searchInput.value, allPokemon, pokemonListUI) }) }).catch(function (error) { console.error('Error loading Pokemon:', error) }) }); function handleSearch(query, allPokemon, listElement) { let filteredPokemon = pokemonRepository.filterPokemonByName(query); pokemonUI.populatePokemonList(filteredPokemon, listElement) }


