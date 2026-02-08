import { create } from 'zustand';

export type WatchlistStatus = 'Watching' | 'Completed' | 'On Hold' | 'Dropped' | 'Plan to Watch';

interface WatchlistEntry {
    mal_id: number;
    title: string;
    image_url: string;
    status: WatchlistStatus;
    episodes_watched: number;
    total_episodes: number;
    score?: number;
}

interface WatchlistState {
    watchlist: WatchlistEntry[];
    addToWatchlist: (anime: any, status: WatchlistStatus) => void;
    updateProgress: (mal_id: number, episodes: number) => void;
    updateStatus: (mal_id: number, status: WatchlistStatus) => void;
    removeFromWatchlist: (mal_id: number) => void;
}

export const useWatchlistStore = create<WatchlistState>((set) => ({
    watchlist: [],
    addToWatchlist: (anime, status) => set((state) => {
        if (state.watchlist.some(item => item.mal_id === anime.mal_id)) return state;
        const entry: WatchlistEntry = {
            mal_id: anime.mal_id,
            title: anime.title,
            image_url: anime.images.jpg.image_url,
            status,
            episodes_watched: 0,
            total_episodes: anime.episodes || 0,
        };
        return { watchlist: [...state.watchlist, entry] };
    }),
    updateProgress: (mal_id, episodes) => set((state) => ({
        watchlist: state.watchlist.map(item =>
            item.mal_id === mal_id ? { ...item, episodes_watched: episodes } : item
        )
    })),
    updateStatus: (mal_id, status) => set((state) => ({
        watchlist: state.watchlist.map(item =>
            item.mal_id === mal_id ? { ...item, status } : item
        )
    })),
    removeFromWatchlist: (mal_id) => set((state) => ({
        watchlist: state.watchlist.filter(item => item.mal_id !== mal_id)
    })),
}));
