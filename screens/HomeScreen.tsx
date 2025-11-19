import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, useColorScheme, View } from "react-native";

import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import { Movie } from "../types/movie";

type Props = {
  movies: Movie[];
};

export default function Home({ movies }: Props) {
  const colorScheme = useColorScheme();
  const router = useRouter();

  if (!movies || movies.length === 0) {
    return <ThemedText style={styles.error}>No movies to display.</ThemedText>;
  }

  return (
    <ThemedView style={styles.pageContainer}>
      <ThemedText style={styles.pageTitle}>Popular Movies</ThemedText>
      <ScrollView contentContainerStyle={styles.container}>
        {movies.map((movie) => (
          <Pressable key={movie.id} onPress={() => router.push({ pathname: "/movie", params: { id: movie.id } })}>
            <View style={styles.movieContainer}>
              <ThemedText style={styles.title}>{movie.title}</ThemedText>
              {movie.title !== movie.original_title && (
                <ThemedText style={[styles.originalTitle, { color: colorScheme === 'dark' ? '#BBBBBB' : '#888' }]}>({movie.original_title})</ThemedText>
              )}
              <Image
                style={styles.image}
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              />
              <ThemedText style={[styles.language, { color: colorScheme === 'dark' ? '#CCCCCC' : '#555' }]}>Original Language: {movie.original_language.toUpperCase()}</ThemedText>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageContainer: { flex: 1, paddingTop: 40 },
  pageTitle: { fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  container: { paddingHorizontal: 20, paddingBottom: 20, alignItems: "center" },
  movieContainer: { alignItems: "center", marginBottom: 30 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 5, textAlign: "center" },
  originalTitle: { fontSize: 16, fontStyle: "italic", marginBottom: 15, textAlign: "center" },
  image: { width: 300, height: 450, borderRadius: 12, marginBottom: 15 },
  overview: { fontSize: 16, lineHeight: 22, textAlign: "center", paddingHorizontal: 10, marginBottom: 10 },
  language: { fontSize: 14, fontWeight: "600" },
  error: { fontSize: 18, color: "red", marginTop: 50, textAlign: "center" },
});
