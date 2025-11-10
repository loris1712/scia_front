"use client";
import { useState, useEffect } from "react";
import { X, Plus, Save } from "lucide-react";
import { createOwners } from "@/api/admin/owners";
import { getOrganizations } from "@/api/admin/organizations";

export default function AddOwnersModal({ onClose, onAdded }) {
  const [newOwners, setNewOwners] = useState([
    {
      companyName: "",
      Organisation_name: "",
      address: "",
      country: "Italia",
      armedForces: "",
      OrganizationCompanyNCAGE_ID: "",
    },
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState([]);

  // 🔹 Recupera lista organizzazioni (NCAGE)
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

  const handleOwnerChange = (index, field, value) => {
    const updated = [...newOwners];
    updated[index][field] = value;
    setNewOwners(updated);
  };

  const addOwnerRow = () =>
    setNewOwners([
      ...newOwners,
      {
        companyName: "",
        Organisation_name: "",
        address: "",
        country: "Italia",
        armedForces: "",
        OrganizationCompanyNCAGE_ID: "",
      },
    ]);

  const removeOwnerRow = (index) =>
    setNewOwners(newOwners.filter((_, i) => i !== index));

  const submitOwners = async () => {
    try {
      setLoading(true);

      // Converte l’ID NCAGE in numero
      const ownersToCreate = newOwners.map((o) => ({
        ...o,
        OrganizationCompanyNCAGE_ID: o.OrganizationCompanyNCAGE_ID
          ? parseInt(o.OrganizationCompanyNCAGE_ID)
          : null,
      }));

      const created = await createOwners(ownersToCreate);

      // 🔁 aggiorna lista owners nella pagina principale
      if (onAdded) onAdded(created);

      // 🔄 ricarica la pagina (fallback nel caso non si aggiorni via stato)
      window.location.reload();

      onClose();
    } catch (err) {
      console.error("Errore creazione owners:", err);
      alert("Errore durante il salvataggio degli owners");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "px-4 py-2 rounded-xl bg-gray-50 text-gray-900 border border-gray-200 placeholder-gray-400 focus:outline-none transition";

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-3xl relative text-gray-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition cursor-pointer"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-semibold mb-6 text-gray-900">
          Aggiungi Nuovi Owners
        </h3>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {newOwners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition whitespace-nowrap cursor-pointer ${
                activeTab === idx
                  ? "bg-blue-100 text-blue-600 shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Owner {idx + 1}
            </button>
          ))}
        </div>

        {/* Form contenuto */}
        <div className="space-y-4 max-h-[55vh] overflow-y-auto">
          {newOwners.map((owner, idx) => (
            <div key={idx} className={activeTab === idx ? "block" : "hidden"}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome Azienda"
                  className={inputClass}
                  value={owner.companyName}
                  onChange={(e) =>
                    handleOwnerChange(idx, "companyName", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Organizzazione"
                  className={inputClass}
                  value={owner.Organisation_name}
                  onChange={(e) =>
                    handleOwnerChange(idx, "Organisation_name", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Indirizzo"
                  className={inputClass}
                  value={owner.address}
                  onChange={(e) =>
                    handleOwnerChange(idx, "address", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Paese"
                  className={inputClass}
                  value={owner.country}
                  onChange={(e) =>
                    handleOwnerChange(idx, "country", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Forze Armate (Sì/No)"
                  className={inputClass}
                  value={owner.armedForces}
                  onChange={(e) =>
                    handleOwnerChange(idx, "armedForces", e.target.value)
                  }
                />

                <select
                  className={inputClass}
                  value={owner.OrganizationCompanyNCAGE_ID}
                  onChange={(e) =>
                    handleOwnerChange(
                      idx,
                      "OrganizationCompanyNCAGE_ID",
                      e.target.value
                    )
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

              <button
                onClick={() => removeOwnerRow(idx)}
                className="mt-3 text-red-500 hover:text-red-600 font-medium transition flex items-center gap-1 cursor-pointer"
              >
                <X size={16} /> Rimuovi Owner
              </button>
            </div>
          ))}
        </div>

        {/* Azioni */}
        <div className="flex justify-between mt-6">
          <button
            onClick={addOwnerRow}
            className="flex items-center gap-2 px-5 py-3 bg-blue-200/30 hover:bg-blue-200 text-blue-600 font-semibold rounded-2xl cursor-pointer transition"
          >
            <Plus size={18} /> Aggiungi Owner
          </button>
          <button
            onClick={submitOwners}
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
