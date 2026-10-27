import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { useSearch } from "../../hooks/useSearch";
import FilterChips from "../FilterChips";
import SearchResultCard from "../SearchResultCard";

export default function SearchScreen() {
  const { query, setQuery, results, search } = useSearch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Movies</Text>

      <TextInput
        placeholder="Search..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <Button title="Search" onPress={search} />

      <FilterChips />

      <FlatList
        data={results as { id: string | number }[]}
        keyExtractor={(item: { id: string | number }) => item.id.toString()}
        renderItem={({ item }) => <SearchResultCard item={item} />}
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

  input: {
    backgroundColor: "#222",
    color: "white",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
});
