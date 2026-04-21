import { Stack, useLocalSearchParams } from "expo-router";
import {
	ActivityIndicator,
	Image,
	ScrollView,
	StyleSheet,
	Text,
} from "react-native";
import { usePokemon } from "@/hooks/usePokemon";

export default function Pokemon_Details() {
	const params = useLocalSearchParams();
	const { pokemon, loading, error } = usePokemon(params.name as string);

	if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
	if (error) return <Text>Pokemon Not Found</Text>;

	// console.log(
	// 	`==============================================${JSON.stringify(pokemon, null, 2)}`,
	// );

	return (
		<>
			<Stack.Screen
				options={{
					title: params.name as string,
				}}
			/>
			<ScrollView
				contentContainerStyle={{
					gap: 16,
					padding: 16,
				}}
			>
				<Text style={styles.name}>{params.name}</Text>
				<Image
					source={{ uri: params.frontImage as string }}
					style={[
						styles.image,
						{ backgroundColor: params.bGroundColor as string },
					]}
				/>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	name: {
		fontSize: 20,
		fontWeight: "900",
		textTransform: "capitalize",
		textAlign: "center",
	},
	image: {
		width: 250,
		height: 250,
		alignSelf: "center",
		borderRadius: 16,
	},
});
