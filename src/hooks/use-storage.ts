import { useState, useEffect } from 'react';
import {
  getThemePreference,
  saveThemePreference,
  getRecentSearches,
  saveRecentSearch as saveRecentSearchToStorage,
  clearRecentSearches,
  getFavorites,
  saveFavorite as saveFavoriteToStorage,
  removeFavorite as removeFavoriteFromStorage,
  type RecentSearch,
  type FavoriteCombination,
} from '@/lib/storage';

/**
 * Hook to manage theme preference with localStorage persistence
 */
export const useThemePreference = (initialIndex: number) => {
  const [themeIndex, setThemeIndex] = useState(() => {
    const saved = getThemePreference();
    return saved !== null ? saved : initialIndex;
  });

  useEffect(() => {
    saveThemePreference(themeIndex);
  }, [themeIndex]);

  return [themeIndex, setThemeIndex] as const;
};

/**
 * Hook to manage recent searches with localStorage persistence
 */
export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    const searches = getRecentSearches();
    setRecentSearches(searches);
  }, []);

  const addRecentSearch = (search: Omit<RecentSearch, 'timestamp'>) => {
    saveRecentSearchToStorage(search);
    setRecentSearches(prev => {
      // Remove duplicate if exists
      const filtered = prev.filter(
        s => !(s.topic === search.topic && s.board === search.board && 
               s.level === search.level && s.subject === search.subject)
      );
      // Add new search at the beginning
      const newSearch: RecentSearch = { ...search, timestamp: Date.now() };
      return [newSearch, ...filtered].slice(0, 10);
    });
  };

  const clearAll = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  return { recentSearches, addRecentSearch, clearAll };
};

/**
 * Hook to manage favorite combinations with localStorage persistence
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteCombination[]>([]);

  useEffect(() => {
    const stored = getFavorites();
    setFavorites(stored);
  }, []);

  const addFavorite = (favorite: Omit<FavoriteCombination, 'id' | 'createdAt'>) => {
    const newFavorite = saveFavoriteToStorage(favorite);
    if (newFavorite) {
      setFavorites(prev => [...prev, newFavorite]);
    }
    return newFavorite;
  };

  const removeFavorite = (id: string) => {
    removeFavoriteFromStorage(id);
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  const isFavorite = (board: string, level: string, subject: string) => {
    return favorites.some(
      f => f.board === board && f.level === level && f.subject === subject
    );
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
