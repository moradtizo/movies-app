import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing } from '../constants/styles';
import { useWatchlist } from '../contexts/WatchlistContext';
import { Movie } from '../types/movie';
import { ThemedText } from './themed-text';

interface WatchlistButtonProps {
  movie: Movie;
  variant?: 'icon' | 'button';
  size?: 'small' | 'medium' | 'large';
}

export default function WatchlistButton({ 
  movie, 
  variant = 'icon',
  size = 'medium' 
}: WatchlistButtonProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const [inList, setInList] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInList(isInWatchlist(movie.id));
  }, [movie.id, isInWatchlist]);

  const handlePress = async () => {
    setLoading(true);
    const added = await toggleWatchlist(movie);
    setInList(added);
    setLoading(false);
  };

  const sizeConfig = {
    small: { iconSize: 20, padding: 6, fontSize: 12 },
    medium: { iconSize: 24, padding: 8, fontSize: 14 },
    large: { iconSize: 28, padding: 10, fontSize: 16 },
  };

  const config = sizeConfig[size];

  if (variant === 'icon') {
    return (
      <Pressable
        style={[
          styles.iconButton,
          {
            backgroundColor: inList ? colors.primary : colors.surface,
            borderColor: colors.primary,
            padding: config.padding,
          },
          Shadows.small,
        ]}
        onPress={handlePress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={inList ? '#fff' : colors.primary} />
        ) : (
          <Ionicons
            name={inList ? 'heart' : 'heart-outline'}
            size={config.iconSize}
            color={inList ? '#fff' : colors.primary}
          />
        )}
      </Pressable>
    );
  }

  // Button variant
  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: inList ? colors.primary : colors.surface,
          borderColor: colors.primary,
        },
        Shadows.medium,
      ]}
      onPress={handlePress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={inList ? '#fff' : colors.primary} />
      ) : (
        <>
          <Ionicons
            name={inList ? 'heart' : 'heart-outline'}
            size={20}
            color={inList ? '#fff' : colors.primary}
          />
          <ThemedText
            style={[
              styles.buttonText,
              {
                fontSize: config.fontSize,
                color: inList ? '#fff' : colors.primary,
              },
            ]}
          >
            {inList ? 'In Watchlist' : 'Add to Watchlist'}
          </ThemedText>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    gap: Spacing.sm,
  },
  buttonIcon: {
    fontSize: 20,
  },
  buttonText: {
    fontWeight: '600',
  },
});

