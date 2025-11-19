import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import { Colors, Shadows } from "../constants/styles";
import { getMovieDetails } from "../services/movies";
import { Movie } from "../types/movie";

const { width } = Dimensions.get('window');

export default function MovieDetails() {
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovieDetails = async () => {
      if (params.id) {
        const movieId = typeof params.id === 'string' ? parseInt(params.id) :
                        Array.isArray(params.id) ? parseInt(params.id[0]) : params.id;
        const data = await getMovieDetails(movieId);
        setMovie(data);
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [params.id]);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" style={styles.loader} />
      </ThemedView>
    );
  }

  if (!movie) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.error}>Movie not found</ThemedText>
      </ThemedView>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image Section */}
        {movie.poster_path && (
          <View style={styles.heroContainer}>
            <Image
              style={styles.posterImage}
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay} />

            {/* Rating Badge */}
            {movie.vote_average !== undefined && (
              <View style={[styles.ratingBadge, Shadows.medium]}>
                <ThemedText style={styles.ratingIcon}>⭐</ThemedText>
                <ThemedText style={styles.ratingValue}>
                  {movie.vote_average.toFixed(1)}
                </ThemedText>
                <ThemedText style={[styles.ratingCount, { color: colors.textTertiary }]}>
                  ({movie.vote_count?.toLocaleString()})
                </ThemedText>
              </View>
            )}
          </View>
        )}

        {/* Content Section */}
        <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
          {/* Title */}
          <ThemedText style={styles.title}>{movie.title}</ThemedText>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <View style={styles.genresContainer}>
              {movie.genres.map((genre) => (
                <View
                  key={genre.id}
                  style={[
                    styles.genreChip,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.primary,
                    },
                    Shadows.small,
                  ]}
                >
                  <ThemedText style={[styles.genreText, { color: colors.primary }]}>
                    {genre.name}
                  </ThemedText>
                </View>
              ))}
            </View>
          )}

          {/* Quick Info Cards */}
          <View style={styles.quickInfoContainer}>
            {movie.release_date && (
              <View style={[styles.infoCard, { backgroundColor: colors.surface }, Shadows.small]}>
                <ThemedText style={styles.infoIcon}>📅</ThemedText>
                <ThemedText style={[styles.infoLabel, { color: colors.textSecondary }]}>
                  Release
                </ThemedText>
                <ThemedText style={styles.infoValue}>
                  {formatDate(movie.release_date)}
                </ThemedText>
              </View>
            )}

            {movie.runtime && (
              <View style={[styles.infoCard, { backgroundColor: colors.surface }, Shadows.small]}>
                <ThemedText style={styles.infoIcon}>⏱️</ThemedText>
                <ThemedText style={[styles.infoLabel, { color: colors.textSecondary }]}>
                  Runtime
                </ThemedText>
                <ThemedText style={styles.infoValue}>
                  {movie.runtime} min
                </ThemedText>
              </View>
            )}

            {movie.revenue !== undefined && movie.revenue > 0 && (
              <View style={[styles.infoCard, { backgroundColor: colors.surface }, Shadows.small]}>
                <ThemedText style={styles.infoIcon}>💰</ThemedText>
                <ThemedText style={[styles.infoLabel, { color: colors.textSecondary }]}>
                  Revenue
                </ThemedText>
                <ThemedText style={styles.infoValue} numberOfLines={1}>
                  {formatCurrency(movie.revenue)}
                </ThemedText>
              </View>
            )}
          </View>

          {/* Overview Section */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>📖 Overview</ThemedText>
            <ThemedText style={[styles.overview, { color: colors.textSecondary }]}>
              {movie.overview}
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 16,
    color: "red",
    marginTop: 20,
    textAlign: "center",
  },

  // Hero Section
  heroContainer: {
    width: width,
    height: width * 1.5,
    position: 'relative',
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  ratingBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingIcon: {
    fontSize: 18,
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  ratingCount: {
    fontSize: 12,
  },

  // Content Section
  contentContainer: {
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    lineHeight: 38,
  },

  // Genres
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  genreChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  genreText: {
    fontSize: 14,
    fontWeight: "600",
  },

  // Quick Info Cards
  quickInfoContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 4,
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },

  // Overview Section
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  overview: {
    fontSize: 16,
    lineHeight: 26,
  },
});
