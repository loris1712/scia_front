"use client";
import { useState, useEffect } from "react";
import { updateProjectById, } from "@/api/admin/projects";
import { getShipyards } from "@/api/admin/shipyards";
import { getOwners } from "@/api/admin/owners";

export default function ProjectGeneralTab({
  projectId,
  editableProject,
  setEditableProject,
  project,
  setProject,
}) {
  const [saving, setSaving] = useState(false);
  const [shipyards, setShipyards] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shipyardsData, ownersData] = await Promise.all([getShipyards(), getOwners()]);
        setShipyards(shipyardsData);
        setOwners(ownersData);
      } catch (err) {
        console.error("Errore caricando liste:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setEditableProject((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateProjectById(projectId, editableProject);
      setProject(updated.project);
      alert("Dati salvati con successo!");
    } catch {
      alert("Errore durante il salvataggio");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Nome */}
      <div>
        <label className="text-gray-700 block mb-2 text-sm font-medium">
          Nome Commessa
        </label>
        <input
          type="text"
          value={editableProject.name || ""}
          placeholder="Inserisci nome commessa"
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-base"
        />
      </div>

      {/* Descrizione */}
      <div>
        <label className="text-gray-700 block mb-2 text-sm font-medium">Descrizione</label>
        <textarea
          rows="3"
          value={editableProject.description || ""}
          placeholder="Descrizione della commessa"
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-base"
        />
      </div>

      {/* Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-gray-700 block mb-2 text-sm font-medium">Data Ordine</label>
          <input
            type="date"
            value={editableProject.date_order?.slice(0, 10) || ""}
            onChange={(e) => handleChange("date_order", e.target.value)}
            className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-base"
          />
        </div>

        <div>
          <label className="text-gray-700 block mb-2 text-sm font-medium">Data Consegna</label>
          <input
            type="date"
            value={editableProject.date_delivery?.slice(0, 10) || ""}
            onChange={(e) => handleChange("date_delivery", e.target.value)}
            className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-base"
          />
        </div>
      </div>

      {/* Cliente / Owner */}
      <div>
        <label className="text-gray-700 block mb-2 text-sm font-medium">Cliente (Owner)</label>
        <select
          value={editableProject.owner_id || ""}
          onChange={(e) => handleChange("owner_id", e.target.value)}
          className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-base"
        >
          <option value="">Seleziona cliente...</option>
          {owners.map((owner) => (
            <option key={owner.ID} value={owner.ID}>
              {owner.companyName}
            </option>
          ))}
        </select>
      </div>

      {/* Cantiere */}
      <div>
        <label className="text-gray-700 block mb-2 text-sm font-medium">
          Cantiere Costruttore
        </label>
        <select
          value={editableProject.shipyard_builder_id || ""}
          onChange={(e) => handleChange("shipyard_builder_id", e.target.value)}
          className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-base"
        >
          <option value="">Seleziona cantiere...</option>
          {shipyards.map((yard) => (
            <option key={yard.ID} value={yard.ID}>
              {yard.companyName}
            </option>
          ))}
        </select>
      </div>

      {/* Pulsante Salva */}
      <div className="pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-all cursor-pointer ${
            saving
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/25"
          }`}
        >
          {saving ? "Salvataggio in corso..." : "Salva modifiche"}
        </button>
      </div>
    </div>
  );
}
