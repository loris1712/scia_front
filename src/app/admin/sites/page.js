"use client";

import { useEffect, useState } from "react";
import SitesTable from "@/components/admin/sites/SitesTable";
import SitesFilters from "@/components/admin/sites/SitesFilters";
import AddSiteButton from "@/components/admin/sites/AddSitesButton";
import AddSiteModal from "@/components/admin/sites/AddSitesModal";
import { getShipyards } from "@/api/admin/shipyards";

export default function SitesPage() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ companyName: "" });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const data = await getShipyards();
        setSites(data);
      } catch (err) {
        console.error("Errore nel fetch cantieri:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSites();
  }, []);

  // Aggiorna localmente il cantiere modificato
  const handleUpdateSite = (updatedSite) => {
    setSites((prevSites) =>
      prevSites.map((s) => (s.ID === updatedSite.ID ? updatedSite : s))
    );
  };

  // Filtri
  const filteredSites = sites.filter((s) =>
    s.companyName.toLowerCase().includes(filters.companyName.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Gestione Cantieri</h2>

      {loading ? (
        <p className="text-gray-500">Caricamento cantieri...</p>
      ) : (
        <SitesTable sites={filteredSites} onUpdate={handleUpdateSite} />
      )}

      <AddSiteButton onClick={() => setModalOpen(true)} />
      {modalOpen && (
        <AddSiteModal
          onClose={() => setModalOpen(false)}
          onAdded={(newData) => setSites((prev) => [...prev, ...newData])}
        />
      )}
    </div>
  );
}
