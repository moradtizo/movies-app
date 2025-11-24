import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Movie } from '../types/movie';
import * as WatchlistService from '../services/watchlist';

interface WatchlistContextType {
  watchlist: Movie[];
  isInWatchlist: (movieId: number) => boolean;
  addToWatchlist: (movie: Movie) => Promise<void>;
  removeFromWatchlist: (movieId: number) => Promise<void>;
  toggleWatchlist: (movie: Movie) => Promise<boolean>;
  refreshWatchlist: () => Promise<void>;
  loading: boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

interface WatchlistProviderProps {
  children: ReactNode;
}

export function WatchlistProvider({ children }: WatchlistProviderProps) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Load watchlist on mount
  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    setLoading(true);
    const data = await WatchlistService.getWatchlist();
    setWatchlist(data);
    setLoading(false);
  };

  const isInWatchlist = (movieId: number): boolean => {
    return watchlist.some(m => m.id === movieId);
  };

  const addToWatchlist = async (movie: Movie) => {
    const success = await WatchlistService.addToWatchlist(movie);
    if (success) {
      setWatchlist(prev => [...prev, movie]);
    }
  };

  const removeFromWatchlist = async (movieId: number) => {
    const success = await WatchlistService.removeFromWatchlist(movieId);
    if (success) {
      setWatchlist(prev => prev.filter(m => m.id !== movieId));
    }
  };

  const toggleWatchlist = async (movie: Movie): Promise<boolean> => {
    const inList = isInWatchlist(movie.id);
    
    if (inList) {
      await removeFromWatchlist(movie.id);
      return false;
    } else {
      await addToWatchlist(movie);
      return true;
    }
  };

  const refreshWatchlist = async () => {
    await loadWatchlist();
  };

  const value: WatchlistContextType = {
    watchlist,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    refreshWatchlist,
    loading,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist(): WatchlistContextType {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}

