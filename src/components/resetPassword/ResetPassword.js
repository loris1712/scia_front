"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  //const BASE_URL = "http://localhost:4000/api/maintenance";
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

  //const BASE_URL = "http://52.59.162.108:4000/api/maintenance";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Password aggiornata con successo. Ora puoi effettuare il login.");
      } else {
        setError(data.error || "Errore durante il reset della password.");
      }
    } catch (err) {
      setError("Errore di connessione. Riprova più tardi.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#001c38]">
      <div className="w-full max-w-md p-8">
      <h2 className="text-2xl font-semibold text-white text-center mb-6">Reset password</h2>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>

          <label className="text-[#789fd6] block mb-2">Email</label>
            <input
              type="text"
              value={newPassword}
              placeholder="Email"
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#1E2A3D] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className={"mt-6 w-full bg-[#789fd6] hover:bg-blue-500 text-white font-bold py-4 px-4 transition duration-200 rounded-md"}
          >
            Reimposta password
          </button>
          
        </form>
      </div>
    </div>
  );
}
