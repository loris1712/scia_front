"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PINLoginPage() {
  const [pin, setPin] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const PIN_LENGTH = 4;

  const handleButtonClick = (value) => {
    if (value === "delete") {
      setPin(pin.slice(0, -1));
    } else if (pin.length < PIN_LENGTH) {
      setPin(pin + value);
    }
  };

  useEffect(() => {
    setError(null); 
  }, []);

  useEffect(() => {
    if (pin.length === PIN_LENGTH && !isLoggingIn) {
      handleLogin();
    }
  }, [pin]);

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;
  //const BASE_URL = "http://52.59.162.108:4000";
  
  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
  
    try {
      const response = await fetch("/api/auth/login-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ pin }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Errore di login");
      }
  
      router.push("/dashboard");
    } catch (err) {
      console.error("Errore login PIN:", err);
      setError(err.message);
      setPin(""); 
    } finally {
      setIsLoggingIn(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#001c38] text-white">
      <h2 className="text-2xl font-semibold mb-6">Inserisci PIN</h2>

      <div className="flex gap-3 mb-12 mt-6">
        {Array.from({ length: PIN_LENGTH }).map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${
              index < pin.length ? "bg-white" : "border border-white opacity-50"
            }`}
          ></div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "delete"].map((value, index) => (
          <button
            key={index}
            className="w-24 h-14 flex items-center justify-center text-lg font-semibold rounded-lg bg-[#022a52] hover:bg-blue-500 transition"
            onClick={() => handleButtonClick(value)}
            disabled={isLoggingIn}
          >
            {value === "delete" ? "⌫" : value}
          </button>
        ))}
      </div>

      <button
        className="mt-4 text-sm text-white hover:underline"
        onClick={() => router.push("/login")}
        disabled={isLoggingIn}
      >
        Vai al login tradizionale
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
