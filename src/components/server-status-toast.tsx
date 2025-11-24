"use client";
import { useBackendStatus } from "@/context/backend-status-context";
import { useEffect, useState } from "react";

export default function ServerStatusToast() {
  const { isReady, isChecking, isUnavailable } = useBackendStatus();
  const [visible, setVisible] = useState(false);

  // Only show if checking or unavailable, or briefly on success
  useEffect(() => {
    if (isChecking || isUnavailable) {
      setVisible(true);
    } else if (isReady) {
      // Hide after 3 seconds of being ready
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isChecking, isUnavailable, isReady]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full animate-slide-up">
      {/* 1. Waking Up State */}
      {isChecking && !isUnavailable && (
        <div className="bg-black text-white p-4 shadow-2xl border-l-4 border-yellow-500 flex items-center gap-4 rounded-sm">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0"></div>
          <div>
            <p className="font-bebas font-bold text-lg tracking-wide">
              WAKING UP SERVER
            </p>
            <p className="text-xs text-gray-300">
              This may take up to 50 seconds...
            </p>
          </div>
        </div>
      )}

      {/* 2. Unavailable State */}
      {isUnavailable && (
        <div className="bg-red-900 text-white p-4 shadow-2xl border-l-4 border-red-500 flex items-center gap-4 rounded-sm">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-bebas font-bold text-lg tracking-wide">
              SYSTEM OFFLINE
            </p>
            <p className="text-xs text-gray-300">
              Please try refreshing the page.
            </p>
          </div>
        </div>
      )}

      {/* 3. Ready State (Success) */}
      {isReady && !isChecking && (
        <div className="bg-green-900 text-white p-4 shadow-2xl border-l-4 border-green-500 flex items-center gap-4 rounded-sm">
          <span className="text-xl">✅</span>
          <div>
            <p className="font-bebas font-bold text-lg tracking-wide">
              CONNECTED
            </p>
            <p className="text-xs text-gray-300">
              Secure connection established.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}