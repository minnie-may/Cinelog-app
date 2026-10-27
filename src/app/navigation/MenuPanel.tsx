import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AMBER, HEADER_HEIGHT, WHITE } from "../../theme/tokens";
import { IconName, Section } from "./types";

const MENU_ITEMS: { key: Section; label: string; icon: IconName }[] = [
  { key: "films", label: "Films", icon: "film-outline" },
  { key: "reviews", label: "Reviews", icon: "star-outline" },
  { key: "lists", label: "Lists", icon: "list-outline" },
  { key: "recommended", label: "For you", icon: "sparkles-outline" },
];

type Props = {
  section: Section;
  highlight: boolean;
  onSelect: (key: Section) => void;
  onClose: () => void;
};

export function MenuPanel({ section, highlight, onSelect, onClose }: Props) {
  return (
    <>
      {/* Tap anywhere outside the menu to close it */}
      <Pressable
        style={[StyleSheet.absoluteFill, { zIndex: 5 }]}
        onPress={onClose}
      />
      <View style={styles.menuPanel}>
        {MENU_ITEMS.map((item) => {
          const selected = highlight && item.key === section;
          return (
            <Pressable
              key={item.key}
              style={styles.menuItem}
              onPress={() => onSelect(item.key)}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={selected ? AMBER : WHITE}
              />
              <Text style={[styles.menuLabel, selected && { color: AMBER }]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  menuPanel: {
    position: "absolute",
    zIndex: 20,
    top: HEADER_HEIGHT - 4,
    left: 16,
    width: 200,
    backgroundColor: "#1F1F1F",
    borderRadius: 12,
    paddingVertical: 6,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuLabel: { color: WHITE, fontSize: 17, fontWeight: "600", marginLeft: 14 },
});
