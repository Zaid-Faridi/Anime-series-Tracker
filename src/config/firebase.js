import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByknaSk7jxwvPCiBFchJwisIx-NO4ODyU",
  authDomain: "anime-tracker-2f9e6.firebaseapp.com",
  projectId: "anime-tracker-2f9e6",
  storageBucket: "anime-tracker-2f9e6.firebasestorage.app",
  messagingSenderId: "124021455184",
  appId: "1:124021455184:web:d4e90e637cb7e912a79455",
  measurementId: "G-09XQ3Q5LG2"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize analytics only if supported
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});
