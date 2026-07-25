import React, { createContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('@has_seen_onboarding');
        if (value === 'true') {
          setHasSeenOnboarding(true);
        }
      } catch (e) {
        console.error("Error reading onboarding state:", e);
      }
    };

    checkOnboarding();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('@has_seen_onboarding', 'true');
      setHasSeenOnboarding(true);
    } catch (e) {
      console.error("Error setting onboarding state:", e);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login Error: ", error);
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
        // After updating the profile, the auth state change will be triggered automatically or we can manually set it
        setUser({ ...userCredential.user, displayName: name });
      }
    } catch (error) {
      console.error("Signup Error: ", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, hasSeenOnboarding, completeOnboarding, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
