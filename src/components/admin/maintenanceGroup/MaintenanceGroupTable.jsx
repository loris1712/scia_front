"use client";

import { useState } from "react";
import EditMaintenanceGroupModal from "./EditMaintenanceGroupModal";

export default function MaintenanceGroupTable({ groups, onGroupUpdated }) {
  const [selected, setSelected] = useState(null);

  const handleRowClick = (group) => setSelected(group);

  const handleSave = (updated) => {
    setSelected(null);
    if (onGroupUpdated) onGroupUpdated(updated);
  };

  return (
    <div className="overflow-x-auto bg-gray-50 shadow-xl rounded-xl relative">
      <table className="min-w-full rounded-xl divide-y divide-gray-200">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold tracking-wide">
          <tr>
            <th className="px-6 py-4 text-left rounded-tl-xl">ID</th>
            <th className="px-6 py-4 text-left">Nome Gruppo</th>
            <th className="px-6 py-4 text-left">Descrizione</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {groups.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-6 text-gray-400">
                Nessun gruppo di manutenzione trovato
              </td>
            </tr>
          ) : (
            groups.map((g, idx) => (
              <tr
                key={g.id}
                onClick={() => handleRowClick(g)}
                className={`transition-all duration-300 hover:bg-blue-50 cursor-pointer ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4">{g.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {g.name}
                </td>
                <td className="px-6 py-4">{g.description || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selected && (
        <EditMaintenanceGroupModal
          group={selected}
          onCancel={() => setSelected(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
