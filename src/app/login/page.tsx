"use client";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { useBackendStatus } from "@/context/backend-status-context";

export default function LoginPage() {
  const { login, register, isLoading, error } = useAuth();
  const { isReady } = useBackendStatus(); // Checks if Render backend is awake
  
  // State to toggle between Login (true) and Sign Up (false)
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({ 
      firstname: "", 
      lastname: "", 
      email: "", 
      password: "" 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login Mode: Only send email/password
        await login({ 
            email: formData.email, 
            password: formData.password 
        });
      } else {
        // Sign Up Mode: Send all fields
        await register(formData);
      }
    } catch (err) {
      // Error is displayed via context's error state, but we catch here to prevent crash
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Optional: Clear errors when switching
  };

  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-center bg-white pt-[90px] px-4">
      <div className="w-full max-w-md p-8 flex flex-col gap-6">
        
        {/* Dynamic Title */}
        <h1 className="font-bebas text-5xl font-bold text-center">
          {isLogin ? "WELCOME BACK" : "CREATE ACCOUNT"}
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* First Name & Last Name - Only visible in Sign Up mode */}
          {/* We use CSS height/opacity transition for a smooth "Slide Down" effect */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isLogin ? 'max-h-0 opacity-0' : 'max-h-[100px] opacity-100'}`}>
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="First Name"
                    // Only required if we are signing up
                    required={!isLogin} 
                    className="w-1/2 h-[50px] border border-black p-4 focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-500"
                    value={formData.firstname}
                    onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    required={!isLogin}
                    className="w-1/2 h-[50px] border border-black p-4 focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-500"
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                />
            </div>
          </div>
          
          {/* Email & Password - Always visible */}
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full h-[50px] border border-black p-4 focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full h-[50px] border border-black p-4 focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          
          {/* Error Message */}
          {error && <p className="text-red-600 text-sm font-bold text-center animate-pulse">{error}</p>}
          
          {/* Server Wake-up Message */}
          {!isReady && (
             <p className="text-yellow-600 text-xs text-center animate-pulse">
                Connecting to secure server... (This may take a moment)
             </p>
          )}

          {/* Submit Button */}
          <div className="flex justify-center mt-2">
            <button 
                disabled={isLoading || !isReady}
                type="submit"
                className={`py-3 px-[30px] font-medium uppercase bg-black text-white border-2 border-black rounded-full w-full hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {isLoading 
                  ? (isLogin ? "Logging in..." : "Creating Account...") 
                  : (isLogin ? "Login" : "Sign Up")
                }
            </button>
          </div>
        </form>

        {/* Toggle Text at the bottom */}
        <div className="text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button onClick={toggleMode} className="underline font-bold text-black hover:text-gray-600 transition-colors">
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={toggleMode} className="underline font-bold text-black hover:text-gray-600 transition-colors">
                Login
              </button>
            </>
          )}
        </div>
        
      </div>
    </main>
  );
}