import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HEADER_HEIGHT, MUTED, WHITE } from "../../../theme/tokens";

type ActivityTab = "friends" | "you" | "incoming";

const ACTIVITY_TABS: {
  key: ActivityTab;
  label: string;
  title: string;
  sub: string;
}[] = [
  {
    key: "friends",
    label: "Friends",
    title: "No activity.",
    sub: "Your friends are watching something. Just not here.",
  },
  {
    key: "you",
    label: "You",
    title: "Nothing logged yet.",
    sub: "Go watch something. We'll wait.",
  },
  {
    key: "incoming",
    label: "Incoming",
    title: "Nothing incoming.",
    sub: "The mailbox is quiet. Suspiciously quiet.",
  },
];

export default function ActivityScreen() {
  const [selected, setSelected] = useState<ActivityTab>("friends");
  const current = ACTIVITY_TABS.find((t) => t.key === selected)!;

  return (
    <View style={styles.activity}>
      <Text style={[styles.heading, { textAlign: "center" }]}>Activity</Text>

      <View style={styles.pillRow}>
        {ACTIVITY_TABS.map((t, i) => {
          const isSelected = t.key === selected;
          const prevSelected = i > 0 && ACTIVITY_TABS[i - 1].key === selected;
          // Thin divider between segments, hidden next to the selected one
          const showDivider = i > 0 && !isSelected && !prevSelected;
          return (
            <Pressable
              key={t.key}
              onPress={() => setSelected(t.key)}
              style={[styles.pill, isSelected && styles.pillSelected]}
            >
              {showDivider && <View style={styles.pillDivider} />}
              <Text
                style={[styles.pillText, isSelected && styles.pillTextSelected]}
              >
                {t.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.emptyWrap}>
        <Text style={styles.emptyTitle}>{current.title}</Text>
        <Text style={styles.emptySub}>{current.sub}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 16,
    paddingTop: HEADER_HEIGHT + 8,
  },
  heading: {
    color: "#f6f6f6",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  pillRow: {
    flexDirection: "row",
    backgroundColor: "#1F1F1F",
    borderRadius: 12,
    padding: 3,
  },
  pill: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    borderRadius: 9,
  },
  pillDivider: {
    position: "absolute",
    left: 0,
    top: 9,
    bottom: 9,
    width: 1,
    backgroundColor: "#3A3A3A",
  },
  pillSelected: { backgroundColor: WHITE },
  pillText: { color: WHITE, fontSize: 15, fontWeight: "600" },
  pillTextSelected: { color: "#000000" },
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 60,
  },
  emptyTitle: { color: WHITE, fontSize: 24, fontWeight: "700" },
  emptySub: { color: MUTED, fontSize: 15, marginTop: 8, textAlign: "center" },
});
