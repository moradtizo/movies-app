# Project Structure

This document outlines the organization and architecture of the Movie App.

## 📁 Directory Structure

```
first-react-native/
├── app/                          # Expo Router screens
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── index.tsx            # Home tab (Popular Movies)
│   │   └── explore.tsx          # Explore tab
│   ├── _layout.tsx              # Root layout
│   ├── movie.tsx                # Movie details screen
│   └── modal.tsx                # Modal screen
│
├── components/                   # Reusable UI components
│   ├── movie/                   # Movie-specific components
│   │   └── MovieCard.tsx        # Card component for movie list
│   ├── ui/                      # Generic UI components
│   │   ├── collapsible.tsx
│   │   └── icon-symbol.tsx
│   ├── themed-text.tsx          # Text with theme support
│   ├── themed-view.tsx          # View with theme support
│   └── ...other components
│
├── constants/                    # App-wide constants
│   ├── styles.ts                # Design tokens (colors, spacing, etc.)
│   └── theme.ts                 # Theme configuration
│
├── hooks/                        # Custom React hooks
│   ├── use-color-scheme.ts
│   └── use-theme-color.ts
│
├── screens/                      # Screen components
│   ├── HomeScreen.tsx           # Home screen with movie list
│   └── Welcome.tsx              # Welcome/splash screen
│
├── services/                     # API and external services
│   ├── movies.ts                # Movie API calls (TMDB)
│   └── api.ts                   # Base API configuration
│
├── types/                        # TypeScript type definitions
│   └── movie.ts                 # Movie and Genre interfaces
│
└── assets/                       # Static assets (images, fonts)
```

## 🎨 Design System

### Constants (`constants/styles.ts`)

The app uses a centralized design system with:

- **Colors**: Light and dark theme color palettes
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl, xxl)
- **BorderRadius**: Standardized border radius values
- **FontSizes**: Typography scale
- **Shadows**: Pre-defined shadow styles for elevation

### Usage Example

```typescript
import { Colors, Spacing, FontSizes } from '../constants/styles';

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: FontSizes.xl,
  },
});
```

## 🧩 Component Architecture

### MovieCard Component

Reusable card component for displaying movie information:
- Poster image with fallback
- Rating badge overlay
- Title and release year
- Overview snippet
- Pressable with navigation

### Themed Components

- `ThemedText`: Automatically adapts text color to theme
- `ThemedView`: Automatically adapts background to theme

## 🔄 Data Flow

1. **API Layer** (`services/movies.ts`)
   - `getMovies()`: Fetches popular movies list
   - `getMovieDetails(id)`: Fetches detailed movie information

2. **Type Safety** (`types/movie.ts`)
   - `Movie` interface with all movie properties
   - `Genre` interface for genre data

3. **Screen Components** (`screens/`)
   - Fetch data using services
   - Pass data to presentational components

4. **UI Components** (`components/`)
   - Receive data via props
   - Handle user interactions
   - Navigate using Expo Router

## 🎯 Key Features

### Home Screen
- FlatList for optimized rendering
- MovieCard components for each item
- Pull-to-refresh capability
- Loading and error states

### Movie Details Screen
- Fetches complete movie data by ID
- Displays comprehensive information:
  - Genres
  - Release date
  - Runtime
  - Revenue
  - Ratings and vote count
- Formatted currency and dates
- Responsive to theme changes

## 🚀 Navigation

Using **Expo Router** (file-based routing):
- `/` → Welcome screen
- `/(tabs)` → Tab navigation
- `/(tabs)/index` → Home (Popular Movies)
- `/(tabs)/explore` → Explore tab
- `/movie?id={id}` → Movie details

## 🎨 Styling Best Practices

1. **Use design tokens** from `constants/styles.ts`
2. **Respect theme** using `useColorScheme()` hook
3. **Component-specific styles** in StyleSheet.create()
4. **Reusable components** for common patterns
5. **Consistent spacing** using Spacing constants

## 📱 Responsive Design

- Components adapt to light/dark mode
- Flexible layouts using Flexbox
- Optimized images with proper resizing
- Touch-friendly hit areas (minimum 44x44)

## 🔧 Development Guidelines

1. **New Components**: Place in appropriate folder under `components/`
2. **New Screens**: Add to `screens/` or `app/` depending on routing needs
3. **API Calls**: Add to `services/` with proper error handling
4. **Types**: Define in `types/` for type safety
5. **Styling**: Use design tokens from `constants/styles.ts`

