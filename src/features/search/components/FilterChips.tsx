import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FilterChips() {
  const [selected, setSelected] = useState("All");
  const filters = ["All", "Popular", "Top Rated", "New"];

  return (
    <View style={styles.row}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          onPress={() => setSelected(filter)}
          style={[styles.chip, selected === filter && styles.selected]}
        >
          <Text style={styles.text}>{filter}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 12,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#222",
    borderRadius: 20,
    marginRight: 8,
  },
  selected: {
    backgroundColor: "#444",
  },
  text: {
    color: "white",
  },
});
