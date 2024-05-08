

// USE POKEAPI TO GET 2 POKEMON AND DISPLAY THEM ON THE SCREEN
const getPokemon = async (id) => {
  // hide start button when the game starts
  document.getElementById('begin').style.display = 'none';

  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)

    // get 2 random pokemon at a time
   
    const randomPokemon = data.results.sort(() => 0.5 - Math.random()).slice(0, 2);
    let battleArena = document.querySelector('.battle-arena');

    // display the pokemon names, abilites and base experience
    const pokemon1 = await fetch(randomPokemon[0].url) // get the url of the first pokemon to get its info
    const pokemon2 = await fetch(randomPokemon[1].url) // get the url of the second pokemon to get its info
    const pokemon1Data = await pokemon1.json(); // get the data of the first pokemon and convert it to json
    const pokemon2Data = await pokemon2.json(); // get the data of the second pokemon and convert it to json
    const pokemon1Abilities = pokemon1Data.abilities.map(ability => ability.ability.name)
    const pokemon2Abilities = pokemon2Data.abilities.map(ability => ability.ability.name)
    let pokemon1HP = pokemon1Data.stats[0].base_stat;
    let pokemon2HP = pokemon2Data.stats[0].base_stat;
    let pokemon1MaxHP = pokemon1HP;
    let pokemon2MaxHP = pokemon2HP;

    const pokemonList = document.getElementById('pokemon-list')
    let pokemon1Element = document.createElement('div');
    pokemon1Element.className = 'pokemon1';
    pokemon1Element.innerHTML = `${pokemon1Data.name}`;
    pokemonList.appendChild(pokemon1Element);

    let pokemon2Element = document.createElement('div');
    pokemon2Element.className = 'pokemon2';
    pokemon2Element.innerHTML = `${pokemon2Data.name}`;
    pokemonList.appendChild(pokemon2Element);

    // display sprite of the pokemon 
    let pokemon1Image = document.createElement('img');
    pokemon1Image.src = pokemon1Data.sprites.front_default;
    pokemon1Image.className = 'pokemon1-image';
    pokemonList.appendChild(pokemon1Image);

    let pokemon2Image = document.createElement('img');
    pokemon2Image.src = pokemon2Data.sprites.back_default;
    pokemon2Image.className = 'pokemon2-image';
    pokemonList.appendChild(pokemon2Image);

    // display the HP bar of the pokemon
    let pokemon1HPBar = document.createElement('div');
    pokemon1HPBar.className = 'pokemon1-hp';
    pokemon1HPBar.innerHTML = `HP: ${pokemon1HP}\n<span style="color: gold;">▄▄▄▄▄▄▄▄▄</span>\n`;
    pokemonList.appendChild(pokemon1HPBar);

    let pokemon2HPBar = document.createElement('div');
    pokemon2HPBar.className = 'pokemon2-hp';
    pokemon2HPBar.innerHTML = `HP: ${pokemon2HP}\n<span style="color: gold;">▄▄▄▄▄▄▄▄▄</span>\n`;
    pokemonList.appendChild(pokemon2HPBar);

    // display fight, item and run buttons
    let fightButton = document.createElement('button');
    fightButton.className = 'fight-button';
    fightButton.innerHTML = 'FIGHT';
    pokemonList.appendChild(fightButton);

    let itemButton = document.createElement('button');
    itemButton.className = 'item-button';
    itemButton.innerHTML = 'ITEM';
    pokemonList.appendChild(itemButton);

    let runButton = document.createElement('button');
    runButton.className = 'run-button';
    runButton.innerHTML = 'RUN';
    pokemonList.appendChild(runButton);

    // start new game
    runButton.addEventListener('click', () => {
      window.location.reload();
    })

    // fight the pokemon
    let turn = 0
    fightButton.addEventListener('click', () => {
      // Choose a random ability for the current pokemon
      let randomAbility = turn % 2 === 0 
      ? pokemon1Abilities[Math.floor(Math.random() * pokemon1Abilities.length)] 
      : pokemon2Abilities[Math.floor(Math.random() * pokemon2Abilities.length)]

      // Get the damage dealt
      // ability damage - from pokemons health
      const damage = Math.floor(Math.random() * 10) + 1

      if(turn % 2 === 0){
        // pokemon 1 attacks pokemon 2
        pokemon2HP -= damage
        // update the HP bar
        if(pokemon2HP > 0){
          let hpPercent = (pokemon2HP / pokemon2MaxHP) * 7
          let blocks = "▄".repeat(hpPercent)
          pokemon2HPBar.innerHTML = `HP: ${pokemon2HP}\n<span style="color: gold;">${blocks}</span>\n`;
        } else {
          pokemon2HPBar.innerHTML = ''
        }

        // Display the move
        let move = document.createElement('div')
        move.className = 'move1'
        move.innerHTML = `${pokemon1Data.name} used ${randomAbility}`
        pokemonList.appendChild(move)
      } else {
        // pokemon 2 attacks pokemon 1
        pokemon1HP -= damage
        // update the HP bar
        if(pokemon1HP > 0){
          let hpPercent = (pokemon1HP / pokemon1MaxHP) * 7
          let blocks = "▄".repeat(hpPercent)
          pokemon1HPBar.innerHTML = `HP: ${pokemon1HP}\n<span style="color: gold;">${blocks}</span>\n`;
        } else {
          pokemon1HPBar.innerHTML = ''
        }

        // Display the move
        let move = document.createElement('div')
        move.className = 'move2'
        move.innerHTML = `${pokemon2Data.name} used ${randomAbility}`
        pokemonList.appendChild(move)
      }

      turn++

      // check if the game is over
      if(pokemon1HP === 0 || pokemon2HP === 0){
        let gameOver = document.createElement('div');
        gameOver.className = 'game-over';
        gameOver.innerHTML = '${pokemon1HP <= 0 ? pokemon2Data.name : pokemon1Data.name} wins!';
        pokemonList.appendChild(gameOver);
      } 
    })


  } catch (error){ 
    console.log("error getting pokemon")
  }
}