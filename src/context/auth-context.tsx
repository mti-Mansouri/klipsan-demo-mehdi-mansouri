"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";

type LoginData = { email: string; password: string };
type RegisterData = { firstname: string; lastname: string; email: string; password: string };

type User = {
  sub: string;
  exp: number;
};

type AuthResponse = {
  token: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("klipsan_token");
    if (storedToken) {
      const decodedUser = parseJwt(storedToken);
      if (decodedUser && decodedUser.exp * 1000 > Date.now()) {
        setToken(storedToken);
        setUser(decodedUser);
      } else {
        localStorage.removeItem("klipsan_token");
      }
    }
  }, []);

  const handleAuthSuccess = (newToken: string) => {
    localStorage.setItem("klipsan_token", newToken);
    setToken(newToken);
    setUser(parseJwt(newToken));
    router.push("/shop");
  };

  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiPost<AuthResponse, LoginData>("/auth/authenticate", data);
      handleAuthSuccess(response.token);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid email or password.";
      setError(message);
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiPost<AuthResponse, RegisterData>("/auth/register", data);
      handleAuthSuccess(response.token);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed.";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("klipsan_token");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, isAuthenticated: !!user, isLoading, error }}
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