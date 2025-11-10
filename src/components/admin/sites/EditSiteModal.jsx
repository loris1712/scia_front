"use client";
import { useState, useEffect } from "react";
import { updateShipyard } from "@/api/admin/shipyards";

export default function EditSiteModal({ site, onSave, onCancel }) {
  const [editData, setEditData] = useState(site);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditData(site);
  }, [site]);

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const updated = await updateShipyard(editData.ID, {
        companyName: editData.companyName,
        address: editData.address,
        country: editData.country,
        OrganizationCompanyNCAGE_ID: editData.OrganizationCompanyNCAGE_ID,
      });
      onSave(updated);
    } catch (error) {
      console.error("Errore durante il salvataggio:", error);
      alert("Errore durante l'aggiornamento del cantiere");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Modifica Cantiere
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome Azienda
            </label>
            <input
              type="text"
              value={editData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Indirizzo
            </label>
            <input
              type="text"
              value={editData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Paese
            </label>
            <input
              type="text"
              value={editData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Annulla
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white transition ${
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
