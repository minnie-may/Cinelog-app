import { StyleSheet, Text, View } from "react-native";
import { MUTED, WHITE } from "../../theme/tokens";

export default function Placeholder({
  title,
  sub,
}: {
  title: string;
  sub: string;
}) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderTitle}>{title}</Text>
      <Text style={styles.placeholderSub}>{sub}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  placeholderTitle: { color: WHITE, fontSize: 24, fontWeight: "700" },
  placeholderSub: {
    color: MUTED,
    fontSize: 15,
    marginTop: 8,
    textAlign: "center",
  },
});