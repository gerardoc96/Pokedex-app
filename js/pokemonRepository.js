const pokemonRepository = (function () {

  // Array of Pokemon
  const pokemonList = [
    squirtle = {
      name: 'Squirtle',
      height: 0.5,
      evolution: null, //placeholder
      moves: ['Tail whip', 'Tackle'],
    },

    wartortle = {
      name: 'Wartortle',
      height: 1,
      evolution: null,
      moves: ['Bubble', 'Water Gun'],
    },

    vulpix = {
      name: 'Vulpix',
      height: 0.6,
      evolution: null,
      moves: ['Tail whip', 'Ember'],
    },

    ninetales = {
      name: 'Ninetales',
      height: 1.1,
      evolution: null,
      moves: ['Nasty plot', 'Safeguard'],
    },
  ];

  //added evolutions after objects are fully created to avoid circular dependency
  pokemonList[0].evolution = pokemonList[1];
  pokemonList[2].evolution = pokemonList[3];

  // Add the Pokemon to the repository
  function add(pokemon) {
    if (
      pokemon &&
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'evolution' in pokemon &&
      'moves' in pokemon &&
      Array.isArray(pokemon.moves) &&
      (pokemon.evolution === null)
    ) {
      pokemonList.push(pokemon);
    } else {
      console.error('Invalid Pokémon object. Ensure it has name, height, evolution(must = null), and moves(is an array).');
    }
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add,
    getAll
  }

})();