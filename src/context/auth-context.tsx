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
  sub: string; // email from JWT
  exp: number; // expiry
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean; // For showing spinners
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  // Helper to decode JWT
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

  // 2. Login Logic
  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    try {
      
      const response = await apiPost("/auth/authenticate", data);
      
      
      const newToken = response.token;
      localStorage.setItem("klipsan_token", newToken);
      setToken(newToken);
      setUser(parseJwt(newToken));
      
      // Redirect
      router.push("/shop"); // Or back to checkout
    } catch (err: any) {
      setError("Invalid email or password.");
      console.error(err);
      throw err; // Re-throw so the UI can handle specific animations if needed
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Register Logic
  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call Java Backend
      const response = await apiPost("/auth/register", data);
      
      // Auto-login after register
      const newToken = response.token;
      localStorage.setItem("klipsan_token", newToken);
      setToken(newToken);
      setUser(parseJwt(newToken));
      
      router.push("/shop");
    } catch (err: any) {
      setError("Registration failed. Email might be taken.");
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
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading,
        error,
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