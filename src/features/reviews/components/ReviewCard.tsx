import { StyleSheet, Text, View } from "react-native";
import { Review } from "../types";

export default function ReviewCard({ item }: { item: Review }) {
  return (
    <View style={styles.card}>
      <Text style={styles.author}>{item.author}</Text>
      <Text numberOfLines={4} style={styles.content}>
        {item.content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#151515",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  author: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    color: "#cccccc",
    lineHeight: 20,
  },
});
