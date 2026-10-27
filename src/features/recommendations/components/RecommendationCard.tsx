import { Image, StyleSheet, Text, View } from "react-native";
import { IMAGE_BASE } from "../../../Services/httpClient";
import { Movie } from "../../discover/types";

export default function RecommendationCard({ item }: { item: Movie }) {
  return (
    <View style={styles.card}>
      {item.poster_path ? (
        <Image
          source={{ uri: IMAGE_BASE + item.poster_path }}
          style={styles.poster}
        />
      ) : (
        <View style={styles.poster} />
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  poster: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    backgroundColor: "#1F1F1F",
  },
  title: {
    color: "white",
    fontSize: 18,
    marginTop: 8,
  },
  rating: {
    color: "gold",
  },
});
