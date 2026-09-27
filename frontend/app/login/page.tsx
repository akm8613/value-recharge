"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // THIS IS THE MAGIC LINE! 
        // We securely save the token to the browser automatically
        localStorage.setItem("token", data.token);
        
        // Redirect the user to the home page so they can recharge
        router.push("/");
      } else {
        setError(data.error || "Failed to login. Please check your credentials.");
      }
    } catch (err) {
      setError("A network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 relative"
      style={{ backgroundImage: "url('/Images/newbg2.webp')" }}
    >
      {/* Light Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-2xl rounded-[32px] border border-white/40 shadow-[0_25px_120px_rgba(0,0,0,0.18)] p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[#0F172A] mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to manage your recharges.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div className="relative flex items-center h-[60px] rounded-[20px] border border-[#DDE7F3] bg-white/70 px-5 transition-all focus-within:border-[#2563EB]">
            <Mail size={20} className="text-gray-400 mr-3" />
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-full w-full bg-transparent text-[#0F172A] outline-none placeholder:text-[#94A3B8] font-medium"
            />
          </div>

          {/* Password Input */}
          <div className="relative flex items-center h-[60px] rounded-[20px] border border-[#DDE7F3] bg-white/70 px-5 transition-all focus-within:border-[#2563EB]">
            <Lock size={20} className="text-gray-400 mr-3" />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-full w-full bg-transparent text-[#0F172A] outline-none placeholder:text-[#94A3B8] font-medium"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[60px] mt-4 rounded-[20px] bg-gradient-to-r from-[#0047CC] via-[#005EFF] to-[#3B82F6] flex items-center justify-center gap-2 text-white font-bold shadow-[0_15px_60px_rgba(37,99,235,0.35)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                Sign In <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
          Don't have an account? <Link href="/register" className="text-[#2563EB] font-bold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}