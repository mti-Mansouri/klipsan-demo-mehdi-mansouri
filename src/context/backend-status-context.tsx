"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type BackendStatusContextType = {
  isReady: boolean;
  wakeUpBackend: () => Promise<void>;
};

const BackendStatusContext = createContext<BackendStatusContextType | undefined>(undefined);

export function BackendStatusProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  const wakeUpBackend = async () => {
    if (isReady) return;
    
    try {
      
      const res = await fetch("https://klipsan-backend.onrender.com/api/v1/health");
      if (res.ok) {
        setIsReady(true);
        console.log("Backend is awake!");
      }
    } catch (error) {
      console.log("Backend is sleeping...");
    }
  };

  // Auto-wake on mount
  useEffect(() => {
    wakeUpBackend();
  }, []);

  return (
    <BackendStatusContext.Provider value={{ isReady, wakeUpBackend }}>
      {children}
    </BackendStatusContext.Provider>
  );
}

export function useBackendStatus() {
  const context = useContext(BackendStatusContext);
  if (!context) throw new Error("useBackendStatus must be used within Provider");
  return context;
}