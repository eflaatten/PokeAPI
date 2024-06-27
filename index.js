import { getAllPokemon } from "./src/api/requests"

const listAllPokemon = () => {
    getAllPokemon()
    .then(pokemonData => {
        const pokemonList = document.getElementById('list-dropdown')

        pokemonData.forEach(pokemon => {
            const listItem = document.createElement('option')
            listItem.textContent = pokemon.name
            console.log('pokemon', pokemon.name)
            pokemonList.appendChild(listItem)
        })
    })
    .catch(error => {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while fetching Pokémon data"});
    })
}

listAllPokemon()
