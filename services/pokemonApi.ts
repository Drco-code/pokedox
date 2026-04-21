import type { Pokemon } from "@/types/pokemon";

export async function fetchPokemons(limit = 10): Promise<Pokemon[]> {
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
	);

	const data = await response.json();
	console.log(data);
	return Promise.all(
		data.results.map(async (pokemon: Pokemon) => {
			if (!pokemon.url) {
				throw new Error(`Missing url for Pokemon: ${pokemon.name}`);
			}
			const res = await fetch(pokemon.url);
			const details = await res.json();
			return {
				name: pokemon.name,
				image: details.sprites.front_default,
				imageBack: details.sprites.back_default,
				types: details.types,
			};
		}),
	);
}

export async function fetchPokemonByName(name: string) {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
	}
}
