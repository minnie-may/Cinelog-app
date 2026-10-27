import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { AMBER, HEADER_HEIGHT, MUTED } from "../../../theme/tokens";
import { getReviews } from "../api";
import ReviewCard from "../components/ReviewCard";
import { Review } from "../types";

export default function ReviewsScreen() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getReviews()
      .then((data) => {
        if (isMounted) setReviews(data);
      })
      .catch((e) => {
        const reason = e instanceof Error ? e.message : String(e);
        console.log("Reviews failed:", reason);
        if (isMounted) setError("Couldn't load reviews: " + reason);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Reviews</Text>

      {error ? (
        <Text style={styles.message}>{error}</Text>
      ) : loading ? (
        <ActivityIndicator color={AMBER} />
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReviewCard item={item} />}
          ListEmptyComponent={
            <Text style={styles.message}>No reviews found.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingTop: HEADER_HEIGHT + 8,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  message: {
    color: MUTED,
    fontSize: 15,
    textAlign: "center",
    marginTop: 24,
  },
});
