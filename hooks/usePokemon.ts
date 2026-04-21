import { useEffect, useState } from "react";
import { fetchPokemonByName, fetchPokemons } from "@/services/pokemonApi";
import type { Pokemon } from "@/types/pokemon";

export function usePokemons(limit = 10) {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let cancelled = false;
		setLoading(true);

		fetchPokemons(limit)
			.then((data) => {
				if (!cancelled) setPokemons(data);
			})
			.catch((e) => {
				if (!cancelled) setError(e as Error);
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [limit]);

	return { pokemons, loading, error };
}

export function usePokemon(name: string) {
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let cancelled = false;
		setLoading(true);

		fetchPokemonByName(name)
			.then((data) => {
				if (!cancelled) setPokemon(data);
			})
			.catch((e) => {
				if (!cancelled) setError(e as Error);
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [name]);

	return { pokemon, loading, error };
}
