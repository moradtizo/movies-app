import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, useColorScheme, View } from "react-native";
import { BorderRadius, Colors, FontSizes, Shadows, Spacing } from "../../constants/styles";
import { Movie } from "../../types/movie";
import { ThemedText } from "../themed-text";
import WatchlistButton from "../WatchlistButton";

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.6; // 60% of screen width
const CARD_HEIGHT = CARD_WIDTH * 1.5; // 3:2 aspect ratio

type Props = {
  movie: Movie;
  rank: number;
};

export default function TopMovieCard({ movie, rank }: Props) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const router = useRouter();

  const handlePress = () => {
    router.push(`/movie?id=${movie.id}`);
  };

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
      android_ripple={{ color: colors.primary + '20' }}
    >
      {/* Rank Number - Large and Prominent */}
      <View style={styles.rankContainer}>
        <View style={[styles.rankBadge, { backgroundColor: colors.primary }]}>
          <ThemedText style={styles.rankBadgeText}>{rank}</ThemedText>
        </View>
      </View>

      {/* Movie Poster */}
      <View style={[styles.imageContainer, { backgroundColor: colors.surface }]}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.placeholder, { backgroundColor: colors.border }]}>
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
          <WatchlistButton movie={movie} variant="icon" size="small" />
        </View>

        {/* Gradient Overlay */}
        <View style={styles.gradientOverlay} />
      </View>

      {/* Movie Info */}
      <View style={styles.infoContainer}>
        <ThemedText style={styles.title} numberOfLines={2}>
          {movie.title}
        </ThemedText>
        {movie.release_date && (
          <ThemedText style={[styles.year, { color: colors.textSecondary }]}>
            {new Date(movie.release_date).getFullYear()}
          </ThemedText>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginRight: Spacing.md,
  },
  rankContainer: {
    position: 'relative',
    left: -15,
    top: 340,
    zIndex: 10,
  },
  rankBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...Shadows.large,
  },
  rankBadgeText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  imageContainer: {
    top:-30,
    left:10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  image: {
   
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: FontSizes.md,
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
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  infoContainer: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  title: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginBottom: 4,
  },
  year: {
    fontSize: FontSizes.sm,
  },
});

