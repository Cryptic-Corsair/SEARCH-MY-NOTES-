// LocalStorage utilities for persisting user preferences and history

const STORAGE_KEYS = {
  THEME_PREFERENCE: 'smn_theme_preference',
  RECENT_SEARCHES: 'smn_recent_searches',
  FAVORITE_COMBINATIONS: 'smn_favorites',
} as const;

export interface RecentSearch {
  topic: string;
  board: string;
  level: string;
  subject: string;
  timestamp: number;
}

export interface FavoriteCombination {
  id: string;
  board: string;
  level: string;
  subject: string;
  unit?: string;
  name: string;
  createdAt: number;
}

export const storageUtils = {
  // Theme persistence
  saveThemePreference: (themeIndex: number) => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME_PREFERENCE, themeIndex.toString());
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  },

  getThemePreference: (): number | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.THEME_PREFERENCE);
      return stored ? parseInt(stored, 10) : null;
    } catch (error) {
      console.warn('Failed to get theme preference:', error);
      return null;
    }
  },

  // Recent searches
  saveRecentSearch: (search: Omit<RecentSearch, 'timestamp'>) => {
    try {
      const recentSearches = getRecentSearches();
      const newSearch: RecentSearch = {
        ...search,
        timestamp: Date.now(),
      };
      
      // Avoid duplicates - remove if exists
      const filtered = recentSearches.filter(
        s => !(s.topic === search.topic && s.board === search.board && 
               s.level === search.level && s.subject === search.subject)
      );
      
      // Add new search at the beginning, keep max 10
      const updated = [newSearch, ...filtered].slice(0, 10);
      localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to save recent search:', error);
    }
  },

  getRecentSearches: (): RecentSearch[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Failed to get recent searches:', error);
      return [];
    }
  },

  clearRecentSearches: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);
    } catch (error) {
      console.warn('Failed to clear recent searches:', error);
    }
  },

  // Favorites
  saveFavorite: (favorite: Omit<FavoriteCombination, 'id' | 'createdAt'>) => {
    try {
      const favorites = getFavorites();
      const newFavorite: FavoriteCombination = {
        ...favorite,
        id: `${favorite.board}-${favorite.level}-${favorite.subject}-${Date.now()}`,
        createdAt: Date.now(),
      };
      
      const updated = [...favorites, newFavorite];
      localStorage.setItem(STORAGE_KEYS.FAVORITE_COMBINATIONS, JSON.stringify(updated));
      return newFavorite;
    } catch (error) {
      console.warn('Failed to save favorite:', error);
      return null;
    }
  },

  getFavorites: (): FavoriteCombination[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITE_COMBINATIONS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Failed to get favorites:', error);
      return [];
    }
  },

  removeFavorite: (id: string) => {
    try {
      const favorites = getFavorites();
      const filtered = favorites.filter(f => f.id !== id);
      localStorage.setItem(STORAGE_KEYS.FAVORITE_COMBINATIONS, JSON.stringify(filtered));
    } catch (error) {
      console.warn('Failed to remove favorite:', error);
    }
  },

  // Export/Import configuration
  exportConfiguration: () => {
    try {
      const config = {
        version: 1,
        exportedAt: new Date().toISOString(),
        themePreference: storageUtils.getThemePreference(),
        recentSearches: storageUtils.getRecentSearches(),
        favorites: storageUtils.getFavorites(),
      };
      return JSON.stringify(config, null, 2);
    } catch (error) {
      console.warn('Failed to export configuration:', error);
      return null;
    }
  },

  importConfiguration: (jsonString: string): boolean => {
    try {
      const config = JSON.parse(jsonString);
      if (config.version !== 1) {
        console.warn('Unsupported configuration version');
        return false;
      }
      
      if (config.themePreference !== null && config.themePreference !== undefined) {
        storageUtils.saveThemePreference(config.themePreference);
      }
      
      if (Array.isArray(config.recentSearches)) {
        localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(config.recentSearches));
      }
      
      if (Array.isArray(config.favorites)) {
        localStorage.setItem(STORAGE_KEYS.FAVORITE_COMBINATIONS, JSON.stringify(config.favorites));
      }
      
      return true;
    } catch (error) {
      console.warn('Failed to import configuration:', error);
      return false;
    }
  },
};

// Re-export individual functions for convenience
export const {
  saveThemePreference,
  getThemePreference,
  saveRecentSearch,
  getRecentSearches,
  clearRecentSearches,
  saveFavorite,
  getFavorites,
  removeFavorite,
  exportConfiguration,
  importConfiguration,
} = storageUtils;
