import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../types/movie';

const WATCHLIST_KEY = '@cinemax_watchlist';

/**
 * Get all movies in the watchlist
 */
export const getWatchlist = async (): Promise<Movie[]> => {
  try {
    const data = await AsyncStorage.getItem(WATCHLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting watchlist:', error);
    return [];
  }
};

/**
 * Add a movie to the watchlist
 */
export const addToWatchlist = async (movie: Movie): Promise<boolean> => {
  try {
    const watchlist = await getWatchlist();
    
    // Check if movie already exists
    const exists = watchlist.some(m => m.id === movie.id);
    if (exists) {
      return false;
    }
    
    // Add movie to watchlist
    const updatedWatchlist = [...watchlist, movie];
    await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
    return true;
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return false;
  }
};

/**
 * Remove a movie from the watchlist
 */
export const removeFromWatchlist = async (movieId: number): Promise<boolean> => {
  try {
    const watchlist = await getWatchlist();
    const updatedWatchlist = watchlist.filter(m => m.id !== movieId);
    await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
    return true;
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return false;
  }
};

/**
 * Check if a movie is in the watchlist
 */
export const isInWatchlist = async (movieId: number): Promise<boolean> => {
  try {
    const watchlist = await getWatchlist();
    return watchlist.some(m => m.id === movieId);
  } catch (error) {
    console.error('Error checking watchlist:', error);
    return false;
  }
};

/**
 * Toggle a movie in the watchlist (add if not present, remove if present)
 */
export const toggleWatchlist = async (movie: Movie): Promise<boolean> => {
  try {
    const inWatchlist = await isInWatchlist(movie.id);
    
    if (inWatchlist) {
      await removeFromWatchlist(movie.id);
      return false; // Removed
    } else {
      await addToWatchlist(movie);
      return true; // Added
    }
  } catch (error) {
    console.error('Error toggling watchlist:', error);
    return false;
  }
};

/**
 * Clear the entire watchlist
 */
export const clearWatchlist = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(WATCHLIST_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing watchlist:', error);
    return false;
  }
};

