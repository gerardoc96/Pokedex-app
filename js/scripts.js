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

const pokemonList = [
  squirtle,
  wartortle,
  vulpix,
  ninetales,
];


const pokemonListUl = document.getElementById("pokemon-list");

for (let i = 0; i < pokemonList.length; i++) {
  let listItem = document.createElement("li");

  // Base text for pokemon's name
  listItem.classList.add("pokemon-list__item")

  //elements for the name and height
  let pokemonName = document.createElement("div");
  pokemonName.textContent = pokemonList[i].name;
  pokemonName.classList.add("pokemon-list__name")

  let pokemonHeight = document.createElement("div");
  pokemonHeight.textContent = `Height: ${pokemonList[i].height}m`;
  pokemonHeight.classList.add("pokemon-list__height")

  listItem.appendChild(pokemonName);
  listItem.appendChild(pokemonHeight);

  //highlights pokemon taller than 1m
  if (pokemonList[i].height > 1) {
    let bigMessage = document.createElement("div");
    bigMessage.textContent = "Wow, that's big!"
    bigMessage.classList.add("pokemon-list__big");
    listItem.appendChild(bigMessage);
  }

  pokemonListUl.appendChild(listItem);
}

