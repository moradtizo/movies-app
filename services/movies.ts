import { Movie } from "../types/movie";

const API_KEY = process.env.EXPO_PUBLIC_MOVIE_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_MOVIE_API;

if (!API_KEY || !BASE_URL) throw new Error("Missing API_KEY or BASE_URL in .env");

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results as Movie[];   // << IMPORTANT
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // return array not null
  }
};

export const getMovieDetails = async (movieId: number): Promise<Movie | null> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const data = await response.json();
    return data as Movie;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
