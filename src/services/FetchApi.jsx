export const baseUrl = "https://pokeapi.co/api/v2";

async function FetchData(start = 1, limit = 10) {
    const pokemonPromises = [];

    for (let i = start; i < start + limit; i++) {
        const pokemonUrl = `${baseUrl}/pokemon/${i}/`;
        pokemonPromises.push(fetch(pokemonUrl).then(response => response.json()));
    }

    const pokemons = await Promise.all(pokemonPromises);
    return pokemons;
}

export default FetchData;