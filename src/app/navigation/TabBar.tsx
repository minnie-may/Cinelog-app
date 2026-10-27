import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BLUE, GREEN, MUTED, WHITE } from "../../theme/tokens";
import { IconName, TabKey } from "./types";

const TABS: {
  key: TabKey;
  on: IconName;
  off: IconName;
  activeColor: string;
  inactiveColor: string;
  size: number;
}[] = [
  {
    key: "home",
    on: "albums",
    off: "albums-outline",
    activeColor: BLUE,
    inactiveColor: MUTED,
    size: 26,
  },
  {
    key: "search",
    on: "search",
    off: "search",
    activeColor: WHITE,
    inactiveColor: MUTED,
    size: 26,
  },
  {
    key: "add",
    on: "add-circle-outline",
    off: "add-circle-outline",
    activeColor: GREEN,
    inactiveColor: GREEN,
    size: 30,
  },
  {
    key: "activity",
    on: "flash",
    off: "flash-outline",
    activeColor: WHITE,
    inactiveColor: MUTED,
    size: 26,
  },
  {
    key: "profile",
    on: "person",
    off: "person-outline",
    activeColor: WHITE,
    inactiveColor: MUTED,
    size: 26,
  },
];

export function TabBar({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (key: TabKey) => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom + 10 }]}>
      {TABS.map((tab) => {
        const focused = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            style={styles.tabButton}
            onPress={() => onChange(tab.key)}
            hitSlop={8}
          >
            <Ionicons
              name={focused ? tab.on : tab.off}
              size={tab.size}
              color={focused ? tab.activeColor : tab.inactiveColor}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#121212",
    borderTopWidth: 0,
    paddingTop: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});