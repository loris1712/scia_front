"use client";

import { useState } from "react";
import EditRecurrencyTypeModal from "./EditRecurrencyTypeModal";

export default function RecurrencyTypeTable({ recurrencyTypes, onRecurrencyTypeUpdated }) {
  const [selected, setSelected] = useState(null);

  const handleRowClick = (recurrency) => setSelected(recurrency);

  const handleSave = (updated) => {
    setSelected(null);
    if (onRecurrencyTypeUpdated) onRecurrencyTypeUpdated(updated);
  };

  return (
    <div className="overflow-x-auto bg-gray-50 shadow-xl rounded-xl relative">
      <table className="min-w-full rounded-xl divide-y divide-gray-200">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold tracking-wide">
          <tr>
            <th className="px-6 py-4 text-left rounded-tl-xl">ID</th>
            <th className="px-6 py-4 text-left">Nome</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {recurrencyTypes.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-6 text-gray-400">
                Nessun tipo di ricorrenza trovato
              </td>
            </tr>
          ) : (
            recurrencyTypes.map((r, idx) => (
              <tr
                key={r.id}
                onClick={() => handleRowClick(r)}
                className={`transition-all duration-300 hover:bg-blue-50 cursor-pointer ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4">{r.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{r.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selected && (
        <EditRecurrencyTypeModal
          recurrency={selected}
          onCancel={() => setSelected(null)}
          onSave={handleSave}
        />
      )}

    </div>
  );
}
