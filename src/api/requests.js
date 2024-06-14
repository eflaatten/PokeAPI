// USE POKEAPI TO GET 2 POKEMON AND DISPLAY THEM ON THE SCREEN
// const getPokemon = async () => {
//   // hide start button when the game starts
//   document.getElementById('begin').style.display = 'none';

//   try {
//     const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
//     if(!response.ok){
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }
//     const data = await response.json()
//     console.log(data)

//     // get 2 random pokemon at a time
   
//     const randomPokemon = data.results.sort(() => 0.5 - Math.random()).slice(0, 2);

//     // display the pokemon names, abilites and base experience
//     const pokemon1 = await fetch(randomPokemon[0].url) // get the url of the first pokemon to get its info
//     const pokemon2 = await fetch(randomPokemon[1].url) // get the url of the second pokemon to get its info
//     const pokemon1Data = await pokemon1.json(); // get the data of the first pokemon and convert it to json
//     const pokemon2Data = await pokemon2.json(); // get the data of the second pokemon and convert it to json

//     const pokemon1Abilities = pokemon1Data.abilities.map(ability => ability.ability.name)
//     const pokemon2Abilities = pokemon2Data.abilities.map(ability => ability.ability.name)
//     let pokemon1HP = pokemon1Data.stats[0].base_stat;
//     let pokemon2HP = pokemon2Data.stats[0].base_stat;

//     const pokemonList = document.getElementById('pokemon-list')
//     let pokemon1Element = document.createElement('div');
//     pokemon1Element.className = 'pokemon1';
//     pokemon1Element.innerHTML = `${pokemon1Data.name}`;
//     pokemonList.appendChild(pokemon1Element);

//     let pokemon2Element = document.createElement('div');
//     pokemon2Element.className = 'pokemon2';
//     pokemon2Element.innerHTML = `${pokemon2Data.name}`;
//     pokemonList.appendChild(pokemon2Element);

//     // display sprite of the pokemon 
//     let pokemon1Image = document.createElement('img');
//     pokemon1Image.src = pokemon1Data.sprites.front_default;
//     pokemon1Image.className = 'pokemon1-image';
//     pokemonList.appendChild(pokemon1Image);

//     let pokemon2Image = document.createElement('img');
//     pokemon2Image.src = pokemon2Data.sprites.back_default;
//     pokemon2Image.className = 'pokemon2-image';
//     pokemonList.appendChild(pokemon2Image);

//     // display the HP bar of the pokemon
//     let pokemon1HPBar = document.createElement('div');
//     pokemon1HPBar.className = 'pokemon1-hp';
//     pokemon1HPBar.innerHTML = `HP: ${pokemon1HP}\n<span style="color: gold;">▄▄▄▄▄▄▄▄▄</span>\n`;
//     pokemonList.appendChild(pokemon1HPBar);

//     let pokemon2HPBar = document.createElement('div');
//     pokemon2HPBar.className = 'pokemon2-hp';
//     pokemon2HPBar.innerHTML = `HP: ${pokemon2HP}\n<span style="color: gold;">▄▄▄▄▄▄▄▄▄</span>\n`;
//     pokemonList.appendChild(pokemon2HPBar)






//     // display fight, item and run buttons
//     let fightButton = document.createElement('button');
//     fightButton.className = 'fight-button';
//     fightButton.innerHTML = 'FIGHT';
//     pokemonList.appendChild(fightButton);

//     let itemButton = document.createElement('button');
//     itemButton.className = 'item-button';
//     itemButton.innerHTML = 'ITEM';
//     pokemonList.appendChild(itemButton);

//     let runButton = document.createElement('button');
//     runButton.className = 'run-button';
//     runButton.innerHTML = 'RUN';
//     pokemonList.appendChild(runButton);

//     let startNewGame = document.createElement('button');
//     startNewGame.className = 'start-new-game';
//     startNewGame.innerHTML = 'NEW GAME';

//     // start a new game
//     startNewGame.addEventListener('click', () => {
//       window.location.reload();
//       fightButton.click()
//     })

//     // get a new set of pokemon
//     runButton.addEventListener('click', () => {
//       window.location.reload();
//     })

//     // fight the pokemon
//     fightButton.addEventListener('click', () => {
//       // Idle player animation
//       pokemon1Image.classList.add("idle-player");
//       // Idle foe animation
//       pokemon2Image.classList.add("idle-foe");

//       // Choose a random ability for players pokemon
//       let randomAbility =
//         pokemon2Abilities[Math.floor(Math.random() * pokemon2Abilities.length)];
      
      
//       // Calc remaining HP
//       let remainingFoeHP = Math.max(Math.ceil(pokemon1HP / 10), 0)
//       // Calc damage
//       const playerDamage = Math.floor(Math.random() * 10);
//       // //Update HP
//       pokemon1HP = Math.max(pokemon1HP - playerDamage, 0);
//       //Remove blocks from HP bar based on damage and display it
//       let hpBlocks = ''
//       for (let i = 0; i < remainingFoeHP; i++) {
//         hpBlocks += '▄';
//       }

//       // Display the HP bar
//       pokemon1HPBar.innerHTML = `HP: ${pokemon1HP}\n<span style="color: gold;">${hpBlocks}</span>\n`;

//       let foeHasFainted = document.createElement('div');
//       foeHasFainted.className = 'foe-has-fainted';
//       foeHasFainted.innerHTML = `${pokemon1Data.name} has fainted`;

