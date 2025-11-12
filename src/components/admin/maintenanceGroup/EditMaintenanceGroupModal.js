"use client";

import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import {
  updateMaintenanceGroup,
  deleteMaintenanceGroup,
} from "@/api/admin/maintenanceGroup";

export default function EditMaintenanceGroupModal({ group, onCancel, onSave }) {
  const [form, setForm] = useState(group);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // 🔹 Salvataggio modifiche
  const handleSave = async () => {
    if (!form.group_name.trim()) {
      alert("Il nome del gruppo è obbligatorio");
      return;
    }

    try {
      setLoading(true);
      const updated = await updateMaintenanceGroup(group.id, form);
      onSave(updated);
    } catch (err) {
      console.error("Errore aggiornamento gruppo:", err);
      alert("Errore durante l'aggiornamento del gruppo di manutenzione");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Eliminazione
  const handleDelete = async () => {
    if (!confirm("Sei sicuro di voler eliminare questo gruppo?")) return;
    try {
      setDeleting(true);
      await deleteMaintenanceGroup(group.id);
      alert("Gruppo eliminato con successo");
      onSave({ deletedId: group.id });
      onCancel();
    } catch (err) {
      console.error("Errore eliminazione gruppo:", err);
      alert("Errore durante l'eliminazione del gruppo di manutenzione");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative text-gray-900">
        {/* ❌ Chiudi */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        {/* Titolo */}
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Modifica Gruppo #{group.id}
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
              onChange={(e) =>
                setForm({ ...form, group_name: e.target.value })
              }
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="Esempio: Gruppo Elettrico, Gruppo Meccanico..."
            />
          </div>
        </div>

        {/* Azioni */}
        <div className="flex justify-between mt-6">
          {/* 🗑 Elimina */}
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition ${
              deleting
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            <Trash2 size={18} />
            {deleting ? "Eliminazione..." : "Elimina"}
          </button>

          {/* 💾 Salva */}
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
