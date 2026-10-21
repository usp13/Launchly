"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  type User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { getFirebaseAuth, googleProvider } from "@/lib/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface DbUser {
  id: string;
  firebaseUid: string;
  name: string;
  email: string;
  imageUrl: string;
  credits: number;
  plan: string;
}

interface AuthContextType {
  user: FirebaseUser | null;
  dbUser: DbUser | null;
  loading: boolean;
  isSignedIn: boolean;
  userId: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshDbUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  dbUser: null,
  loading: true,
  isSignedIn: false,
  userId: null,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  refreshDbUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const syncSession = useCallback(async (firebaseUser: FirebaseUser | null) => {
    if (!firebaseUser) {
      setUser(null);
      setDbUser(null);
      try {
        await fetch("/api/auth/session", { method: "DELETE" });
      } catch (err) {
        console.error("Error clearing session:", err);
      }
      return;
    }

    try {
      const token = await firebaseUser.getIdToken();
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(firebaseUser);
        setDbUser(data.user);
      }
    } catch (error) {
      console.error("Session sync failed:", error);
    }
  }, []);

  const refreshDbUser = useCallback(async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken(true);
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setDbUser(data.user);
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  }, [user]);

  useEffect(() => {
    try {
      const auth = getFirebaseAuth();
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        await syncSession(firebaseUser);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn("Firebase Auth initialization error:", err);
      setLoading(false);
    }
  }, [syncSession]);

  const signInWithGoogle = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        toast.error("Firebase config is missing. Please add Firebase keys to your .env file.");
        return;
      }
      const auth = getFirebaseAuth();
      const result = await signInWithPopup(auth, googleProvider);
      await syncSession(result.user);
      toast.success("Signed in successfully!");
      router.refresh();
    } catch (error: any) {
      console.error("Google sign in error:", error);
      if (error?.code === "auth/popup-closed-by-user") {
        return;
      }
      toast.error(error?.message || "Failed to sign in with Google.");
    }
  };

  const signOut = async () => {
    try {
      const auth = getFirebaseAuth();
      await firebaseSignOut(auth);
      await syncSession(null);
      toast.success("Signed out successfully");
      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        dbUser,
        loading,
        isSignedIn: !!user,
        userId: user?.uid ?? null,
        signInWithGoogle,
        signOut,
        refreshDbUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useUser() {
  const { user, dbUser, loading } = useContext(AuthContext);
  return {
    user: user
      ? {
          id: user.uid,
          firstName: user.displayName?.split(" ")[0] ?? user.displayName ?? "User",
          lastName: user.displayName?.split(" ").slice(1).join(" ") ?? "",
          fullName: user.displayName,
          emailAddresses: [{ emailAddress: user.email ?? "" }],
          imageUrl: user.photoURL ?? "",
        }
      : null,
    dbUser,
    isLoaded: !loading,
    isSignedIn: !!user,
  };
}
