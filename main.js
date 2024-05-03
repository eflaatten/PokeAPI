// https://pokeapi.co/api/v2/{endpoint}/

const getPokemon = () => {
  fetch('https://pokeapi.co/api/v2/pokemon/')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const pokemon = data.results;
    const pokemonList = document.getElementById('pokemon-list');
    pokemon.forEach(pokemon => {
      const listItem = document.createElement('button');
      listItem.innerText = pokemon.name;
      pokemonList.appendChild(listItem);
    });
  })
}

const chooseYourPokemon = () => {
  const pokemonList = document.getElementById('pokemon-list');
  pokemonList.innerHTML = '';
  getPokemon();
  pokemonList.addEventListener('click', event => {
    const selectedPokemon = event.target.innerText;
    fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  });
}

const fight = () => {
  const fightButton = document.getElementById('fight');
  fightButton.addEventListener('click', () => {
    chooseYourPokemon();
  });
}

