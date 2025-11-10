"use client";
import { useState, useEffect } from "react";
import { X, Plus, Save } from "lucide-react";
import { createShipyards } from "@/api/admin/shipyards";
import { getOrganizations } from "@/api/admin/organizations"; // ✅ import API org

export default function AddSitesModal({ onClose, onAdded }) {
  const [newSites, setNewSites] = useState([
    { companyName: "", address: "", country: "Italia", OrganizationCompanyNCAGE_ID: "" },
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState([]); // ✅ elenco org

  // 🔹 Recupera la lista organizzazioni al caricamento
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations();
        setOrganizations(data);
      } catch (err) {
        console.error("Errore nel caricamento delle organizzazioni:", err);
      }
    };
    fetchOrganizations();
  }, []);

  const handleSiteChange = (index, field, value) => {
    const updated = [...newSites];
    updated[index][field] = value;
    setNewSites(updated);
  };

  const addSiteRow = () =>
    setNewSites([
      ...newSites,
      { companyName: "", address: "", country: "Italia", OrganizationCompanyNCAGE_ID: "" },
    ]);

  const removeSiteRow = (index) =>
    setNewSites(newSites.filter((_, i) => i !== index));

  const submitSites = async () => {
    try {
      setLoading(true);
      const created = await createShipyards(newSites);
      if (onAdded) onAdded(created);
      onClose();
    } catch (err) {
      console.error("Errore creazione cantieri:", err);
      alert("Errore durante il salvataggio dei cantieri");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "px-4 py-2 rounded-xl bg-gray-50 text-gray-900 border border-gray-200 placeholder-gray-400 focus:outline-none transition";

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-3xl relative text-gray-900">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition cursor-pointer"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-semibold mb-6 text-gray-900">
          Aggiungi Nuovi Cantieri
        </h3>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {newSites.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition whitespace-nowrap cursor-pointer ${
                activeTab === idx
                  ? "bg-blue-100 text-blue-600 shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Cantiere {idx + 1}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="space-y-4 max-h-[55vh] overflow-y-auto">
          {newSites.map((site, idx) => (
            <div key={idx} className={activeTab === idx ? "block" : "hidden"}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome Azienda"
                  className={inputClass}
                  value={site.companyName}
                  onChange={(e) =>
                    handleSiteChange(idx, "companyName", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Indirizzo"
                  className={inputClass}
                  value={site.address}
                  onChange={(e) =>
                    handleSiteChange(idx, "address", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Paese"
                  className={inputClass}
                  value={site.country}
                  onChange={(e) =>
                    handleSiteChange(idx, "country", e.target.value)
                  }
                />

                {/* 🔽 Dropdown Organization */}
                <select
                  className={inputClass}
                  value={site.OrganizationCompanyNCAGE_ID}
                  onChange={(e) =>
                    handleSiteChange(
                      idx,
                      "OrganizationCompanyNCAGE_ID",
                      e.target.value
                    )
                  }
                >
                  <option value="">Seleziona organizzazione NCAGE</option>
                  {organizations
                  .filter((org) => org.Organization_name && org.Organization_name.length > 0)
                  .map((org) => (
                    <option key={org.ID} value={org.ID}>
                      {org.Organization_name} ({org.NCAGE_Code})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => removeSiteRow(idx)}
                className="mt-3 text-red-500 hover:text-red-600 font-medium transition flex items-center gap-1 cursor-pointer"
              >
                <X size={16} /> Rimuovi Cantiere
              </button>
            </div>
          ))}
        </div>

        {/* Bottom action buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={addSiteRow}
            className="flex items-center gap-2 px-5 py-3 bg-blue-200/30 hover:bg-blue-200 text-blue-600 font-semibold rounded-2xl cursor-pointer transition"
          >
            <Plus size={18} /> Aggiungi Cantiere
          </button>
          <button
            onClick={submitSites}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold cursor-pointer transition ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-200/30 hover:bg-green-200 text-green-600"
            }`}
          >
            <Save size={18} /> {loading ? "Salvataggio..." : "Salva Tutti"}
          </button>
        </div>
      </div>
    </div>
  );
}
