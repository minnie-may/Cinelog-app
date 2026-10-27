import { Image, StyleSheet, Text, View } from "react-native";
import { IMAGE_BASE } from "../../../services/httpClient";

export default function SearchResultCard({ item }: any) {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: `${IMAGE_BASE}${item.poster_path}`,
        }}
        style={styles.poster}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.date}>{item.release_date}</Text>

        <Text style={styles.rating}>⭐ {item.vote_average}</Text>
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
