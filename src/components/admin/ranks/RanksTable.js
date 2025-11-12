"use client";

import { useState, useEffect } from "react";
import EditMaintenanceLevelModal from "./EditRankModal";
import { useTranslation } from "@/app/i18n";

export default function RanksTable({ ranks, onLevelUpdated }) {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const { t, i18n } = useTranslation("profile");
  const [mounted, setMounted] = useState(false);

  const handleRowClick = (level) => {
    setSelectedLevel(level);
  };

  const handleSave = (updated) => {
    setSelectedLevel(null);
    if (onLevelUpdated) onLevelUpdated(updated);
  };

    const translateRank = (rank) => {
      const key = `${rank}`; 
      const translated = t(key);

          return translated === key ? rank : translated;
    };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !i18n.isInitialized) return null;

  return (
    <div className="overflow-x-auto bg-gray-50 shadow-xl rounded-xl relative">
      <table className="min-w-full rounded-xl divide-y divide-gray-200">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold tracking-wide">
          <tr>
            <th className="px-6 py-4 text-left rounded-tl-xl">ID</th>
            <th className="px-6 py-4 text-left">Grado</th>
            <th className="px-6 py-4 text-left">Codice NATO</th>
            <th className="px-6 py-4 text-left">Distintivo</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {ranks.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-400">
                Nessun livello trovato
              </td>
            </tr>
          ) : (
            ranks.map((lvl, idx) => (
              <tr
                key={lvl.id}
                onClick={() => handleRowClick(lvl)}
                className={`transition-all duration-300 hover:bg-blue-50 cursor-pointer ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4">{lvl.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{translateRank(lvl.grado)} </td>
                <td className="px-6 py-4">{lvl.codice_nato}</td>
                <td className="px-6 py-4">
                  <img width="20px" height="20px" src={lvl.distintivo_controspallina} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedLevel && (
        <EditMaintenanceLevelModal
          rank={selectedLevel}
          onCancel={() => setSelectedLevel(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
