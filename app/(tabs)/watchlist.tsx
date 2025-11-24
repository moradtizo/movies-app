import AppLogo from '@/components/AppLogo';
import MovieCard from '@/components/movie/MovieCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, FontSizes, Spacing } from '@/constants/styles';
import { useWatchlist } from '@/contexts/WatchlistContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, useColorScheme, View } from 'react-native';

export default function WatchlistScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const { watchlist, loading } = useWatchlist();

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" style={styles.loader} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <AppLogo size="small" showText={false} />
          <View style={styles.headerTextContainer}>
            <ThemedText style={styles.title}>My Watchlist</ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
              {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved
            </ThemedText>
          </View>
        </View>
      </View>

      {watchlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="movie-open-outline" size={80} color={colors.textTertiary} />
          <ThemedText style={styles.emptyTitle}>Your Watchlist is Empty</ThemedText>
          <ThemedText style={[styles.emptyText, { color: colors.textSecondary }]}>
            Start adding movies you want to watch later!
          </ThemedText>
          <View style={styles.emptyHintContainer}>
            <ThemedText style={[styles.emptyHint, { color: colors.textTertiary }]}>
              Tap the
            </ThemedText>
            <MaterialCommunityIcons name="heart-outline" size={16} color={colors.primary} />
            <ThemedText style={[styles.emptyHint, { color: colors.textTertiary }]}>
              icon on any movie to add it here
            </ThemedText>
          </View>
        </View>
      ) : (
        <FlatList
          data={watchlist}
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.md,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: FontSizes.md,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  emptyHintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  emptyHint: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

