import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { AMBER, HEADER_HEIGHT, MUTED } from "../../../theme/tokens";
import PosterCard from "../components/PosterCard";
import { useDiscover } from "../hooks/useDiscover";
import { MovieCardData } from "../types";

export default function DiscoverScreen() {
  const { cards, loading, error, openMovie } = useDiscover();

  const { width } = useWindowDimensions();
  const columns = 3;
  const gap = 10;
  const padding = 16;
  const cardWidth = Math.floor(
    (width - padding * 2 - gap * (columns - 1)) / columns,
  );

  const renderMovie = ({
    item,
    index,
  }: {
    item: MovieCardData;
    index: number;
  }) => (
    <PosterCard
      item={item}
      width={cardWidth}
      marginRight={index % columns === columns - 1 ? 0 : gap}
      marginBottom={gap}
      onPress={() => openMovie(item.id)}
    />
  );

  return (
    <View style={styles.discover}>
      {error ? (
        <Text style={[styles.message, { marginTop: HEADER_HEIGHT + 40 }]}>
          {error}
        </Text>
      ) : loading ? (
        <ActivityIndicator
          color={AMBER}
          style={{ marginTop: HEADER_HEIGHT + 40 }}
        />
      ) : cards.length === 0 ? (
        <Text style={[styles.message, { marginTop: HEADER_HEIGHT + 40 }]}>
          No films found.
        </Text>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(m) => String(m.id)}
          renderItem={renderMovie}
          numColumns={columns}
          ListHeaderComponent={
            <Text style={styles.heading}>Popular right now</Text>
          }
          // The list starts below the header but scrolls underneath it
          contentContainerStyle={{
            paddingTop: HEADER_HEIGHT + 8,
            paddingBottom: 24,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  discover: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 16,
  },
  heading: {
    color: "#f6f6f6",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  message: {
    color: MUTED,
    fontSize: 15,
    marginTop: 40,
    textAlign: "center",
  },
});