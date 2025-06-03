"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { useTranslation } from "@/app/i18n";

export default function LegendModal({ isOpen, onClose }) {
  const { t, i18n } = useTranslation("maintenance");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !i18n.isInitialized) return null;

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
      <div className="bg-[#022a52] w-[50%] p-6 rounded-md shadow-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[22px] font-semibold">{t("legend_title")}</h2>
          <button className="text-white text-xl cursor-pointer" onClick={onClose}>
            <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          
          <div className="space-y-3">
            <LegendItem icon="/icons/Shape-2.png" label={t("items.time_deadline")} />
            <LegendItem icon="/icons/Shape-3.png" label={t("items.flight_hours_deadline")} />
            <LegendItem icon="/icons/Shape-4.png" label={t("items.blocking_job")} />
            <LegendItem icon="/icons/Path.png" label={t("items.planned_stop")} />
            <LegendItem icon="/icons/Shape-5.png" label={t("items.last_failed_outcome")} />
          </div>

          <div className="space-y-3">
            <LegendItem icon="/icons/Shape-9.png" label={t("items.spare_parts_requested")} />
            <LegendItem icon="/icons/Shape-8.png" label={t("items.spare_parts_available")} />
            <LegendItem icon="/icons/Shape-7.png" label={t("items.spare_parts_unavailable")} />
            <LegendItem icon="/icons/Shape-6.png" label={t("items.spare_parts_low")} />
          </div>
        </div>

        <button
          className="w-full bg-[#789fd6] p-3 mt-8 text-white font-semibold cursor-pointer"
          onClick={onClose}
        >
          {t("close_button")}
        </button>
      </div>
    </div>
  ) : null;
}

function LegendItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3">
      <Image src={icon} alt="icon" width={18} height={18} />
      <span>{label}</span>
    </div>
  );
}
