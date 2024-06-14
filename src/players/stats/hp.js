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