import { useState, useEffect, useContext } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { AuthContext } from '../context/AuthContext';
import { WatchlistItem, addToWatchlist, removeFromWatchlist } from '../services/firebase/watchlist';

export const useWatchlist = () => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.uid) {
      setWatchlist([]);
      setLoading(false);
      return;
    }

    const colRef = collection(db, 'users', user.uid, 'watchlist');
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as WatchlistItem);
      setWatchlist(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching watchlist:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { watchlist, loading };
};

export const useMutateWatchlist = () => {
  const { user } = useContext(AuthContext);

  const mutateAddToWatchlist = async (item: WatchlistItem) => {
    if (!user) return;
    await addToWatchlist(user.uid, item);
  };

  const mutateRemoveFromWatchlist = async (animeId: number) => {
    if (!user) return;
    await removeFromWatchlist(user.uid, animeId);
  };

  return { mutateAddToWatchlist, mutateRemoveFromWatchlist };
};
