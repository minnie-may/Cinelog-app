import { StyleSheet, Text, View } from "react-native";

type Props = {
  item: {
    author: string;
    content: string;
  };
};

export default function ReviewCard({ item }: Props) {
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
