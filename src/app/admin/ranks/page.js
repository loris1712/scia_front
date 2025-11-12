"use client";

import { useEffect, useState } from "react";
import RanksTable from "@/components/admin/ranks/RanksTable";
import AddRankButton from "@/components/admin/ranks/AddRankButton";
import AddRankModal from "@/components/admin/ranks/AddRankModal";
import { getRanks } from "@/api/profile";

export default function RanksPage() {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchRanks = async () => {
      try {
        const data = await getRanks();
        setRanks(data);
      } catch (err) {
        console.error("Errore nel fetch squadre:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRanks();
  }, []);

  const handleSave = (newRank) => {
    setRanks((prev) => [...prev, newRank]); // aggiunge il nuovo record alla lista
    setModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Gestione Ranghi</h2>

      {loading ? (
        <p className="text-gray-500">Caricamento ranghi...</p>
      ) : (
        <RanksTable ranks={ranks} />
      )}

      <AddRankButton onClick={() => setModalOpen(true)} />

      {modalOpen && (
        <AddRankModal
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
