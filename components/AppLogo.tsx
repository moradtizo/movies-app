import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { Colors } from '../constants/styles';
import { ThemedText } from './themed-text';

interface AppLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function AppLogo({ size = 'medium', showText = true }: AppLogoProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const sizeConfig = {
    small: {
      iconSize: 40,
      fontSize: 20,
      subtitleSize: 12,
    },
    medium: {
      iconSize: 80,
      fontSize: 32,
      subtitleSize: 16,
    },
    large: {
      iconSize: 120,
      fontSize: 48,
      subtitleSize: 20,
    },
  };

  const config = sizeConfig[size];

  return (
    <View style={styles.container}>
      {/* Logo Icon */}
      <View
        style={[
          styles.logoIcon,
          {
            width: config.iconSize,
            height: config.iconSize,
            backgroundColor: colors.primary,
          },
        ]}
      >
        <MaterialCommunityIcons
          name="movie-open"
          size={config.iconSize * 0.6}
          color="#FFFFFF"
        />
      </View>

      {/* App Name */}
      {showText && (
        <View style={styles.textContainer}>
          <ThemedText
            style={[
              styles.appName,
              {
                fontSize: config.fontSize,
                color: colors.text,
              },
            ]}
          >
            CineMax
          </ThemedText>
          <ThemedText
            style={[
              styles.tagline,
              {
                fontSize: config.subtitleSize,
                color: colors.textSecondary,
              },
            ]}
          >
            Your Movie Universe
          </ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconText: {
    textAlign: 'center',
  },
  textContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  appName: {
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  tagline: {
    marginTop: 4,
    fontStyle: 'italic',
  },
});

