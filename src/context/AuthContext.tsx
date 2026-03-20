import React, { createContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";

import {
  auth,
  getUserProfile,
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
} from "../services/firebase";

import { AuthContextType, AuthState } from "../types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch complete user profile from Firestore
        const profile = await getUserProfile(firebaseUser.uid);
        setState({
          user: profile,
          loading: false,
          error: null,
        });
      } else {
        setState({ user: null, loading: false, error: null });
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const user = await signInWithGoogle();
      if (!user) throw new Error("Google sign in failed");
    } catch (error) {
      console.error("Google login failed:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: (error as Error).message,
      }));
      throw error; // Propagate for page handling
    }
  };

  const loginWithEmail = async (
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      await signInWithEmail(email, password);
    } catch (error) {
      console.error("Email login failed:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: (error as Error).message,
      }));
    }
  };

  const signupWithEmail = async (
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      await signUpWithEmail(email, password);
    } catch (error) {
      console.error("Email signup failed:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: (error as Error).message,
      }));
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      await auth.signOut();
    } catch (error) {
      console.error("Logout failed:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: (error as Error).message,
      }));
    }
  };

  const value: AuthContextType = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    logout,
    isAuthenticated: !!state.user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
