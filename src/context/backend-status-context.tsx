"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";

type BackendStatusContextType = {
  isReady: boolean; // True = Server is awake
  isChecking: boolean; // True = We are currently trying to wake it up
  isUnavailable: boolean; // True = We tried 3 times and failed (Server Down)
};

const BackendStatusContext = createContext<BackendStatusContextType | undefined>(
  undefined
);

// Configuration Constants
const RENDER_SLEEP_TIMEOUT = 14 * 60 * 1000; // 14 minutes (Render sleeps at 15)
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds between pings
const REQUEST_TIMEOUT = 90000; // 90 seconds max wait per request

export function BackendStatusProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isUnavailable, setIsUnavailable] = useState(false);

  // We use a ref to track the last successful ping time without causing re-renders
  const lastActiveTime = useRef<number | null>(null);

  useEffect(() => {
    const checkHealth = async (attempt = 1): Promise<boolean> => {
      try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        const res = await fetch(
          "https://klipsan-backend.onrender.com/api/v1/health",
          {
            cache: "no-store",
            signal: controller.signal, // Timeout support
          }
        );
        clearTimeout(id);

        if (res.ok) {
          setIsReady(true);
          setIsChecking(false);
          setIsUnavailable(false);
          lastActiveTime.current = Date.now();
          return true; // Success
        }
      } catch (error) {
        // Ignore error, just retry
      }

      // If failed...
      if (attempt < MAX_RETRIES) {
        // Wait 2 seconds and try again
        await new Promise((r) => setTimeout(r, RETRY_DELAY));
        return checkHealth(attempt + 1);
      } else {
        // Gave up after 3 attempts
        setIsChecking(false);
        setIsUnavailable(true);
        return false;
      }
    };

    // --- Main Logic Flow ---

    const runCheck = () => {
      const now = Date.now();
      
      // If we checked recently (less than 14 mins ago), assume it's still ready
      if (lastActiveTime.current && now - lastActiveTime.current < RENDER_SLEEP_TIMEOUT) {
        setIsReady(true);
        setIsChecking(false);
        return;
      }

      // Otherwise, it might be sleeping. Start the wake-up process.
      setIsReady(false);
      setIsChecking(true);
      checkHealth();
    };

    // 1. Run immediately on mount
    runCheck();

    // 2. Set up the 14-minute interval re-check
    const intervalId = setInterval(runCheck, RENDER_SLEEP_TIMEOUT);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <BackendStatusContext.Provider value={{ isReady, isChecking, isUnavailable }}>
      {children}
    </BackendStatusContext.Provider>
  );
}

export function useBackendStatus() {
  const context = useContext(BackendStatusContext);
  if (!context)
    throw new Error("useBackendStatus must be used within Provider");
  return context;
}