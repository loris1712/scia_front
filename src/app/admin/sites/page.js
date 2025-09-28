"use client";

import { useEffect, useState } from "react";
import { getSites } from "@/api/admin/sites";
import SitesTable from "@/components/admin/sites/SitesTable";
import SitesFilters from "@/components/admin/sites/SitesFilters";
import AddSiteButton from "@/components/admin/sites/AddSitesButton";
import AddSiteModal from "@/components/admin/sites/AddSitesModal";

export default function SitesPage() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", manager: "", status: "" });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const data = await getSites();
        setSites(data);
      } catch (err) {
        console.error("Errore nel fetch cantieri:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSites();
  }, []);

  // Applica filtri
  const filteredSites = sites.filter((s) =>
    s.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    (filters.manager === "" || s.manager === filters.manager) &&
    (filters.status === "" || (filters.status === "attivo" ? s.active : !s.active))
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Gestione Cantieri</h2>

      {/* Filtri */}
      <SitesFilters filters={filters} setFilters={setFilters} />

      {/* Tabella */}
      {loading ? (
        <p className="text-gray-500">Caricamento cantieri...</p>
      ) : (
        <SitesTable sites={filteredSites} />
      )}

      {/* Pulsante aggiungi */}
      <AddSiteButton onClick={() => setModalOpen(true)} />

      {modalOpen && <AddSiteModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
