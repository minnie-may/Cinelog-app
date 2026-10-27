import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HEADER_HEIGHT, WHITE, topSpace } from "../../theme/tokens";

export function Header({ onMenuPress }: { onMenuPress: () => void }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onMenuPress} hitSlop={10} style={styles.menuButton}>
        <Ionicons name="menu" size={20} color={WHITE} />
      </Pressable>
      <Text style={styles.title}>
        Cine<Text style={{ color: "#B20710" }}>log</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: HEADER_HEIGHT,
    paddingTop: topSpace,
    paddingHorizontal: 16,
    backgroundColor: "rgba(20, 20, 20, 0.85)",
  },
  menuButton: { marginRight: 12 },
  title: { color: WHITE, fontSize: 28, fontWeight: "800", letterSpacing: 0.5 },
});