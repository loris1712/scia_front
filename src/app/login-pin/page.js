"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PINLoginPage() {
  const [pin, setPin] = useState("");
  const router = useRouter();
  const PIN_LENGTH = 4;

  const handleButtonClick = (value) => {
    if (value === "delete") {
      setPin(pin.slice(0, -1));
    } else if (pin.length < PIN_LENGTH) {
      setPin(pin + value);
    }
  };

  const handleLogin = () => {
    if (pin.length === PIN_LENGTH) {
      console.log("PIN entered:", pin);
      router.push("/dashboard"); 
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
            className={`w-24 h-14 flex items-center justify-center text-lg font-semibold rounded-lg 
                        ${value === "delete" ? "bg-[#022a52]" : "bg-[#022a52]"} 
                        hover:bg-blue-500 transition`}
            onClick={() => handleButtonClick(value)}
          >
            {value === "delete" ? "⌫" : value}
          </button>
        ))}
      </div>

      <button
        className="mt-6 text-sm text-white hover:underline"
        onClick={() => router.push("/login")}
      >
        Vai al login tradizionale
      </button>

      {pin.length === PIN_LENGTH && handleLogin()}
    </div>
  );
}
