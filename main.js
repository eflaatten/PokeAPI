

// USE POKEAPI TO GET 2 POKEMON AND DISPLAY THEM ON THE SCREEN
const getPokemon = async (id) => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)

    // get 2 random pokemon at a time
    const randomPokemon = data.results.sort(() => 0.5 - Math.random()).slice(0, 2);

    randomPokemon.forEach(pokemon => {
      console.log(pokemon.name);
      let pokemonElement = document.createElement('div');
      pokemonElement.innerHTML = pokemon.name;
      document.body.appendChild(pokemonElement);
    });

    // get the abilties of both pokemon
    const pokemon1 = await fetch(randomPokemon[0].url)
    const pokemon2 = await fetch(randomPokemon[1].url)

    const pokemon1Data = await pokemon1.json();
    console.log(pokemon1Data.name, " has abilities: ", pokemon1Data.abilities.map(ability => ability.ability.name).join(", "));

    const pokemon2Data = await pokemon2.json();
    console.log(pokemon2Data.name, " has abilities: ", pokemon2Data.abilities.map(ability => ability.ability.name).join(", "));

    pokemon2Data.abilities.forEach(ability => {
      const abilityButton = document.createElement('button');
      abilityButton.innerHTML = ability.ability.name;
      document.body.appendChild(abilityButton);
    });

    pokemon1Data.abilities.forEach(ability => {
      const abilityButton = document.createElement('button');
      abilityButton.innerHTML = ability.ability.name;
      document.body.appendChild(abilityButton);
    });


  } catch (error){ 
    console.log("error getting pokemon")
  }
}