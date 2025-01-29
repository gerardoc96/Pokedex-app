const pokemonRepository = (function () {
  const pokemonList = []; const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=250'
  function getAll() { return pokemonList }
  function responseToJson(response) { return response.json() }
  function logError(e) { console.error(e) }
  function loadList() { return fetch(apiUrl).then(responseToJson).then(function (json) { json.results.forEach(addPokemonFromList) }).catch(logError) }
  function addPokemonFromList(item) { let pokemon = { name: item.name, detailsUrl: item.url }; add(pokemon) }
  function add(pokemon) { pokemonList.push(pokemon) }
  function loadDetails(pokemon) { return fetch(pokemon.detailsUrl).then(responseToJson).then(function (details) { processPokemonDetails(details, pokemon) }).catch(logError) }
  function processPokemonDetails(details, pokemon) { pokemon.imgUrl = details.sprites.front_default; pokemon.height = details.height; pokemon.type = details.types.map(function (typeInfo) { return typeInfo.type.name }) }
  function filterPokemonByName(query) { return pokemonList.filter(function (pokemon) { return pokemon.name.toLowerCase().includes(query.toLowerCase()) }) }
  return { add, getAll, loadList, loadDetails, filterPokemonByName }
})()