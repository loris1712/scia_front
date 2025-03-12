"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Errore di autenticazione");

      setSuccess("Login effettuato!");
      localStorage.setItem("token", data.token);

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#001c38]">
      <div className="w-full max-w-md p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[#789fd6] block mb-1">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#1E2A3D] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="text-[#789fd6] block mb-1">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#1E2A3D] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="w-full text-center">
            <Link href="/forgot-password" className="text-white text-sm hover:underline">
              Hai dimenticato la password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full bg-[#789fd6] hover:bg-blue-500 text-white font-bold py-4 px-4 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? "Caricamento..." : "Accedi"}
          </button>
        </form>
      </div>
    </div>
  );
}
