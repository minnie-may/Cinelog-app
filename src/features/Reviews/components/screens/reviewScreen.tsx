import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import ReviewCard from "../ReviewCard";
import { getReviews, REVIEWS_MOVIE } from "../api";

export default function ReviewScreen() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;

    getReviews()
      .then((data) => {
        if (!isMounted) return;
        if (
          typeof data === "object" &&
          data !== null &&
          "results" in data &&
          Array.isArray(data.results)
        ) {
          setReviews(data.results);
        } else {
          setReviews([]);
        }
      })
      .catch((error) => console.log(error));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews for {REVIEWS_MOVIE.title}</Text>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
