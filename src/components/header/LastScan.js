"use client";

import { useState } from "react";
import LastScanPopup from "./LastScanPopup";

export default function LastScan() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center p-3 rounded-lg w-full cursor-pointer" 
          onClick={() => setIsOpen(true)}> 
        <div>
          <p className="text-sm text-[#ffffff60]">Ultima scansione</p>
          <p className="text-xl font-semibold">Motore centrale</p>
          <p className="text-xs text-[#ffffff60]">
            2.1.4 Propulsione Diesel - S/N 19028393028A - Ore moto: 1200h
          </p>
        </div>
        <svg
          width="18px"
          height="18px"
          className="ml-auto"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </div>

      {isOpen && <LastScanPopup onClose={() => setIsOpen(false)} />}
    </>
  );
}
