import { useState } from 'react';
import { Clock, Star, Trash2, FolderOpen, Download, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecentSearches, useFavorites } from '@/hooks/use-storage';
import { exportConfiguration, importConfiguration } from '@/lib/storage';

interface HistoryPanelProps {
  onSelectSearch: (topic: string, board: string, level: string, subject: string) => void;
}

export const HistoryPanel = ({ onSelectSearch }: HistoryPanelProps) => {
  const { recentSearches, addRecentSearch, clearAll } = useRecentSearches();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [showExportImport, setShowExportImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [importMessage, setImportMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleExport = () => {
    const configJson = exportConfiguration();
    if (configJson) {
      const blob = new Blob([configJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `search-my-notes-config-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleImport = () => {
    if (!importText.trim()) {
      setImportMessage({ type: 'error', text: 'Please paste configuration JSON' });
      return;
    }

    const success = importConfiguration(importText);
    if (success) {
      setImportMessage({ type: 'success', text: 'Configuration imported successfully!' });
      setImportText('');
      // Reload page to apply imported settings
      setTimeout(() => window.location.reload(), 1500);
    } else {
      setImportMessage({ type: 'error', text: 'Invalid configuration format' });
    }
  };

  const addToFavorites = (search: typeof recentSearches[0]) => {
    if (search && !isFavorite(search.board, search.level, search.subject)) {
      addFavorite({
        board: search.board,
        level: search.level,
        subject: search.subject,
        name: `${search.subject} - ${search.topic}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Favorites Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Favorites
        </h3>
        {favorites.length === 0 ? (
          <p className="text-sm text-[var(--text)]/50 italic">No favorites saved yet</p>
        ) : (
          <div className="space-y-2">
            {favorites.map((fav) => (
              <motion.div
                key={fav.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 rounded-lg bg-[var(--secondary)]/30 border border-[var(--text)]/10 hover:border-[var(--primary)]/30 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{fav.name}</p>
                  <p className="text-xs text-[var(--text)]/50">
                    {fav.board} • {fav.level}
                  </p>
                </div>
                <button
                  onClick={() => removeFavorite(fav.id)}
                  className="p-2 text-[var(--text)]/40 hover:text-red-500 transition-colors"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Searches Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            Recent Searches
          </h3>
          {recentSearches.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-[var(--text)]/50 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Clear All
            </button>
          )}
        </div>
        {recentSearches.length === 0 ? (
          <p className="text-sm text-[var(--text)]/50 italic">No recent searches</p>
        ) : (
          <div className="space-y-2">
            {recentSearches.map((search, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 rounded-lg bg-[var(--secondary)]/30 border border-[var(--text)]/10 hover:border-[var(--primary)]/30 transition-all group"
              >
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => onSelectSearch(search.topic, search.board, search.level, search.subject)}
                >
                  <p className="text-sm font-medium truncate">{search.topic}</p>
                  <p className="text-xs text-[var(--text)]/50">
                    {search.subject} • {search.level} • {search.board}
                  </p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => addToFavorites(search)}
                    disabled={isFavorite(search.board, search.level, search.subject)}
                    className="p-1.5 text-[var(--text)]/40 hover:text-yellow-500 disabled:opacity-30 transition-colors"
                    title="Add to favorites"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Export/Import Section */}
      <div>
        <button
          onClick={() => setShowExportImport(!showExportImport)}
          className="w-full p-3 rounded-lg bg-[var(--secondary)]/30 border border-[var(--text)]/10 hover:border-[var(--primary)]/30 transition-all flex items-center justify-center gap-2"
        >
          <FolderOpen className="w-4 h-4" />
          <span className="text-sm font-medium">Export / Import Settings</span>
        </button>

        <AnimatePresence>
          {showExportImport && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3 space-y-3"
            >
              <div className="flex gap-2">
                <button
                  onClick={handleExport}
                  className="flex-1 p-2 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)]/30 text-[var(--primary)] hover:bg-[var(--primary)]/30 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button
                  onClick={handleImport}
                  className="flex-1 p-2 rounded-lg bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-[var(--accent)] hover:bg-[var(--accent)]/30 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Upload className="w-4 h-4" />
                  Import
                </button>
              </div>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste configuration JSON here..."
                className="w-full h-32 p-2 rounded-lg bg-[var(--bg)] border border-[var(--text)]/20 text-sm resize-none focus:border-[var(--primary)]/50 outline-none"
              />
              {importMessage && (
                <p className={`text-sm ${importMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                  {importMessage.text}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
