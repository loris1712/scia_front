"use client";

import { useEffect, useState } from "react";
import { getMaintenanceLevels } from "@/api/admin/maintenanceLevel";
import MaintenanceLevelTable from "@/components/admin/maintenanceLevel/MaintenanceLevelTable";
import AddMaintenanceLevelButton from "@/components/admin/maintenanceLevel/AddMaintenanceLevelButton";
import AddMaintenanceLevelModal from "@/components/admin/maintenanceLevel/AddMaintenanceLevelModal";

export default function MaintenanceLevelPage() {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const data = await getMaintenanceLevels();
        setLevels(data);
      } catch (err) {
        console.error("Errore nel fetch livelli manutenzione:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLevels();
  }, []);

  const handleSave = (updated) => {
    setModalOpen(false);

    // 👉 Caso eliminazione
    if (updated?.deletedId) {
      setLevels((prev) => prev.filter((l) => l.id !== updated.deletedId));
      return;
    }

    // 👉 Caso modifica o aggiunta
    setLevels((prev) => {
      const exists = prev.find((l) => l.id === updated.id);
      if (exists) {
        return prev.map((l) => (l.id === updated.id ? updated : l));
      } else {
        return [...prev, updated];
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">
        Gestione Livelli di Manutenzione
      </h2>

      {loading ? (
        <p className="text-gray-500">Caricamento livelli...</p>
      ) : (
        <MaintenanceLevelTable levels={levels} onLevelUpdated={handleSave} />
      )}

      <AddMaintenanceLevelButton onClick={() => setModalOpen(true)} />

      {modalOpen && (
        <AddMaintenanceLevelModal
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
