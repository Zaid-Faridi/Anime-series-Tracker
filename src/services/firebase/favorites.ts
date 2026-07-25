import { doc, setDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';

export interface FavoriteItem {
  animeId: number;
  title: string;
  coverImage: string;
  addedAt: number;
}

export const addToFavorites = async (uid: string, item: FavoriteItem) => {
  const docRef = doc(db, 'users', uid, 'favorites', item.animeId.toString());
  await setDoc(docRef, item);
};

export const removeFromFavorites = async (uid: string, animeId: number) => {
  const docRef = doc(db, 'users', uid, 'favorites', animeId.toString());
  await deleteDoc(docRef);
};
