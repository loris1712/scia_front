"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n";

const StatusBadge = ({ dueDate, dueDays }) => {
  const { t, i18n } = useTranslation("maintenance");
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !i18n.isInitialized) return null;

  let bgColor = "bg-gray-400";
  let textColor = "text-white";
  let symbol = "+";

  if (dueDays < 0) {
    bgColor = "bg-[rgb(208,2,27)]";
    symbol = "+";
  } else if (dueDays <= 5) {
    bgColor = "bg-[rgb(244,114,22)]";
    symbol = "-";
  } else if (dueDays <= 15) {
    bgColor = "bg-[rgb(255,191,37)]"; 
    textColor = "text-black";
    symbol = "-";
  } else {
    bgColor = "bg-[rgb(45,182,71)]"; 
    symbol = "-";
  }

  const formattedDate =
    dueDate !== "N/A"
      ? new Date(dueDate).toLocaleDateString(i18n.language === "en" ? "en-GB" : "it-IT")
      : "N/A";

  return (
    <div className={`text-center sm:p-4`}>
      <div className="flex sm:hidden items-center justify-center gap-2 text-xs">
        <span
          className={`px-2 py-1 rounded-full ${bgColor} flex items-center gap-1 ${textColor}`}
        >
          {formattedDate}
        </span>
        <span className="opacity-60 text-white">
          {symbol} {Math.abs(dueDays)}
          {t("days_short")}
        </span>
      </div>

      <div className="hidden sm:block">
        <p className="text-xl">{formattedDate}</p>
        <p className="text-[16px] opacity-60">
          {symbol} {Math.abs(dueDays)}
          {t("days_short")}
        </p>
      </div>
    </div>
  );
};

export default StatusBadge;
