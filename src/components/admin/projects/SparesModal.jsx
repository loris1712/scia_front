"use client";

import { useState } from "react";
import { saveSpare, deleteSpare } from "@/api/admin/spares";

export default function SparesModal({ spare, projectId, userId, onClose, onSave }) {
  const [formData, setFormData] = useState(
    spare || {
      Serial_number: "",
      Part_name: "",
      quantity: "",
      location: "",
      Unitary_price: "",
      ean13: "",
      NSN: "",
    }
  );

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    try {
      setSaving(true);

      const payload = {
        ...formData,
        ship_id: projectId,
        user_id: userId,
      };

      const saved = await saveSpare(payload);
      onSave(saved);

    } catch (err) {
      console.error("❌ Errore salvataggio ricambio:", err);
      alert("Errore durante il salvataggio.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Vuoi eliminare definitivamente questo ricambio?")) return;

    try {
      setDeleting(true);
      await deleteSpare(spare.ID);
      onSave(null, "deleted");
      onClose();
    } catch (err) {
      console.error("❌ Errore eliminazione:", err);
      alert("Errore durante eliminazione.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl w-[95vw] max-w-[600px] shadow-2xl p-6 relative animate-fadeIn">

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer text-xl"
          >
            ✕
          </button>

          <h3 className="text-xl font-semibold mb-6">
            {spare ? "Modifica Ricambio" : "Nuovo Ricambio"}
          </h3>

          {/* --- FORM --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Nome Parte</label>
              <input
                value={formData.Part_name}
                onChange={(e) => handleChange("Part_name", e.target.value)}
                className="border w-full p-2 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Serial Number *</label>
              <input
                value={formData.Serial_number}
                onChange={(e) => handleChange("Serial_number", e.target.value)}
                className="border w-full p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Quantità</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                className="border w-full p-2 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Posizione</label>
              <input
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="border w-full p-2 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Prezzo €</label>
              <input
                value={formData.Unitary_price}
                onChange={(e) => handleChange("Unitary_price", e.target.value)}
                className="border w-full p-2 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-medium">EAN13</label>
              <input
                value={formData.ean13}
                onChange={(e) => handleChange("ean13", e.target.value)}
                className="border w-full p-2 rounded-md"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium">NSN</label>
              <input
                value={formData.NSN}
                onChange={(e) => handleChange("NSN", e.target.value)}
                className="border w-full p-2 rounded-md"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">

            {spare && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={deleting}
              >
                {deleting ? "Eliminazione..." : "Elimina"}
              </button>
            )}

            <div className="flex gap-3">
              <button
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                onClick={onClose}
              >
                Annulla
              </button>

              <button
                onClick={handleSubmit}
                className={`px-4 py-2 rounded-md text-white ${
                  saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={saving}
              >
                {saving ? "Salvataggio..." : "Salva"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
