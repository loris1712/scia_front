"use client";

import { useState, useEffect } from "react";
import { getScans } from "@/api/scan";
import ScanItem from "./ScanItem";
import { useTranslation } from "@/app/i18n";

export default function LastScanPopup({ onClose, shipId, userId }) {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScans() {
      try {
        const data = await getScans({ shipId, userId });
        setScans(data);
      } catch (error) {
        console.error("Errore nel recupero delle scans:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchScans();
  }, [shipId, userId]);

  const { t, i18n } = useTranslation("header");
  const [mounted, setMounted] = useState(false);
    
  useEffect(() => {
    setMounted(true);
  }, []);
    
  if (!mounted || !i18n.isInitialized) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000ab] bg-opacity-50 z-2">
      <div className="bg-[#022a52] w-full max-w-lg p-5 rounded-md shadow-lg sm:h-auto h-[100vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[26px] font-semibold">{t("last_scan")}</h2>
          <button className="text-white text-xl cursor-pointer" onClick={onClose}>
            <svg fill="white" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
          </button>
        </div>

        <input
          type="text"
          placeholder="Impianto"
          className="w-full p-2 bg-[#fff] text-[#000000b5] mb-4 rounded-md"
        />

        <div className="space-y-3">
          {loading ? (
            <p className="text-white">{t("loading")}</p>
          ) : scans.length > 0 ? (
            scans.map((scan, index) => <ScanItem key={index} scan={scan} />)
          ) : (
            <p className="text-[#ffffff60]">{t("no_scan_available")}</p>
          )}
        </div>

        <button
          className="w-full bg-[#789fd6] p-3 mt-4 text-white font-semibold cursor-pointer rounded-md"
          onClick={onClose}
        >
          {t("close")}
        </button>
      </div>
    </div>
  );
}
