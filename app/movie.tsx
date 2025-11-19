import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import { getMovieDetails } from "../services/movies";
import { Movie } from "../types/movie";

export default function MovieDetails() {
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.title}>{movie.title}</ThemedText>

        {/* Genres */}
        {movie.genres && movie.genres.length > 0 && (
          <View style={styles.genresContainer}>
            {movie.genres.map((genre, index) => (
              <ThemedText
                key={genre.id}
                style={[styles.genre, { color: colorScheme === 'dark' ? '#4A9EFF' : '#0066CC' }]}
              >
                {genre.name}{index < movie.genres!.length - 1 ? ' • ' : ''}
              </ThemedText>
            ))}
          </View>
        )}

        {movie.poster_path && (
          <Image
            style={styles.image}
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          />
        )}

        {/* Overview */}
        <ThemedText style={styles.overview}>{movie.overview}</ThemedText>

        {/* Movie Details */}
        <View style={styles.detailsContainer}>
          {movie.release_date && (
            <View style={styles.detailRow}>
              <ThemedText style={[styles.detailLabel, { color: colorScheme === 'dark' ? '#AAAAAA' : '#666' }]}>
                Release Date:
              </ThemedText>
              <ThemedText style={styles.detailValue}>
                {formatDate(movie.release_date)}
              </ThemedText>
            </View>
          )}

          {movie.runtime && (
            <View style={styles.detailRow}>
              <ThemedText style={[styles.detailLabel, { color: colorScheme === 'dark' ? '#AAAAAA' : '#666' }]}>
                Runtime:
              </ThemedText>
              <ThemedText style={styles.detailValue}>
                {movie.runtime} minutes
              </ThemedText>
            </View>
          )}

          {movie.revenue !== undefined && movie.revenue > 0 && (
            <View style={styles.detailRow}>
              <ThemedText style={[styles.detailLabel, { color: colorScheme === 'dark' ? '#AAAAAA' : '#666' }]}>
                Revenue:
              </ThemedText>
              <ThemedText style={styles.detailValue}>
                {formatCurrency(movie.revenue)}
              </ThemedText>
            </View>
          )}

          {movie.vote_average !== undefined && (
            <View style={styles.detailRow}>
              <ThemedText style={[styles.detailLabel, { color: colorScheme === 'dark' ? '#AAAAAA' : '#666' }]}>
                Vote Average:
              </ThemedText>
              <ThemedText style={[styles.detailValue, { color: colorScheme === 'dark' ? '#FFD700' : '#FFA500' }]}>
                {movie.vote_average.toFixed(3)}
              </ThemedText>
            </View>
          )}

          {movie.vote_count !== undefined && (
            <View style={styles.detailRow}>
              <ThemedText style={[styles.detailLabel, { color: colorScheme === 'dark' ? '#AAAAAA' : '#666' }]}>
                Vote Count:
              </ThemedText>
              <ThemedText style={styles.detailValue}>
                {movie.vote_count.toLocaleString()}
              </ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, alignItems: "center", paddingBottom: 40 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { fontSize: 18, color: "red", marginTop: 50, textAlign: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  genresContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 15 },
  genre: { fontSize: 16, fontWeight: "600", marginHorizontal: 2 },
  image: { width: 300, height: 450, borderRadius: 12, marginBottom: 20 },
  overview: { fontSize: 16, lineHeight: 24, textAlign: "center", paddingHorizontal: 10, marginBottom: 25 },
  detailsContainer: { width: "100%", paddingHorizontal: 20 },
  detailRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#333" },
  detailLabel: { fontSize: 15, fontWeight: "600" },
  detailValue: { fontSize: 15 },
});
