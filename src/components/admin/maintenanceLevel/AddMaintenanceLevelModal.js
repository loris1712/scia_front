"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { addMaintenanceLevel } from "@/api/admin/maintenanceLevel";

export default function AddMaintenanceLevelModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    Level_MIL_STD_1388: "",
    Level_MMI: "",
    Industry_Level: "",
    Description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const newLevel = await addMaintenanceLevel(form);
      onSave(newLevel);
      onClose();
    } catch (err) {
      console.error("Errore creazione livello:", err);
      alert("Errore durante la creazione del livello");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative text-gray-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Aggiungi Livello di Manutenzione
        </h2>

        <div className="space-y-4">
          {/* Livello MIL STD 1388 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Livello MIL STD 1388
            </label>
            <input
              type="text"
              value={form.Level_MIL_STD_1388}
              onChange={(e) =>
                setForm({ ...form, Level_MIL_STD_1388: e.target.value })
              }
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Livello MMI */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Livello MMI
            </label>
            <input
              type="text"
              value={form.Level_MMI}
              onChange={(e) =>
                setForm({ ...form, Level_MMI: e.target.value })
              }
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Livello Industria */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Livello Industria
            </label>
            <input
              type="text"
              value={form.Industry_Level}
              onChange={(e) =>
                setForm({ ...form, Industry_Level: e.target.value })
              }
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Descrizione */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descrizione
            </label>
            <textarea
              value={form.Description}
              onChange={(e) =>
                setForm({ ...form, Description: e.target.value })
              }
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-5 py-2 rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Salvataggio..." : "Aggiungi"}
          </button>
        </div>
      </div>
    </div>
  );
}
