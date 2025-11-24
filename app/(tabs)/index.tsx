import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Home from "../../screens/HomeScreen";
import { getMovies, getTVShows } from "../../services/movies";
import { Movie } from "../../types/movie";

export default function Index() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [moviesData, tvShowsData] = await Promise.all([
        getMovies(),
        getTVShows(),
      ]);
      setMovies(moviesData);
      setTVShows(tvShowsData);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return <Home movies={movies} tvShows={tvShows} />;
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center" },
});