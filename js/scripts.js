const pokemonRepository = (function () {
  //Pokemon Objects
  const squirtle = {
    name: 'Squirtle',
    height: 0.5,
    evolution: null, //placeholder
    moves: ['Tail whip', 'Tackle'],
  };

  const wartortle = {
    name: 'Wartortle',
    height: 1,
    evolution: null,
    moves: ['Bubble', 'Water Gun'],
  };

  const vulpix = {
    name: 'Vulpix',
    height: 0.6,
    evolution: null,
    moves: ['Tail whip', 'Ember'],
  };

  const ninetales = {
    name: 'Ninetales',
    height: 1.1,
    evolution: null,
    moves: ['Nasty plot', 'Safeguard'],
  };

  // Array of Pokemon
  const pokemonList = [
    squirtle,
    wartortle,
    vulpix,
    ninetales,
  ];

  //added evolutions after objects are fully created to avoid circular dependency
  squirtle.evolution = wartortle;
  vulpix.evolution = ninetales;

  // Add the Pokemon to the list
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

const pokemonListUl = document.getElementById("pokemon-list");


// Function to create a list item element
function createListItem(pokemon) {

  let listItem = document.createElement("li");
  listItem.classList.add("pokemon-list__item");

  let pokemonName = createPokemonName(pokemon.name);
  let pokemonHeight = createPokemonHeight(pokemon.height);

  listItem.appendChild(pokemonName);
  listItem.appendChild(pokemonHeight);

  if (isPokemonBig(pokemon.height)) {
    let bigMessage = createBigMessage();
    listItem.appendChild(bigMessage);
  }

  return listItem;
}

// function to create the Pokemon's name element
function createPokemonName(name) {
  let nameElement = document.createElement("div");
  nameElement.textContent = name;
  nameElement.classList.add("pokemon-list__name");
  return nameElement;
}

// function to create the Pokemon's height element
function createPokemonHeight(height) {
  let heightElement = document.createElement("div");
  heightElement.textContent = `Height: ${height} m`;
  heightElement.classList.add("pokemon-list__height");
  return heightElement;
}

// fuction to determine if pokemon is big
function isPokemonBig(height) {
  return height > 1;
}

// function to create "wow..." message
function createBigMessage() {
  let bigMessageElement = document.createElement("div");
  bigMessageElement.textContent = "Wow, that's big!";
  bigMessageElement.classList.add("pokemon-list__big");
  return bigMessageElement;
}

// Main function to append all list items to the Pokemon list
function populatePokemonList(pokemonList, pokemonListUl) {
  pokemonRepository.getAll().forEach(function (pokemon) {
    let listItem = createListItem(pokemon);
    pokemonListUl.appendChild(listItem);
  });
}

populatePokemonList(pokemonRepository.getAll(), pokemonListUl);
