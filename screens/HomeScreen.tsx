import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import MovieCard from "../components/movie/MovieCard";
import TopMovieCard from "../components/movie/TopMovieCard";
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import { BorderRadius, Colors, FontSizes, Spacing } from "../constants/styles";
import { Movie } from "../types/movie";

type Props = {
  movies: Movie[];
  tvShows: Movie[];
};

export default function HomeScreen({ movies, tvShows }: Props) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const router = useRouter();

  const handleSearchPress = () => {
    // Navigate to search tab
    router.push('/(tabs)/explore');
  };

  if (!movies || movies.length === 0) {
    return (
      <ThemedView style={styles.pageContainer}>
        <ThemedText style={[styles.error, { color: colors.error }]}>
          No movies to display.
        </ThemedText>
      </ThemedView>
    );
  }

  // Get top 10 movies for the horizontal scroll
  const top10Movies = movies.slice(0, 10);

  return (
    <ThemedView style={styles.pageContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.headerTextContainer}>
              <ThemedText style={styles.pageTitle}>What do you want to watch?</ThemedText>
            </View>
          </View>

          {/* Search Input */}
          <Pressable
            style={[styles.searchInput, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={handleSearchPress}
          >
            <Ionicons name="search" size={20} color={colors.textTertiary} />
            <ThemedText style={[styles.searchPlaceholder, { color: colors.textTertiary }]}>
              Search movies...
            </ThemedText>
          </Pressable>
        </View>

        {/* Top 10 Popular Movies Section */}
        <View style={styles.topMoviesSection}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Top 10 Popular</ThemedText>
            <Ionicons name="flame" size={24} color={colors.primary} />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topMoviesScroll}
          >
            {top10Movies.map((movie, index) => (
              <TopMovieCard
                key={movie.id}
                movie={movie}
                rank={index + 1}
              />
            ))}
          </ScrollView>
        </View>

        {/* Movies Section */}
        <View style={styles.categorySection}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Movies</ThemedText>
            <Ionicons name="film" size={24} color={colors.primary} />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {movies.slice(0, 10).map((movie) => (
              <View key={movie.id} style={styles.categoryCardWrapper}>
                <MovieCard movie={movie} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* TV Shows Section */}
        <View style={styles.categorySection}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>TV Shows</ThemedText>
            <Ionicons name="tv" size={24} color={colors.primary} />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {tvShows.slice(0, 10).map((show) => (
              <View key={show.id} style={styles.categoryCardWrapper}>
                <MovieCard movie={show} />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  header: {
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  headerTextContainer: {
    flex: 1,
  },
  pageTitle: {
    top:20,
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: FontSizes.md,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchPlaceholder: {
    fontSize: FontSizes.md,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  topMoviesSection: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  sectionTitle: {
    
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
  },
  topMoviesScroll: {
    paddingLeft: Spacing.md,
    paddingRight: Spacing.md,
  },
  categorySection: {
    marginBottom: Spacing.xl,
  },
  categoryScroll: {
    paddingLeft: Spacing.md,
    paddingRight: Spacing.md,
  },
  categoryCardWrapper: {
    width: 150,
    marginRight: Spacing.md,
  },
  error: {
    fontSize: FontSizes.lg,
    marginTop: 50,
    textAlign: "center",
  },
});
