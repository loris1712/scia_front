"use client";

import { useEffect, useState } from "react";
import { getRecurrencyTypes } from "@/api/admin/recurrencyType";
import RecurrencyTypeTable from "@/components/admin/recurrencyType/RecurrencyTypeTable";
import AddRecurrencyTypeButton from "@/components/admin/recurrencyType/AddRecurrencyTypeButton";
import AddRecurrencyTypeModal from "@/components/admin/recurrencyType/AddRecurrencyTypeModal";

export default function RecurrencyTypePage() {
  const [recurrencyTypes, setRecurrencyTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecurrencyTypes();
        setRecurrencyTypes(data);
      } catch (err) {
        console.error("Errore nel fetch dei tipi di ricorrenza:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = (updated) => {
    setModalOpen(false);

    if (!updated) return;

    if (updated.deletedId) {
      setRecurrencyTypes((prev) => prev.filter((r) => r.id !== updated.deletedId));
      return;
    }

    setRecurrencyTypes((prev) => {
      const exists = prev.find((r) => r.id === updated.id);
      if (exists) {
        return prev.map((r) => (r.id === updated.id ? updated : r));
      } else {
        return [...prev, updated];
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">
        Gestione Tipi di Ricorrenza
      </h2>

      {loading ? (
        <p className="text-gray-500">Caricamento tipi di ricorrenza...</p>
      ) : (
        <RecurrencyTypeTable
          recurrencyTypes={recurrencyTypes}
          onRecurrencyTypeUpdated={handleSave}
        />
      )}

      <AddRecurrencyTypeButton onClick={() => setModalOpen(true)} />

      {modalOpen && (
        <AddRecurrencyTypeModal
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