//       // Check if pokemon HP is 0
//       if(pokemon1HP <= 0){
//         pokemon1HPBar.innerHTML = `HP: 0\n<span style="color: gold;"></span>\n`;
//         setTimeout(() => {
//           pokemonList.appendChild(foeHasFainted);
//           pokemonList.appendChild(startNewGame);
//           pokemon1Image.classList.remove('idle-foe')
//           clearTimeout(foeAttack)

//         }, 1000);
//       }

//       // Display the move
//       let move1 = document.createElement("div");
//       move1.className = "move1";
//       move1.innerHTML = `${pokemon2Data.name} used ${randomAbility}`;
//       move1.style.visibility = "visible";

//       //Attack animation - player
//       // pokemon2Image.classList.add("attack-player");
//       pokemon1Image.classList.add("shake-foe");

//       pokemon2Image.addEventListener("animationend", () => {
//         // pokemon2Image.classList.remove("attack-player");
//         pokemon1Image.classList.remove("shake-foe");
//       });

//       setTimeout(() => {
//         pokemon1Image.classList.add("shake-foe");
//       }, 300);

//       pokemonList.appendChild(move1);
//       setTimeout(() => {
//         move1.style.visibility = "hidden";
//         pokemon1Image.classList.remove("shake-foe");
//         pokemon2Image.classList.remove("attack-player");
//       }, 1000);





//       // FOE ATTACK
//       let foeAttack = setTimeout(() => {
//         // get random ability for foe
//         let foeRandomAbility =
//           pokemon1Abilities[
//             Math.floor(Math.random() * pokemon1Abilities.length)
//           ];

//         // Display the move
//         let move2 = document.createElement("div");
//         move2.className = "move2";
//         move2.innerHTML = `foe ${pokemon1Data.name} used ${foeRandomAbility}`;
//         move2.style.visibility = "visible";

//         // Calc damage
//         const foeDamage = Math.floor(Math.random() * 10);
//         // //Update HP
//         pokemon2HP = Math.max(pokemon2HP - foeDamage, 0);
//         // Calc remaining HP of player
//         let remainingPlayerHP = Math.max(Math.ceil(pokemon2HP / 10), 0)
//         //Remove blocks from HP bar based on damage and display it
//         let playerHpBlocks = ''
//         for (let i = 0; i < remainingPlayerHP; i++) {
//           playerHpBlocks += "▄";
//         }
        
//         // Display the HP bar
//         pokemon2HPBar.innerHTML = `HP: ${pokemon2HP}\n<span style="color: gold;">${playerHpBlocks}</span>\n`;


//         let playerHasFainted = document.createElement("div");
//         playerHasFainted.className = "player-has-fainted";
//         playerHasFainted.innerHTML = `${pokemon2Data.name} has fainted`;

//         // Check if pokemon HP is 0
//         if(pokemon2HP <= 0){
//           pokemon2HPBar.innerHTML = `HP: 0\n<span style="color: gold;"></span>\n`;
//           setTimeout(() => {
//             pokemonList.appendChild(playerHasFainted);
//             pokemonList.appendChild(startNewGame);
//           }, 1000);
//         }

//         // Attack animation - foe
//         pokemon1Image.addEventListener("animationend", () => {
//           pokemon1Image.classList.remove("attack-foe");
//           pokemon2Image.classList.remove("shake-player");
//         });

//         setTimeout(() => {
//           pokemon2Image.classList.add("shake-player");
//         }, 100);

//         pokemonList.appendChild(move2);
//         setTimeout(() => {
//           move2.style.visibility = "hidden";
//           pokemon2Image.classList.remove("shake-player");
//         }, 1000);

//       }, 3000);
//     })




//   } catch (error){ 
//     console.log("error getting pokemon")
//   }
// }


// NEW CODE 




let randomPokemon = fetchPokemon().sort(() => 0.5 - Math.random()).slice(0, 2);
let pokemon1 = randomPokemon[0]
let pokemon2 = randomPokemon[1]

console.log(randomPokemon)
console.log(pokemon1)
console.log(pokemon2)



// Function to fetch the pokemon
const fetchPokemon = async () => {
  try {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
  } catch (error) {
    console.log("error fetching pokemon")
  }
}


const displayPokemon = async () => {
  //display the pokemon names, abilites and base experience
  const pokemon1 = await fetch(randomPokemon[0].url) // get the url of the first pokemon to get its info
  const pokemon2 = await fetch(randomPokemon[1].url) // get the url of the second pokemon to get its info
  const pokemon1Data = await pokemon1.json(); // get the data of the first pokemon and convert it to json
  const pokemon2Data = await pokemon2.json(); // get the data of the second pokemon and convert it to json

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

}




const pokemonList = document.getElementById('pokemon-list')

// Function for player actions - attack, heal, etc
const player = () => {
  const playerPokemon = playerPokemon.abilities.map(ability => ability.ability.name)
  let playerHP = playerPokemon.stats[0].base_stat;


  let player = document.createElement('div');
  player.className = 'pokemon2';
  player.innerHTML = `${playerPokemon.name}`;
  pokemonList.appendChild(player);
}

// Function for foe actions - attack, heal, etc
const foe = () => {
  const foePokemon = pokemon1Data.abilities.map(ability => ability.ability.name)

  let pokemon1HP = pokemon1Data.stats[0].base_stat;

  let pokemon1Element = document.createElement('div');
  pokemon1Element.className = 'pokemon1';
  pokemon1Element.innerHTML = `${pokemon1Data.name}`;
  pokemonList.appendChild(pokemon1Element);


}


const playerAttack = () => {

}

const foeAttack = () => {

}

const checkFainted = () => {

}






