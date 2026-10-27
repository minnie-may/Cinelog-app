import { useState } from "react";
import { Section, TabKey } from "./types";

export function useAppShell() {
  const [tab, setTab] = useState<TabKey>("home");
  const [section, setSection] = useState<Section>("films");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  const chooseSection = (key: Section) => {
    setSection(key);
    setTab("home");
    setMenuOpen(false);
  };

  const chooseTab = (key: TabKey) => {
    setMenuOpen(false);
    setTab(key);
  };

  return {
    tab,
    section,
    menuOpen,
    toggleMenu,
    closeMenu,
    chooseSection,
    chooseTab,
  };
}