"use client";

import { useState, useEffect } from "react";
import MaintenanceModal from "./MaintenanceModal";
import { getMaintenancesModel } from "@/api/admin/maintenances";
import MaintenanceList from "./MaintenanceList";

export default function ProjectMaintenanceTab({ projectId, elementModelId }) {
  const [maintenances, setMaintenances] = useState([]);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [filteredMaintenances, setFilteredMaintenances] = useState([]);
  const [filterElementId, setFilterElementId] = useState(null);

  // 🔹 Ascolta il filtro proveniente dal tab ESWBS
  useEffect(() => {
    const handleFilter = (e) => {
      const elementId = e.detail;
      setFilterElementId(elementId);

      if (elementId) {
        const filtered = maintenances.filter(
          (m) => m.System_ElementModel_ID === parseInt(elementId)
        );
        setFilteredMaintenances(filtered);
      } else {
        setFilteredMaintenances(maintenances);
      }
    };

    window.addEventListener("filterMaintenanceByElement", handleFilter);
    return () => window.removeEventListener("filterMaintenanceByElement", handleFilter);
  }, [maintenances]);

  // 🔹 Carica manutenzioni già presenti
  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        const data = await getMaintenancesModel(projectId);
        setMaintenances(data);
        setFilteredMaintenances(data);
      } catch (err) {
        console.error("Errore nel caricamento manutenzioni:", err);
      }
    };
    fetchMaintenances();
  }, [projectId]);

  const handleAdd = () => {
    setSelectedMaintenance(null); // nuovo
    setModalOpen(true);
  };

  const handleEdit = (maintenance) => {
    setSelectedMaintenance(maintenance); // esistente
    setModalOpen(true);
  };

  const handleSave = (updated) => {
    setMaintenances((prev) => {
      const exists = prev.find((m) => m.id === updated.id);
      if (exists) {
        return prev.map((m) => (m.id === updated.id ? updated : m));
      }
      return [...prev, updated];
    });
    setFilteredMaintenances((prev) => {
      const exists = prev.find((m) => m.id === updated.id);
      if (exists) {
        return prev.map((m) => (m.id === updated.id ? updated : m));
      }
      return [...prev, updated];
    });
    setModalOpen(false);
  };

  const handleClearFilter = () => {
    setFilterElementId(null);
    setFilteredMaintenances(maintenances);
  };

  useEffect(() => {
    if (elementModelId) {
      setFilterElementId(elementModelId);

      const filtered = maintenances.filter(
        (m) => m.System_ElementModel_ID === parseInt(elementModelId)
      );

      setFilteredMaintenances(filtered);
    }
  }, [elementModelId, maintenances]);

  return (
    <div className="p-4 text-gray-600 text-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Manutenzioni</h2>

        <div className="flex items-center gap-3">
          {filterElementId && (
            <button
              onClick={handleClearFilter}
              className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200"
            >
              🔄 Mostra tutte
            </button>
          )}

          <button
            onClick={handleAdd}
            className="cursor-pointer px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            + Aggiungi manutenzione
          </button>
        </div>
      </div>

      {filterElementId && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg">
          Filtrate per elemento <b>ESWBS ID {filterElementId}</b> — Mostrate solo le manutenzioni collegate a questo elemento.
        </div>
      )}

      <MaintenanceList
        items={filteredMaintenances}
        onEdit={handleEdit}
      />

      {modalOpen && (
        <MaintenanceModal
          projectId={projectId}
          maintenance={selectedMaintenance}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

