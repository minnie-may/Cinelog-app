import { Ionicons } from "@expo/vector-icons";

export type Section = "films" | "reviews" | "lists" | "recommendations";
export type TabKey = "home" | "search" | "add" | "activity" | "profile";
export type IconName = keyof typeof Ionicons.glyphMap;
