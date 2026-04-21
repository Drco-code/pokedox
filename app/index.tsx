import { Link } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { getTypeColor } from "@/constants/pokemonColors";
import { usePokemons } from "@/hooks/usePokemon";

export default function Index() {
	const { pokemons } = usePokemons(50);

	return (
		<ScrollView
			contentContainerStyle={{
				gap: 16,
				flexDirection: "row",
				flexWrap: "wrap",
				marginLeft: 4,
				marginVertical: 10,
				marginBottom: 10,
				alignItems: "center",
			}}
		>
			{pokemons.map((pokemon) => {
				//
				const typeName = pokemon.types?.[0]?.type.name;
				console.log(typeName);
				if (!typeName) return null;
				const bgColor = getTypeColor(typeName) + 50;
				//
				return (
					<Link
						key={pokemon.name}
						href={{
							pathname: "./pokemon_details",
							params: {
								name: pokemon.name,
								frontImage: pokemon.image,
								bGroundColor: bgColor,
							},
						}}
						style={{
							backgroundColor: bgColor,
							padding: 10,
							borderRadius: 20,
							width: 180,
						}}
					>
						<View>
							<Text style={styles.name}>{pokemon.name}</Text>
							<Text style={styles.type}>{pokemon.types?.[0].type.name}</Text>
							<View style={{ flexDirection: "row" }}>
								<Image
									style={{ width: 150, height: 150 }}
									source={{ uri: pokemon.image }}
								/>
							</View>
						</View>
					</Link>
				);
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	name: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
	},
	type: {
		fontSize: 20,
		fontWeight: "black",
		color: "gray",
		textAlign: "center",
	},
});
