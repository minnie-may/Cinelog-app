import ActivityScreen from "@/features/Activity/screens/ActivityScreen";
import DiscoverScreen from "@/features/discover/screens/DiscoverScreen";
import ListsScreen from "@/features/lists/screens/ListsScreen";
import RecommendationsScreen from "@/features/recommendations/screens/recommendationScreen";
import ReviewScreen from "@/features/Reviews/components/screens/reviewScreen";
import SearchScreen from "@/features/Search/components/screens/searchScreen";
import { Stack } from "expo-router";
import { StatusBar, StyleSheet, View } from "react-native";
import Placeholder from "../components/ui/Placeholder";
import { Header } from "./Header";
import { MenuPanel } from "./MenuPanel";
import { TabBar } from "./TabBar";
import { useAppShell } from "./useAppShell";

export function AppShell() {
  const {
    tab,
    section,
    menuOpen,
    toggleMenu,
    closeMenu,
    chooseSection,
    chooseTab,
  } = useAppShell();

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      <Header onMenuPress={toggleMenu} />

      <View style={styles.content}>
        {/* Films stays mounted so it doesn't reload when you switch tabs */}
        <View
          style={[
            styles.pane,
            !(tab === "home" && section === "films") && styles.hidden,
          ]}
        >
          <DiscoverScreen />
        </View>

        {tab === "home" && section === "reviews" && <ReviewScreen />}

        {tab === "home" && section === "recommendations" && (
          <RecommendationsScreen />
        )}

        {/* Lists stays mounted so it doesn't reload when you switch tabs */}
        <View
          style={[
            styles.pane,
            !(tab === "home" && section === "lists") && styles.hidden,
          ]}
        >
          <ListsScreen />
        </View>

        {tab === "search" && <SearchScreen />}
        {tab === "add" && (
          <Placeholder title="Log a film" sub="The review form will go here." />
        )}
        {tab === "activity" && <ActivityScreen />}
        {tab === "profile" && (
          <Placeholder title="Profile" sub="Your profile will go here." />
        )}
      </View>

      <TabBar active={tab} onChange={chooseTab} />

      {menuOpen && (
        <MenuPanel
          section={section}
          highlight={tab === "home"}
          onSelect={chooseSection}
          onClose={closeMenu}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000000" },
  content: { flex: 1 },
  pane: { flex: 1 },
  hidden: { display: "none" },
});
