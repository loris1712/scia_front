"use client";

import { useEffect, useState } from "react";
import { getMaintenances } from "@/api/admin/maintenances";
import MaintenancesTable from "@/components/admin/maintenances/MaintenancesTable";
import MaintenancesFilters from "@/components/admin/maintenances/MaintenancesFilters";
import AddMaintenanceButton from "@/components/admin/maintenances/AddMaintenanceButton";
import AddMaintenanceModal from "@/components/admin/maintenances/AddMaintenanceModal";

export default function MaintenancesPage() {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ ship: "", type: "", status: "" });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        const data = await getMaintenances();
        setMaintenances(data);
      } catch (err) {
        console.error("Errore nel fetch manutenzioni:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaintenances();
  }, []);

  // Filtri
  const filteredMaintenances = maintenances.filter((m) =>
    (filters.ship === "" || m.shipName.toLowerCase().includes(filters.ship.toLowerCase())) &&
    (filters.type === "" || m.type === filters.type) &&
    (filters.status === "" || (filters.status === "attiva" ? m.active : !m.active))
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Manutenzioni Navi</h2>

      {/* Filtro */}
      <MaintenancesFilters filters={filters} setFilters={setFilters} />

      {/* Tabella */}
      {loading ? (
        <p className="text-gray-500">Caricamento manutenzioni...</p>
      ) : (
        <MaintenancesTable maintenances={filteredMaintenances} />
      )}

      {/* Pulsante aggiungi */}
      <AddMaintenanceButton onClick={() => setModalOpen(true)} />

      {modalOpen && <AddMaintenanceModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
