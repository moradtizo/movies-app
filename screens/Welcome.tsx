import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Animated, StyleSheet, useColorScheme, View } from "react-native";
import AppLogo from "../components/AppLogo";
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import { Colors, Spacing } from "../constants/styles";

export default function Welcome() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Fade in and scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to Home after 2.5 seconds
    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <AppLogo size="large" showText={true} />

        <View style={styles.loadingContainer}>
          <ThemedText style={[styles.loadingText, { color: colors.textSecondary }]}>
            Loading your movie experience...
          </ThemedText>
          <View style={styles.dotsContainer}>
            <ThemedText style={[styles.dot, { color: colors.primary }]}>●</ThemedText>
            <ThemedText style={[styles.dot, { color: colors.primary }]}>●</ThemedText>
            <ThemedText style={[styles.dot, { color: colors.primary }]}>●</ThemedText>
          </View>
        </View>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: 'center',
  },
  loadingContainer: {
    marginTop: Spacing.xxl,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginBottom: Spacing.sm,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    fontSize: 20,
  },
});
