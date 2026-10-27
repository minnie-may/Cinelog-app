import {
    ActivityIndicator,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { AMBER, HEADER_HEIGHT, MUTED } from "../../../theme/tokens";
import FilterChips from "../components/FilterChips";
import SearchResultCard from "../components/SearchResultCard";
import { useSearch } from "../hooks/useSearch";

export default function SearchScreen() {
  const { query, setQuery, results, search, loading, error, searched } =
    useSearch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Movies</Text>

      <TextInput
        placeholder="Search..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={search}
        returnKeyType="search"
        style={styles.input}
      />

      <Button title="Search" onPress={search} />

      <FilterChips />

      {error ? (
        <Text style={styles.message}>{error}</Text>
      ) : loading ? (
        <ActivityIndicator color={AMBER} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <SearchResultCard item={item} />}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text style={styles.message}>
              {searched ? "No results found." : "Type a movie name and search."}
            </Text>
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
  input: {
    backgroundColor: "#222",
    color: "white",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  message: {
    color: MUTED,
    fontSize: 15,
    textAlign: "center",
    marginTop: 24,
  },
});
