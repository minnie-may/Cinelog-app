import { Image, StyleSheet, Text, View } from "react-native";
import { IMAGE_BASE } from "../../../services/httpClient";

export default function RecommendationCard({ item }: any) {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: `${IMAGE_BASE}${item.poster_path}`,
        }}
        style={styles.poster}
      />

      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.rating}>⭐ {item.vote_average}</Text>
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
