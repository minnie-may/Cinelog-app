import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { HEADER_HEIGHT } from "../../../theme/tokens";
import { Movie } from "../../discover/types";
import { getRecommendations } from "../api";
import RecommendationCard from "../components/RecommendationCard";

export default function RecommendationsScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    let isMounted = true;

    getRecommendations()
      .then((data) => {
        if (isMounted) setMovies(data);
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
    paddingHorizontal: 16,
    paddingTop: HEADER_HEIGHT + 8,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
