import { useState } from "react";
import { saveMaintenance } from "@/api/admin/maintenances";

export default function MaintenanceModal({ maintenance, projectId, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState(
    maintenance || {
      title: "",
      description: "",
      frequency: "",
      spareParts: [],
      tools: [],
      consumables: [],
    }
  );
  const [saving, setSaving] = useState(false);

  const handleChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    try {
      setSaving(true);
      const payload = { ...formData, projectId };
      const saved = await saveMaintenance(payload);
      onSave(saved);
    } catch (err) {
      console.error("Errore salvataggio manutenzione:", err);
      alert("Errore durante il salvataggio");
    } finally {
      setSaving(false);
    }
  };

  const tabClass = (key) =>
    `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
      activeTab === key
        ? "border-blue-600 text-blue-600"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`;

  return (
    <>
      {/* Overlay semi-trasparente */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      ></div>

      {/* Contenitore principale del modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl w-[700px] shadow-2xl p-6 relative">
          {/* Pulsante chiusura */}
          <div
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer text-lg"
          >
            ✕
          </div>

          <h3 className="text-lg font-semibold mb-4">
            {maintenance ? "Modifica Manutenzione" : "Nuova Manutenzione"}
          </h3>

          {/* Tabs nativi */}
          <div className="border-b border-gray-200 mb-6 flex gap-4">
            <div onClick={() => setActiveTab("general")} className={`${tabClass("general")} cursor-pointer`}>
              General
            </div>
            <div onClick={() => setActiveTab("spare")} className={`${tabClass("spare")} cursor-pointer`}>
              Spare
            </div>
            <div onClick={() => setActiveTab("tools")} className={`${tabClass("tools")} cursor-pointer`}>
              Tools
            </div>
            <div onClick={() => setActiveTab("consumables")} className={`${tabClass("consumables")} cursor-pointer`}>
              Consumables
            </div>
          </div>

          {/* Contenuto tab */}
          <div className="min-h-[220px]">
            {activeTab === "general" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Titolo</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descrizione</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="w-full border rounded-md p-2"
                    rows={3}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Frequenza</label>
                  <input
                    type="text"
                    value={formData?.recurrency_type?.name}
                    onChange={(e) => handleChange("frequency", e.target.value)}
                    className="w-full border rounded-md p-2"
                  />
                </div>
              </div>
            )}

            {activeTab === "spare" && (
              <div>
                <p className="text-gray-500 mb-3">
                  Gestisci qui le parti di ricambio.
                </p>
                {/* TODO: gestione spareParts */}
              </div>
            )}

            {activeTab === "tools" && (
              <div>
                <p className="text-gray-500 mb-3">
                  Gestisci qui gli strumenti necessari.
                </p>
                {/* TODO: gestione tools */}
              </div>
            )}

            {activeTab === "consumables" && (
              <div>
                <p className="text-gray-500 mb-3">
                  Gestisci qui i materiali di consumo.
                </p>
                {/* TODO: gestione consumables */}
              </div>
            )}
          </div>

          {/* Footer con pulsanti */}
          <div className="flex justify-end mt-6 gap-3">
            <div
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Annulla
            </div>
            <div
              onClick={handleSubmit}
              className={`px-4 py-2 rounded-md text-white cursor-pointer ${
                saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {saving ? "Salvataggio..." : "Salva"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
