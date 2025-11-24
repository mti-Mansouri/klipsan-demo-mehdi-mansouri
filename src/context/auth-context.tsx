"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// Define the shape of a User (matches your Java JWT claims)
type User = {
  sub: string; // email
  role?: string;
  iat?: number;
  exp?: number;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Helper to parse JWT (without a library to keep it light)
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  // 1. Load from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("klipsan_token");
    if (storedToken) {
      const decodedUser = parseJwt(storedToken);
      // Check expiry
      if (decodedUser.exp * 1000 < Date.now()) {
        logout(); // Token expired
      } else {
        setToken(storedToken);
        setUser(decodedUser);
      }
    }
  }, []);

  // 2. Login Action
  const login = (newToken: string) => {
    localStorage.setItem("klipsan_token", newToken);
    setToken(newToken);
    setUser(parseJwt(newToken));
    router.push("/"); // Redirect home or dashboard
  };

  // 3. Logout Action
  const logout = () => {
    localStorage.removeItem("klipsan_token");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}