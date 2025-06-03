"use client";

import { useState, useEffect } from "react";
import FacilitiesList from "./FacilitiesList";
import { useTranslation } from "@/app/i18n";

export default function ImpiantiTree() {
  const [search, setSearch] = useState("");

  const { t, i18n } = useTranslation("facilities");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !i18n.isInitialized) return null;

  return (
    <div>
      <h2 className="text-3xl text-white mb-4">{t("facilities")}</h2>
      <div className="p-4 bg-[#022a52] rounded-lg">
        <input
          type="text"
          placeholder={t("facilities_search")}
          className="w-full px-4 py-2 pr-10 bg-[#ffffff10] text-white rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FacilitiesList search={search} />
      </div>
    </div>
  );
}
