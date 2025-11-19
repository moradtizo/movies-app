import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { Colors, Spacing, BorderRadius } from "../../constants/styles";

export default function MovieCardSkeleton() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.imageSkeleton, { backgroundColor: colors.border }]} />
      <View style={styles.content}>
        <View style={[styles.titleSkeleton, { backgroundColor: colors.border }]} />
        <View style={[styles.dateSkeleton, { backgroundColor: colors.border }]} />
        <View style={[styles.overviewSkeleton, { backgroundColor: colors.border }]} />
        <View style={[styles.overviewSkeleton, { backgroundColor: colors.border, width: '80%' }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    width: '100%',
  },
  imageSkeleton: {
    width: '100%',
    height: 280,
  },
  content: {
    padding: Spacing.md,
  },
  titleSkeleton: {
    height: 20,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
    width: '70%',
  },
  dateSkeleton: {
    height: 14,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
    width: '30%',
  },
  overviewSkeleton: {
    height: 12,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xs,
    width: '100%',
  },
});

