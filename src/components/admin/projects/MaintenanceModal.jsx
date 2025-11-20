"use client";

import { useState } from "react";
import { saveMaintenance, deleteMaintenance } from "@/api/admin/maintenances";

export default function MaintenanceModal({ maintenance, projectId, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState(
    maintenance || {
      name: "",
      description: "",
      frequency: "",
    }
  );

  const handleChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    try {
      setSaving(true);

      const payload = {
        ...formData,
        id_ship: projectId,
      };

      const saved = await saveMaintenance(payload);
      onSave(saved);

    } catch (err) {
      console.error("❌ Errore salvataggio manutenzione:", err);
      alert("Errore durante il salvataggio");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Vuoi eliminare definitivamente questa manutenzione?")) return;

    try {
      setDeleting(true);
      await deleteMaintenance(maintenance.id);
      onSave(null, "deleted");
      onClose();

    } catch (err) {
      console.error("❌ Errore eliminazione manutenzione:", err);
      alert("Errore durante eliminazione");
    } finally {
      setDeleting(false);
    }
  };

  const tabClass = (key) =>
    `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
      activeTab === key
        ? "border-blue-600 text-blue-600"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl w-[90vw] h-[90vh] shadow-2xl p-6 relative">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
          >
            ✕
          </button>

          <h3 className="text-lg font-semibold mb-4">
            {maintenance ? "Modifica Manutenzione" : "Nuova Manutenzione"}
          </h3>

          {/* Tabs */}
          <div className="border-b flex gap-4 mb-6">
            <div onClick={() => setActiveTab("general")} className={`${tabClass("general")} cursor-pointer`}>
              Generale
            </div>
            <div onClick={() => setActiveTab("spare")} className={`${tabClass("spare")} cursor-pointer`}>
              Ricambi
            </div>
            <div onClick={() => setActiveTab("tools")} className={`${tabClass("tools")} cursor-pointer`}>
              Strumenti
            </div>
            <div onClick={() => setActiveTab("consumables")} className={`${tabClass("consumables")} cursor-pointer`}>
              Consumabili
            </div>
          </div>

          {/* Content */}
          {activeTab === "general" && (
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Descrizione</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full border rounded-md p-2"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Frequenza</label>
                <input
                  type="text"
                  value={formData.frequency}
                  onChange={(e) => handleChange("frequency", e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between mt-6">

            {/* DELETE BUTTON ONLY IF EDITING */}
            {maintenance && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={deleting}
              >
                {deleting ? "Eliminazione..." : "Elimina"}
              </button>
            )}

            <div className="flex gap-3">
              <button
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
                onClick={onClose}
              >
                Annulla
              </button>
              <button
                onClick={handleSubmit}
                className={`px-4 py-2 text-white rounded-md ${
                  saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={saving}
              >
                {saving ? "Salvataggio..." : "Salva"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
