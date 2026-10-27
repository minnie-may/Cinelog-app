import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { getRecommendations } from "@/features/recommendations/api";
import RecommendationCard from "@/features/recommendations/components/RecommendationCard";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

export default function RecommendationsScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    let isMounted = true;

    getRecommendations()
      .then((data: any) => {
        if (isMounted) setMovies(data.results || []);
      })
      .catch((error) => console.log(error));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended For You</Text>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RecommendationCard item={item} />}
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
