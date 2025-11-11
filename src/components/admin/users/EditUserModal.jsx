"use client";

import { useState, useEffect } from "react";
import { updateUser } from "@/api/admin/users";

export default function EditUserModal({ user, onSave, onCancel }) {
  const [editData, setEditData] = useState(user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditData(user);
  }, [user]);

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const updated = await updateUser(editData.id, {
        first_name: editData.first_name,
        last_name: editData.last_name,
        email: editData.email,
        role: editData.role,
        active: editData.active,
      });
      onSave(updated);
      window.location.reload(); // 🔄 aggiorna la pagina
    } catch (error) {
      console.error("Errore aggiornamento utente:", error);
      alert("Errore durante il salvataggio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Modifica Utente</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              value={editData.first_name || ""}
              onChange={(e) => handleChange("first_name", e.target.value)}
              className="w-full mt-1 border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cognome</label>
            <input
              type="text"
              value={editData.last_name || ""}
              onChange={(e) => handleChange("last_name", e.target.value)}
              className="w-full mt-1 border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={editData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full mt-1 border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ruolo</label>
            <input
              type="text"
              value={editData.role || ""}
              onChange={(e) => handleChange("role", e.target.value)}
              className="w-full mt-1 border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Stato</label>
            <select
              value={editData.active ? "true" : "false"}
              onChange={(e) => handleChange("active", e.target.value === "true")}
              className="w-full mt-1 border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm"
            >
              <option value="true">Attivo</option>
              <option value="false">Disattivo</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 cursor-pointer rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Annulla
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 cursor-pointer rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Salvataggio..." : "Salva"}
          </button>
        </div>
      </div>
    </div>
  );
}
