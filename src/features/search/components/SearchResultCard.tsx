import { Image, StyleSheet, Text, View } from "react-native";
import { IMAGE_BASE } from "../../../Services/httpClient";
import { SearchMovie } from "../types";

export default function SearchResultCard({ item }: { item: SearchMovie }) {
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

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.release_date}</Text>
        <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#111",
    borderRadius: 8,
    overflow: "hidden",
  },
  poster: {
    width: 90,
    height: 130,
    backgroundColor: "#1F1F1F",
  },
  info: {
    flex: 1,
    padding: 12,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    color: "#aaa",
    marginTop: 6,
  },
  rating: {
    color: "gold",
    marginTop: 6,
  },
});
