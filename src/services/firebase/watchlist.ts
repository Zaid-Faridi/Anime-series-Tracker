import { doc, setDoc, deleteDoc, getDoc, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';

export interface WatchlistItem {
  animeId: number;
  title: string;
  coverImage: string;
  episodesWatched: number;
  totalEpisodes: number | null;
  status: 'Watching' | 'Completed' | 'Plan to Watch' | 'On Hold' | 'Dropped';
  updatedAt: number;
}

export const addToWatchlist = async (uid: string, item: WatchlistItem) => {
  const docRef = doc(db, 'users', uid, 'watchlist', item.animeId.toString());
  await setDoc(docRef, item);
};

export const removeFromWatchlist = async (uid: string, animeId: number) => {
  const docRef = doc(db, 'users', uid, 'watchlist', animeId.toString());
  await deleteDoc(docRef);
};
