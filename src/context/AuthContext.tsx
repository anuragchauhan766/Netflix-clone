import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth, db } from "../services/firebase";

export interface AuthContextModel {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<{ error: string }>;
  signUp: (email: string, password: string) => Promise<{ error: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const getErrorMessage = (e: unknown): string => {
    switch (e.code) {
      case "auth/email-already-in-use":
        return "Email already in use. Please try another or login.";
      case "auth/wrong-password":
        return "Wrong password. Try again or click Forgot password to reset it.";
      case "auth/user-not-found":
        return "User not found. Try again or signUp now.";
      case "auth/weak-password":
        return "Password should be at least 6 characters";
      default:
        return e.code;
    }
  };

  const login = async (email: string, password: string) => {
    let error = "";
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      error = getErrorMessage(err);
    }
    setIsLoading(false);
    return {
      error
    };
  };

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    let error = "";
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", email), {
        savedShows: []
      });
    } catch (err) {
      error = getErrorMessage(err);
    }
    setIsLoading(false);
    return {
      error
    };
  };

  const logout = () => {
    return signOut(auth);
  };

  const authContextValue = useMemo<AuthContextModel>(() => {
    return {
      currentUser,
      login,
      logout,
      signUp,
      isLoading,
      setIsLoading
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, isLoading]);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  return useContext(AuthContext);
}
