"use client";

import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { updateThreshold, deleteThreshold } from "@/api/admin/thresholds";

export default function EditRankModal({ rank, onCancel, onSave }) {
  const [form, setForm] = useState(rank);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const updated = await updateThreshold(rank.id, form);
      onSave(updated);
    } catch (err) {
      console.error("Errore aggiornamento grado:", err);
      alert("Errore durante l'aggiornamento del grado");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Sei sicuro di voler eliminare questo grado?")) return;
    try {
      setDeleting(true);
      await deleteThreshold(rank.id);
      alert("Grado eliminato con successo");
      onSave({ deletedId: rank.id });
      onCancel();
    } catch (err) {
      console.error("Errore eliminazione grado:", err);
      alert("Errore durante l'eliminazione del grado");
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
          Modifica Grado #{rank.id}
        </h2>

        <div className="space-y-4">
          {/* Grado */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grado
            </label>
            <input
              type="text"
              value={form.grado}
              onChange={(e) => setForm({ ...form, grado: e.target.value })}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Distintivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Distintivo Controspallina (URL)
            </label>
            <input
              type="text"
              value={form.distintivo_controspallina}
              onChange={(e) =>
                setForm({ ...form, distintivo_controspallina: e.target.value })
              }
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Codice NATO */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Codice NATO
            </label>
            <input
              type="text"
              value={form.codice_nato}
              onChange={(e) =>
                setForm({ ...form, codice_nato: e.target.value })
              }
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
            <Trash2 size={18} />
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
