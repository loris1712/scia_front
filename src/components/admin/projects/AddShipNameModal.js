"use client";
import { useState, useEffect } from "react";
import { X, Save, Plus } from "lucide-react";
import { getShipyards } from "@/api/admin/shipyards";
import { getUsers } from "@/api/admin/users";
import SelectShipModal from "./SelectShipModal"; // popup per aggiungere modello nave
import AddShipNameModal from "./AddShipNameModal"; // popup per aggiungere nome nave
import ESWBSModal from "./ESWBSModal"; // tuo componente già pronto

export default function AddProjectsModal({ onClose, onSave }) {
  const [activeTab, setActiveTab] = useState(0);

  const [shipyards, setShipyards] = useState([]);
  const [owners, setOwners] = useState([]);
  const [shipModels, setShipModels] = useState([]); // mock o fetch futuro

  const [showShipModelModal, setShowShipModelModal] = useState(false);
  const [showShipNameModal, setShowShipNameModal] = useState(false);

  const [projectData, setProjectData] = useState({
    general: { name: "", client: "", adminId: "" },
    ship: { modelId: "", shipName: "" },
    documents: { contractFiles: [], technicalDocs: [], mmi: [], other: [] },
    details: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shipyardData = await getShipyards();
        setShipyards(shipyardData);

        const usersData = await getUsers();
        setOwners(usersData.filter((u) => u.role === "Admin")); // ora amministratori
      } catch (err) {
        console.error("Errore nel fetch dropdown:", err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (section, field, value) => {
    setProjectData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSaveProjects = () => {
    onSave(projectData);
  };

  const inputClass =
    "px-4 py-2 rounded-xl bg-gray-50 text-gray-900 border border-gray-200 placeholder-gray-400 focus:outline-none transition w-full";
  const selectClass =
    "px-4 py-2 rounded-xl bg-gray-50 text-gray-900 border border-gray-200 focus:outline-none transition w-full";

  return (
    <>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-4xl relative text-gray-900">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition cursor-pointer"
          >
            <X size={24} />
          </button>

          <h3 className="text-xl font-semibold mb-6 text-gray-900">
            Aggiungi Nuova Commessa
          </h3>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {[
              "Informazioni generali",
              "Nave",
              "Documenti",
              "Dettagli progetto",
              "ESWBS",
            ].map((label, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-2 text-sm font-medium rounded-full transition whitespace-nowrap cursor-pointer ${
                  activeTab === idx
                    ? "bg-blue-100 text-blue-600 shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="space-y-4 max-h-[55vh] overflow-y-auto">
            {/* Tab 1: Informazioni generali */}
            {activeTab === 0 && (
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome Commessa"
                  className={inputClass}
                  value={projectData.general.name}
                  onChange={(e) =>
                    handleInputChange("general", "name", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Cliente"
                  className={inputClass}
                  value={projectData.general.client}
                  onChange={(e) =>
                    handleInputChange("general", "client", e.target.value)
                  }
                />
                <select
                  className={selectClass}
                  value={projectData.general.adminId}
                  onChange={(e) =>
                    handleInputChange("general", "adminId", e.target.value)
                  }
                >
                  <option value="">Seleziona Amministratore</option>
                  {owners.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.first_name} {o.last_name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Tab 2: Nave */}
            {activeTab === 1 && (
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="flex items-center gap-2">
                  <select
                    className={selectClass}
                    value={projectData.ship.modelId}
                    onChange={(e) =>
                      handleInputChange("ship", "modelId", e.target.value)
                    }
                  >
                    <option value="">Seleziona Modello Nave</option>
                    {shipModels.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowShipModelModal(true)}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Nome Nave"
                    className={inputClass}
                    value={projectData.ship.shipName}
                    onChange={(e) =>
                      handleInputChange("ship", "shipName", e.target.value)
                    }
                  />
                  <button
                    onClick={() => setShowShipNameModal(true)}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Documenti */}
            {activeTab === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">
                    Specifiche contrattuali
                  </label>
                  <input type="file" multiple className={inputClass} />
                </div>
                <div>
                  <label className="block font-medium mb-2">
                    Documentazione tecnica
                  </label>
                  <input type="file" multiple className={inputClass} />
                </div>
                <div>
                  <label className="block font-medium mb-2">MMI Specifics</label>
                  <input type="file" multiple className={inputClass} />
                </div>
                <div>
                  <label className="block font-medium mb-2">
                    Other documentation
                  </label>
                  <input type="file" multiple className={inputClass} />
                </div>
              </div>
            )}

            {/* Tab 4: Dettagli progetto */}
            {activeTab === 3 && (
              <div>
                <table className="w-full border border-gray-200 rounded-xl">
                  <thead className="bg-gray-100 text-sm">
                    <tr>
                      <th className="p-2">Acronimo</th>
                      <th className="p-2">Nome</th>
                      <th className="p-2">Cantiere Navale</th>
                      <th className="p-2">Cliente</th>
                      <th className="p-2">Codice Progetto</th>
                      <th className="p-2">Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.details.map((row, idx) => (
                      <tr key={idx} className="text-sm text-center">
                        <td className="p-2">{row.acronym}</td>
                        <td className="p-2">{row.name}</td>
                        <td className="p-2">{row.shipyard}</td>
                        <td className="p-2">{row.client}</td>
                        <td className="p-2">{row.code}</td>
                        <td className="p-2">
                          <button className="text-red-500 hover:underline">
                            Elimina
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="6" className="p-2 text-center">
                        <button className="text-blue-600 hover:underline">
                          + Aggiungi Riga
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 5: ESWBS */}
            {activeTab === 4 && (
              <div>
                <ESWBSModal />
              </div>
            )}
          </div>

          {/* Bottom action buttons */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSaveProjects}
              className="flex items-center gap-2 px-6 py-3 bg-green-200/30 hover:bg-green-200 text-green-600 font-semibold rounded-2xl cursor-pointer transition"
            >
              <Save size={18} /> Salva
            </button>
          </div>
        </div>
      </div>

      {/* Modali */}
      {showShipModelModal && (
        <SelectShipModal onClose={() => setShowShipModelModal(false)} />
      )}
      {showShipNameModal && (
        <AddShipNameModal onClose={() => setShowShipNameModal(false)} />
      )}
    </>
  );
}
