import { useState, useEffect, useContext } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { AuthContext } from '../context/AuthContext';
import { FavoriteItem, addToFavorites, removeFromFavorites } from '../services/firebase/favorites';

export const useFavorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.uid) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const colRef = collection(db, 'users', user.uid, 'favorites');
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as FavoriteItem);
      setFavorites(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching favorites:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { favorites, loading };
};

export const useMutateFavorites = () => {
  const { user } = useContext(AuthContext);

  const mutateAddToFavorites = async (item: FavoriteItem) => {
    if (!user) return;
    await addToFavorites(user.uid, item);
  };

  const mutateRemoveFromFavorites = async (animeId: number) => {
    if (!user) return;
    await removeFromFavorites(user.uid, animeId);
  };

  return { mutateAddToFavorites, mutateRemoveFromFavorites };
};
