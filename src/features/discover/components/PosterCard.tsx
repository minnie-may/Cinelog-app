import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AMBER, MUTED, WHITE } from "../../../theme/tokens";
import { usePressAnimation } from "../hooks/usePressAnimation";
import { MovieCardData } from "../types";

type Props = {
  item: MovieCardData;
  width: number;
  marginRight: number;
  marginBottom: number;
  onPress: () => void;
};

export default function PosterCard({
  item,
  width,
  marginRight,
  marginBottom,
  onPress,
}: Props) {
  const { animatedStyle, onPressIn, onPressOut } = usePressAnimation();
  const height = width * 1.5;

  return (
    <Pressable
      style={{ width, marginRight, marginBottom }}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
    >
      <Animated.View style={animatedStyle}>
        {item.posterUrl ? (
          <Image
            source={{ uri: item.posterUrl }}
            style={[styles.poster, { width, height }]}
          />
        ) : (
          <View style={[styles.poster, styles.noPoster, { width, height }]}>
            <Text style={styles.noPosterText}>{item.title}</Text>
          </View>
        )}
        {item.rating && (
          <View style={styles.badge}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.badgeText}>{item.rating}</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  poster: { borderRadius: 10, backgroundColor: "#1F1F1F" },
  badge: {
    position: "absolute",
    left: 6,
    bottom: 6,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  star: { color: AMBER, fontSize: 11 },
  badgeText: { color: WHITE, fontSize: 11, fontWeight: "700", marginLeft: 3 },
  noPoster: { justifyContent: "center", alignItems: "center", padding: 8 },
  noPosterText: { color: MUTED, fontSize: 12, textAlign: "center" },
});