"use client";
import { useState, useEffect } from "react";
import { updateOwner } from "@/api/admin/owners";
import { getOrganizations } from "@/api/admin/organizations";

export default function EditOwnerModal({ owner, onSave, onCancel }) {
  const [editData, setEditData] = useState(owner);
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    setEditData(owner);
  }, [owner]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations();
        setOrganizations(data);
      } catch (err) {
        console.error("Errore nel caricamento organizzazioni:", err);
      }
    };
    fetchOrganizations();
  }, []);

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const updated = await updateOwner(editData.ID, {
        companyName: editData.companyName,
        Organisation_name: editData.Organisation_name,
        address: editData.address,
        country: editData.country,
        armedForces: editData.armedForces,
        OrganizationCompanyNCAGE_ID: editData.OrganizationCompanyNCAGE_ID
          ? parseInt(editData.OrganizationCompanyNCAGE_ID)
          : null,
      });
      onSave(updated);
      window.location.reload(); // 🔁 aggiorna la pagina dopo salvataggio
    } catch (error) {
      console.error("Errore durante l'aggiornamento dell'owner:", error);
      alert("Errore durante il salvataggio");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-blue-200 focus:outline-none";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Modifica Owner
        </h3>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nome Azienda"
            value={editData.companyName || ""}
            onChange={(e) => handleChange("companyName", e.target.value)}
            className={inputClass}
          />

          <input
            type="text"
            placeholder="Organizzazione"
            value={editData.Organisation_name || ""}
            onChange={(e) => handleChange("Organisation_name", e.target.value)}
            className={inputClass}
          />

          <input
            type="text"
            placeholder="Indirizzo"
            value={editData.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            className={inputClass}
          />

          <input
            type="text"
            placeholder="Paese"
            value={editData.country || ""}
            onChange={(e) => handleChange("country", e.target.value)}
            className={inputClass}
          />

          <input
            type="text"
            placeholder="Forze Armate (Sì/No)"
            value={editData.armedForces || ""}
            onChange={(e) => handleChange("armedForces", e.target.value)}
            className={inputClass}
          />

          <select
            className={inputClass}
            value={editData.OrganizationCompanyNCAGE_ID || ""}
            onChange={(e) =>
              handleChange("OrganizationCompanyNCAGE_ID", e.target.value)
            }
          >
            <option value="">Seleziona azienda NCAGE...</option>
            {organizations
              .filter((org) => org.Organization_name?.length > 0)
              .map((org) => (
                <option key={org.ID} value={org.ID}>
                  {org.Organization_name} ({org.NCAGE_Code})
                </option>
              ))}
          </select>
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
