import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { IMAGE_BASE, TMDB_API_KEY } from "../../../services/httpClient";
import { AMBER, HEADER_HEIGHT, MUTED, WHITE } from "../../../theme/tokens";

// Sample lists. The films come from TMDB; titles, authors and
// descriptions are made up for now (real user lists come later).
const LIST_DEFS = [
  {
    id: "feel",
    title: "Films that make you feel something",
    author: "maya",
    avatarColor: "#B20710",
    path: "top_rated",
    description:
      "A list of films that stayed with me long after the credits. Some will make you laugh, some will make you cry, and a few will do both.",
  },
  {
    id: "popcorn",
    title: "Friday night popcorn picks",
    author: "omar",
    avatarColor: "#40BCF4",
    path: "popular",
    description:
      "No homework, no deep thinking. Just good movies for when you want to switch your brain off and enjoy the ride.",
  },
  {
    id: "cinemas",
    title: "In cinemas right now",
    author: "noor",
    avatarColor: "#00E054",
    path: "now_playing",
    description:
      "Everything worth buying a ticket for at the moment, updated whenever something new opens.",
  },
  {
    id: "soon",
    title: "Waiting for these",
    author: "karim",
    avatarColor: "#F2B33D",
    path: "upcoming",
    description:
      "The movies I have circled on my calendar. Ask me again in a month if they were worth the hype.",
  },
];

async function fetchListPosters(path: string) {
  const url = `https://api.themoviedb.org/3/movie/${path}?api_key=${TMDB_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("TMDB returned " + response.status);
  }
  const data = await response.json();
  return (data.results || []).filter((m: any) => m.poster_path).slice(0, 12);
}

function ListCard({
  def,
  movies,
}: {
  def: (typeof LIST_DEFS)[number];
  movies: any[];
}) {
  return (
    <Pressable
      style={styles.listCard}
      onPress={() => console.log("Open list", def.id)}
    >
      <View style={styles.listTopRow}>
        <Text style={styles.listTitle}>{def.title}</Text>
        <View style={styles.listAuthor}>
          <Text style={styles.listAuthorName}>{def.author}</Text>
          <View style={[styles.avatar, { backgroundColor: def.avatarColor }]}>
            <Text style={styles.avatarLetter}>
              {def.author.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      {/* Row of overlapping posters */}
      <View style={styles.posterStrip}>
        {movies.map((m, i) => (
          <Image
            key={m.id}
            source={{ uri: IMAGE_BASE + m.poster_path }}
            style={[styles.stripPoster, i > 0 && { marginLeft: -16 }]}
          />
        ))}
      </View>

      <Text style={styles.listDescription} numberOfLines={3}>
        {def.description}
      </Text>
    </Pressable>
  );
}

export default function ListsScreen() {
  const [lists, setLists] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const all = await Promise.all(
          LIST_DEFS.map((d) => fetchListPosters(d.path)),
        );
        if (!cancelled) {
          const byId: Record<string, any[]> = {};
          LIST_DEFS.forEach((d, i) => (byId[d.id] = all[i]));
          setLists(byId);
        }
      } catch (e) {
        const reason = e instanceof Error ? e.message : String(e);
        console.log("Lists fetch failed:", reason);
        if (!cancelled) setError("Couldn't load lists: " + reason);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

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
      ) : (
        <FlatList
          data={LIST_DEFS}
          keyExtractor={(d) => d.id}
          renderItem={({ item }) => (
            <ListCard def={item} movies={lists[item.id] || []} />
          )}
          ListHeaderComponent={
            <Text style={styles.heading}>Popular this week</Text>
          }
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
  listCard: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#222222",
  },
  listTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  listTitle: {
    flex: 1,
    color: WHITE,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 26,
    marginRight: 12,
  },
  listAuthor: { flexDirection: "row", alignItems: "center" },
  listAuthorName: {
    color: MUTED,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: { color: "#000000", fontSize: 14, fontWeight: "800" },
  posterStrip: {
    flexDirection: "row",
    height: 76,
    overflow: "hidden",
    borderRadius: 6,
    backgroundColor: "#1F1F1F",
    marginBottom: 12,
  },
  stripPoster: {
    width: 51,
    height: 76,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 4,
  },
  listDescription: { color: WHITE, fontSize: 15, lineHeight: 22 },
});
