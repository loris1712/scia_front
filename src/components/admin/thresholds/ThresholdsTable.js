"use client";

import { useState } from "react";
import EditThresholdModal from "./EditThresholdModal";

export default function ThresholdsTable({ thresholds, onThresholdUpdated }) {
  const [selected, setSelected] = useState(null);

  const handleRowClick = (threshold) => setSelected(threshold);

  const handleSave = (updated) => {
    setSelected(null);
    if (onThresholdUpdated) onThresholdUpdated(updated);
  };

  return (
    <div className="overflow-x-auto bg-gray-50 shadow-xl rounded-xl relative">
      <table className="min-w-full rounded-xl divide-y divide-gray-200">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold tracking-wide">
          <tr>
            <th className="px-6 py-4 text-left rounded-tl-xl">ID</th>
            <th className="px-6 py-4 text-left">Nome</th>
            <th className="px-6 py-4 text-left">Valore</th>
            <th className="px-6 py-4 text-left">Tipo</th>
            <th className="px-6 py-4 text-left">Stato</th>
            <th className="px-6 py-4 text-left rounded-tr-xl">Descrizione</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {(!thresholds || thresholds.length === 0) ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-400">
                Nessuna soglia trovata
              </td>
            </tr>
          ) : (
            thresholds.map((t, idx) => (
              <tr
                key={t.id}
                onClick={() => handleRowClick(t)}
                className={`transition-all duration-300 hover:bg-blue-50 cursor-pointer ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4">{t.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{t.name}</td>
                <td className="px-6 py-4">{t.value ?? "-"}</td>
                <td className="px-6 py-4">{t.type || "-"}</td>
                <td className="px-6 py-4">
                  {t.active ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Attivo
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                      Inattivo
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">{t.description || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selected && (
        <EditThresholdModal
          threshold={selected}
          onCancel={() => setSelected(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
