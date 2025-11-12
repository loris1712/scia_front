"use client";

import { useEffect, useState } from "react";
import { getMaintenanceGroups } from "@/api/admin/maintenanceGroup";
import MaintenanceGroupTable from "@/components/admin/maintenanceGroup/MaintenanceGroupTable";
import AddMaintenanceGroupButton from "@/components/admin/maintenanceGroup/AddMaintenanceGroupButton";
import AddMaintenanceGroupModal from "@/components/admin/maintenanceGroup/AddMaintenanceGroupModal";

export default function MaintenanceGroupPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "" });
  const [modalOpen, setModalOpen] = useState(false);

  // 🔹 Fetch iniziale
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getMaintenanceGroups();
        setGroups(data);
      } catch (err) {
        console.error("Errore nel fetch gruppi manutenzione:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  // 🔍 Filtro di ricerca (sul nome gruppo)
  const filteredGroups = groups.filter((g) =>
    g.group_name?.toLowerCase().includes(filters.search.toLowerCase())
  );

  // 💾 Salvataggio o aggiornamento dati
  const handleSave = (updated) => {
    setModalOpen(false);
    setGroups((prev) => {
      // caso eliminazione
      if (updated.deletedId) {
        return prev.filter((g) => g.id !== updated.deletedId);
      }

      // caso aggiornamento o aggiunta
      const exists = prev.find((g) => g.id === updated.id);
      if (exists) {
        return prev.map((g) => (g.id === updated.id ? updated : g));
      } else {
        return [...prev, updated];
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">
        Gestione Gruppi di Manutenzione
      </h2>

      {/* 🔍 Campo filtro ricerca */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cerca per nome gruppo..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 📋 Tabella gruppi */}
      {loading ? (
        <p className="text-gray-500">Caricamento gruppi...</p>
      ) : (
        <MaintenanceGroupTable
          groups={filteredGroups}
          onGroupUpdated={handleSave}
        />
      )}

      {/* ➕ Pulsante aggiungi */}
      <AddMaintenanceGroupButton onClick={() => setModalOpen(true)} />

      {/* 🪟 Modale aggiunta */}
      {modalOpen && (
        <AddMaintenanceGroupModal
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
