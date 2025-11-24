import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import { getMovies, getTVShows } from "../services/movies";
import { Movie } from "../types/movie";

export default function Home() {
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

  if (loading) return <ActivityIndicator size="large" />;

  return <HomeScreen movies={movies} tvShows={tvShows} />;
}
