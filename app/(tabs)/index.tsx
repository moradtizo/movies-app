import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Home from "../../screens/HomeScreen";
import { getMovies } from "../../services/movies";
import { Movie } from "../../types/movie";

export default function Index() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getMovies();
      setMovies(data);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return <Home movies={movies} />;
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center" },
});