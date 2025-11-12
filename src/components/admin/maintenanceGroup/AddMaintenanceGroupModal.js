"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { addMaintenanceGroup } from "@/api/admin/maintenanceGroup";

export default function AddMaintenanceGroupModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    group_name: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!form.group_name.trim()) {
      alert("Il nome del gruppo è obbligatorio");
      return;
    }

    try {
      setLoading(true);
      const newGroup = await addMaintenanceGroup(form);
      onSave(newGroup);
      onClose();
    } catch (err) {
      console.error("Errore creazione gruppo:", err);
      alert("Errore durante la creazione del gruppo di manutenzione");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative text-gray-900">
        {/* ❌ Bottone chiudi */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        {/* Titolo */}
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Aggiungi Gruppo di Manutenzione
        </h2>

        {/* Form */}
        <div className="space-y-4">
          {/* Nome gruppo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome Gruppo
            </label>
            <input
              type="text"
              value={form.group_name}
              onChange={(e) => setForm({ ...form, group_name: e.target.value })}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="Esempio: Gruppo Motori, Gruppo Elettrico..."
            />
          </div>
        </div>

        {/* Bottoni */}
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
