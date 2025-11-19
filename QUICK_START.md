# 🚀 Quick Start Guide

## Overview

This is a modern React Native movie app built with Expo, featuring a beautiful UI, dark mode support, and integration with The Movie Database (TMDB) API.

## 🎯 Features

✅ Browse popular movies  
✅ View detailed movie information  
✅ Beautiful card-based UI  
✅ Dark/Light mode support  
✅ Smooth animations and transitions  
✅ Type-safe with TypeScript  
✅ Optimized performance with FlatList  

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- TMDB API Key

## 🔧 Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_MOVIE_KEY=your_tmdb_api_key_here
   EXPO_PUBLIC_MOVIE_API=https://api.themoviedb.org/3
   ```

   Get your API key from: https://www.themoviedb.org/settings/api

3. **Start the Development Server**
   ```bash
   npx expo start
   ```

4. **Run on Device/Simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## 📱 App Structure

### Main Screens

1. **Welcome Screen** (`screens/Welcome.tsx`)
   - Splash screen with auto-redirect
   - Shows for 2 seconds on app launch

2. **Home Screen** (`screens/HomeScreen.tsx`)
   - Displays popular movies in card layout
   - Uses FlatList for performance
   - Click any movie to view details

3. **Movie Details** (`app/movie.tsx`)
   - Full movie information
   - Genres, release date, runtime
   - Revenue and ratings
   - Movie overview

### Key Components

- **MovieCard** (`components/movie/MovieCard.tsx`)
  - Reusable card component
  - Shows poster, title, rating, overview
  - Pressable with navigation

- **Design System** (`constants/styles.ts`)
  - Centralized colors, spacing, fonts
  - Light and dark theme support

## 🎨 Customization

### Changing Colors

Edit `constants/styles.ts`:

```typescript
export const Colors = {
  light: {
    primary: '#0066CC',  // Change this
    // ... other colors
  },
  dark: {
    primary: '#4A9EFF',  // Change this
    // ... other colors
  },
};
```

### Adjusting Spacing

```typescript
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,   // Modify these values
  lg: 24,
  xl: 32,
  xxl: 40,
};
```

## 🔍 API Integration

### Fetching Movies

The app uses two main API calls:

1. **Get Popular Movies**
   ```typescript
   import { getMovies } from '../services/movies';
   
   const movies = await getMovies();
   ```

2. **Get Movie Details**
   ```typescript
   import { getMovieDetails } from '../services/movies';
   
   const movie = await getMovieDetails(movieId);
   ```

### Adding New API Calls

Add to `services/movies.ts`:

```typescript
export const getTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results as Movie[];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
```

## 🧩 Creating New Components

1. Create file in appropriate folder:
   - UI components → `components/ui/`
   - Movie components → `components/movie/`

2. Use design tokens:
   ```typescript
   import { Colors, Spacing, FontSizes } from '../constants/styles';
   ```

3. Support themes:
   ```typescript
   const colorScheme = useColorScheme();
   const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
   ```

## 📚 Documentation

- **PROJECT_STRUCTURE.md** - Detailed architecture overview
- **IMPROVEMENTS.md** - List of recent improvements
- **QUICK_START.md** - This file

## 🐛 Troubleshooting

### API Not Working
- Check your `.env` file exists
- Verify API key is correct
- Ensure `EXPO_PUBLIC_` prefix is used

### Images Not Loading
- Check internet connection
- Verify TMDB API is accessible
- Check poster_path is not null

### Dark Mode Issues
- Ensure using `ThemedText` and `ThemedView`
- Use `useColorScheme()` hook
- Apply theme-aware colors from design system

## 🚀 Building for Production

### iOS
```bash
npx expo build:ios
```

### Android
```bash
npx expo build:android
```

### Web
```bash
npx expo export:web
```

## 📝 Best Practices

1. **Always use design tokens** from `constants/styles.ts`
2. **Use ThemedText/ThemedView** for automatic theme support
3. **Keep components small** and focused
4. **Add TypeScript types** for all props
5. **Handle loading and error states**
6. **Test on both light and dark modes**

## 🎓 Learning Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [TMDB API Docs](https://developers.themoviedb.org/3)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

Feel free to enhance the app! Some ideas:
- Add search functionality
- Implement favorites
- Add more movie categories
- Create user reviews section
- Add movie trailers

---

**Happy Coding! 🎬**

