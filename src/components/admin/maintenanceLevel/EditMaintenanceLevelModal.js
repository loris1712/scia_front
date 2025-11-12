"use client";

import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { updateMaintenanceLevel, deleteMaintenanceLevel } from "@/api/admin/maintenanceLevel";

export default function EditMaintenanceLevelModal({ level, onCancel, onSave }) {
  const [form, setForm] = useState(level);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const updated = await updateMaintenanceLevel(level.id, form);
      onSave(updated);
    } catch (err) {
      console.error("Errore aggiornamento livello:", err);
      alert("Errore durante l'aggiornamento");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Sei sicuro di voler eliminare questo livello?")) return;
    try {
      setDeleting(true);
      await deleteMaintenanceLevel(level.id);
      alert("Livello eliminato con successo");
      onSave({ deletedId: level.id });
      onCancel(); // chiude il modal
    } catch (err) {
      console.error("Errore eliminazione livello:", err);
      alert("Errore durante l'eliminazione del livello");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative text-gray-900">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Modifica Livello #{level.id}
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
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition ${
              deleting
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {deleting ? "Eliminazione..." : "Elimina"}
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-5 py-2 rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Salvataggio..." : "Salva Modifiche"}
          </button>
        </div>
      </div>
    </div>
  );
}
