import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, useColorScheme, View } from "react-native";
import { BorderRadius, Colors, FontSizes, Shadows, Spacing } from "../../constants/styles";
import { Movie } from "../../types/movie";
import { ThemedText } from "../themed-text";
import WatchlistButton from "../WatchlistButton";

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const handlePress = () => {
    router.push({ pathname: "/movie", params: { id: movie.id } });
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.card,
        { 
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.7 : 1,
        },
        Shadows.medium,
      ]}
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        {movie.poster_path ? (
          <Image
            style={styles.image}
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: colors.border }]}>
            <ThemedText style={styles.placeholderText}>No Image</ThemedText>
          </View>
        )}
        
        {/* Rating Badge */}
        {movie.vote_average !== undefined && (
          <View style={[styles.ratingBadge, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <ThemedText style={styles.ratingText}>
              {movie.vote_average.toFixed(1)}
            </ThemedText>
          </View>
        )}

        {/* Watchlist Button */}
        <View style={styles.watchlistButton}>
          <WatchlistButton movie={movie} variant="icon" size="medium" />
        </View>
      </View>

      {/* <View style={styles.content}>
        <ThemedText style={styles.title} numberOfLines={2}>
          {movie.title}
        </ThemedText>
        
        {movie.release_date && (
          <ThemedText style={[styles.releaseDate, { color: colors.textSecondary }]}>
            {new Date(movie.release_date).getFullYear()}
          </ThemedText>
        )}

        {movie.overview && (
          <ThemedText 
            style={[styles.overview, { color: colors.textTertiary }]} 
            numberOfLines={3}
          >
            {movie.overview}
          </ThemedText>
        )}
      </View> */}
    </Pressable>
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
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 280,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: FontSizes.md,
    opacity: 0.5,
  },
  ratingBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  watchlistButton: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
  },
  content: {
    padding: Spacing.md,
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  releaseDate: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  overview: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
});

