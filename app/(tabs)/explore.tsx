import MovieCard from '@/components/movie/MovieCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BorderRadius, Colors, FontSizes, Spacing } from '@/constants/styles';
import { Movie } from '@/types/movie';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TextInput, View, useColorScheme } from 'react-native';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const API_KEY = process.env.EXPO_PUBLIC_MOVIE_KEY;
      const BASE_URL = process.env.EXPO_PUBLIC_MOVIE_API;

      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>🔍 Search Movies</ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Find your favorite films
        </ThemedText>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          placeholder="Search for movies..."
          placeholderTextColor={colors.textTertiary}
          value={searchQuery}
          onChangeText={handleSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : searchQuery.trim().length === 0 ? (
        <View style={styles.centerContainer}>
          <ThemedText style={[styles.emptyText, { color: colors.textSecondary }]}>
            🎬
          </ThemedText>
          <ThemedText style={[styles.emptySubtext, { color: colors.textTertiary }]}>
            Start typing to search for movies
          </ThemedText>
        </View>
      ) : searchResults.length === 0 ? (
        <View style={styles.centerContainer}>
          <ThemedText style={[styles.emptyText, { color: colors.textSecondary }]}>
            😕
          </ThemedText>
          <ThemedText style={[styles.emptySubtext, { color: colors.textTertiary }]}>
            No movies found for &quot;{searchQuery}&quot;
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.md,
  },
  searchContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.md,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyText: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  emptySubtext: {
    fontSize: FontSizes.md,
    textAlign: 'center',
  },
});
