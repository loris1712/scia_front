"use client";

import { useState, useEffect } from "react";
import LastScanPopup from "./LastScanPopup";
import { useTranslation } from "@/app/i18n";

export default function LastScan() {
  const [isOpen, setIsOpen] = useState(false);

  const { t, i18n } = useTranslation("header");
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !i18n.isInitialized) return null;

  return (
    <>
      <div className="flex items-center rounded-lg w-full cursor-pointer" 
          onClick={() => setIsOpen(true)}> 
        <div>
          <p className="text-[11px] text-[#ffffff60]">{t("last_scan")}</p>
          <p className="text-xl font-semibold">Central engine</p>
          <p className="text-[11px] text-[#ffffff60]">
            2.1.4 Diesel propulsion - S/N 19028393028A - Engine hours: 1200h
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
