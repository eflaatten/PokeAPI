const getAllPokemon = () => {
  fetch("https://pokeapi.co/api/v2/pokemon")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export { getAllPokemon };
