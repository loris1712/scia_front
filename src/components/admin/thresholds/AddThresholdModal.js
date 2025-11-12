"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { addRank } from "@/api/admin/ranks";

export default function AddRankModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    grado: "",
    distintivo_controspallina: "",
    codice_nato: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const newRank = await addRank(form);
      onSave(newRank);
      onClose();
    } catch (err) {
      console.error("Errore creazione grado:", err);
      alert("Errore durante la creazione del grado");
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
          Aggiungi Grado
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

          {/* Distintivo Controspallina */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Distintivo Controspallina (URL)
            </label>
            <input
              type="text"
              value={form.distintivo_controspallina}
              onChange={(e) =>
                setForm({
                  ...form,
                  distintivo_controspallina: e.target.value,
                })
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
              onChange={(e) => setForm({ ...form, codice_nato: e.target.value })}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
