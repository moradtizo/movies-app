import React from "react";
import { FlatList, StyleSheet, useColorScheme, View } from "react-native";
import MovieCard from "../components/movie/MovieCard";
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import { Colors, FontSizes, Spacing } from "../constants/styles";
import { Movie } from "../types/movie";

type Props = {
  movies: Movie[];
};

export default function HomeScreen({ movies }: Props) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  if (!movies || movies.length === 0) {
    return (
      <ThemedView style={styles.pageContainer}>
        <ThemedText style={[styles.error, { color: colors.error }]}>
          No movies to display.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.pageContainer}>
      <View style={styles.header}>
        <ThemedText style={styles.pageTitle}>🎬 Popular Movies</ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Discover trending films
        </ThemedText>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  header: {
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  pageTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: "bold",
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.md,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  error: {
    fontSize: FontSizes.lg,
    marginTop: 50,
    textAlign: "center",
  },
});
