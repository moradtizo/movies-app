import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { getMovies } from "../services/movies";
import HomeScreen from "../screens/HomeScreen";
import { Movie } from "../types/movie";

export default function Home() {
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

  if (loading) return <ActivityIndicator size="large" />;

  return <HomeScreen movies={movies} />;
}
