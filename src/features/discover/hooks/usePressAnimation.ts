import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function usePressAnimation() {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // Fade in when first shown
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();
  }, []);

  // Little "squish" when pressed
  const squish = (to: number) =>
    Animated.spring(scale, {
      toValue: to,
      speed: 30,
      bounciness: 8,
      useNativeDriver: true,
    }).start();

  return {
    animatedStyle: { opacity, transform: [{ scale }] },
    onPressIn: () => squish(0.94),
    onPressOut: () => squish(1),
  };
}