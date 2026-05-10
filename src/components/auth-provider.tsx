"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

type UserRole = "user" | "seller";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "stepforward_user";
const AUTH_CHANGE_EVENT = "fashionhero-auth-change";
let cachedStorageValue: string | null | undefined;
let cachedUser: User | null = null;

const DEMO_ACCOUNTS: Record<string, User & { password: string }> = {
  "user@fashionhero.test": {
    email: "user@fashionhero.test",
    firstName: "Fashion",
    lastName: "Buyer",
    role: "user",
    password: "user123",
  },
  "seller@fashionhero.test": {
    email: "seller@fashionhero.test",
    firstName: "Seller",
    lastName: "Studio",
    role: "seller",
    password: "seller123",
  },
};

function normalizeUser(data: Partial<User> & { email: string }): User {
  return {
    email: data.email,
    firstName: data.firstName || data.email.split("@")[0],
    lastName: data.lastName || "",
    role: data.role === "seller" ? "seller" : "user",
  };
}

function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === cachedStorageValue) {
      return cachedUser;
    }

    cachedStorageValue = stored;

    if (!stored) {
      cachedUser = null;
      return cachedUser;
    }

    const parsed = JSON.parse(stored) as Partial<User> & { email?: string };
    if (!parsed.email) {
      cachedUser = null;
      return cachedUser;
    }

    cachedUser = normalizeUser({ ...parsed, email: parsed.email });
    return cachedUser;
  } catch {
    cachedStorageValue = null;
    cachedUser = null;
    return null;
  }
}

function saveUser(user: User) {
  cachedUser = user;
  cachedStorageValue = JSON.stringify(user);
  localStorage.setItem(STORAGE_KEY, cachedStorageValue);
  emitAuthChange();
}

function subscribeToAuthStore(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(AUTH_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(AUTH_CHANGE_EVENT, onStoreChange);
  };
}

function emitAuthChange() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useSyncExternalStore(subscribeToAuthStore, getStoredUser, () => null);

  const login = useCallback(async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const demoAccount = DEMO_ACCOUNTS[normalizedEmail];

    if (demoAccount && demoAccount.password !== password) {
      throw new Error("Invalid password for this demo account.");
    }

    const newUser: User = demoAccount
      ? {
          email: demoAccount.email,
          firstName: demoAccount.firstName,
          lastName: demoAccount.lastName,
          role: demoAccount.role,
        }
      : normalizeUser({ email: normalizedEmail });

    saveUser(newUser);
  }, []);

  const register = useCallback(async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    const newUser: User = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: "user",
    };
    saveUser(newUser);
  }, []);

  const logout = useCallback(() => {
    cachedUser = null;
    cachedStorageValue = null;
    localStorage.removeItem(STORAGE_KEY);
    emitAuthChange();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
