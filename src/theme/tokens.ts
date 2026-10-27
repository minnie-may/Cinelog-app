import { Platform, StatusBar } from "react-native";

export const BLUE = "#40BCF4";
export const GREEN = "#00E054";
export const AMBER = "#F2B33D";
export const WHITE = "#E8E6E1";
export const MUTED = "#8A93A3";

export const topSpace =
  Platform.OS === "android" ? (StatusBar.currentHeight || 24) + 8 : 56;
export const HEADER_ROW_HEIGHT = 48;
export const HEADER_HEIGHT = topSpace + HEADER_ROW_HEIGHT;
