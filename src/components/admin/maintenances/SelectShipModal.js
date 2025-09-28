"use client";
import { useState, useEffect } from "react";
import { X, ArrowLeft, Save, Plus, MousePointer } from "lucide-react";
import {
  getShipModels,
  getShipsByModel,
  assignShipToProject,
  createShipModel,
  createShip
} from "@/api/admin/ships";

export default function SelectShipModal({ projectId, onClose }) {
  const [step, setStep] = useState(1);
  const [isNewModel, setIsNewModel] = useState(false);
  const [shipModels, setShipModels] = useState([]);
  const [ships, setShips] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedShip, setSelectedShip] = useState(null);

  const [newModelData, setNewModelData] = useState({
    model_code: "",
    name: "",
    description: "",
    type: "",
    internal_notes: ""
  });

  const [newShipData, setNewShipData] = useState({
    unit_name: "",
    unit_code: "",
    launch_date: "",
    delivery_date: "",
    notes: ""
  });

  // fetch modelli
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const models = await getShipModels();
        setShipModels(models);
      } catch (err) {
        console.error("Errore fetch modelli nave:", err);
      }
    };
    fetchModels();
  }, []);

  // fetch navi quando seleziono modello
  useEffect(() => {
    if (!selectedModel || isNewModel) return;
    const fetchShips = async () => {
      try {
        const shipsData = await getShipsByModel(selectedModel.id);
        setShips(shipsData);
      } catch (err) {
        console.error("Errore fetch navi:", err);
      }
    };
    fetchShips();
  }, [selectedModel, isNewModel]);

  const handleCreateModel = async () => {
    try {
      const model = await createShipModel(newModelData);
      setSelectedModel(model);
      setStep(3);
    } catch (err) {
      console.error(err);
      alert("Errore creando modello");
    }
  };

    const handleAssignShip = async () => {
        try {
            let shipId = selectedShip?.id;
            if (isNewModel) {
            const createdShip = await createShip(selectedModel.id, newShipData);
            shipId = createdShip.id;
            }
            if (!shipId) return alert("Seleziona una nave");
            await assignShipToProject(projectId, shipId);

            // Invece di chiudere subito:
            // onClose();
            // Notifica al parent di aprire il nuovo modal
            if (onShipAssigned) onShipAssigned(shipId); 

        } catch (err) {
            console.error(err);
            alert("Errore assegnando nave");
        }
    };


  // Stile
  const cardClass = "border rounded-xl p-4 hover:shadow-lg cursor-pointer transition flex flex-col justify-between bg-white";

  const stepIndicator = (
    <div className="flex items-center gap-4 mb-6 text-gray-600">
      {[1, 2, 3].map((s) => (
        <div key={s} className={`px-3 py-1 rounded-full font-medium ${step === s ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
          Step {s}
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-6xl relative text-gray-900">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition cursor-pointer">
          <X size={24} />
        </button>
        <h3 className="text-2xl font-semibold mb-4">Seleziona Modello e Nave</h3>
        {stepIndicator}

        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-1 text-blue-600 font-medium mb-4"
          >
            <ArrowLeft size={18} /> Indietro
          </button>
        )}

        {/* Step 1: Nuovo o Esistente */}
        {step === 1 && (
          <div className="flex gap-6 justify-center">
            <button
              onClick={() => { setIsNewModel(true); setStep(2); }}
              className="flex-1 border rounded-2xl p-6 text-center hover:shadow-lg transition bg-green-50 text-green-700 font-semibold cursor-pointer"
            >
              <Plus className="mx-auto mb-2" size={24} /> Nuovo Modello
            </button>
            <button
              onClick={() => { setIsNewModel(false); setStep(2); }}
              className="flex-1 border rounded-2xl p-6 text-center hover:shadow-lg transition bg-blue-50 text-blue-700 font-semibold cursor-pointer"
            >
              <MousePointer className="mx-auto mb-2" size={24} /> Modello Esistente
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && !isNewModel && (
          <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
            {shipModels.map((m) => (
              <div
                key={m.id}
                className={`${cardClass} ${selectedModel?.id === m.id ? "border-blue-500 bg-blue-50" : ""}`}
                onClick={() => setSelectedModel(m)}
              >
                <div className="font-semibold">{m.model_code} - {m.name}</div>
                <div className="text-sm text-gray-500">{m.description}</div>
                <div className="mt-2 text-gray-400 text-xs">Navi disponibili: {m.ships_count || 0}</div>
              </div>
            ))}
            {selectedModel && <button onClick={() => setStep(3)} className="col-span-3 bg-blue-600 text-white py-2 rounded-xl mt-2">Avanti</button>}
          </div>
        )}

        {step === 2 && isNewModel && (
  <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Colonna 1 */}
    <div className="space-y-4">
      <input
        className="w-full px-4 py-2 border rounded-xl"
        placeholder="Codice Modello"
        value={newModelData.model_code}
        onChange={(e) => setNewModelData({...newModelData, model_code: e.target.value})}
      />
      <input
        className="w-full px-4 py-2 border rounded-xl"
        placeholder="Nome Modello"
        value={newModelData.name}
        onChange={(e) => setNewModelData({...newModelData, name: e.target.value})}
      />
      <select
        className="w-full px-4 py-2 border rounded-xl"
        value={newModelData.type}
        onChange={(e) => setNewModelData({...newModelData, type: e.target.value})}
      >
        <option value="">Seleziona Tipologia Modello</option>
        <option value="tipo1">Tipo 1</option>
        <option value="tipo2">Tipo 2</option>
        <option value="tipo3">Tipo 3</option>
      </select>
    </div>

    {/* Colonna 2 */}
    <div className="space-y-4">
      <textarea
        className="w-full px-4 py-2 border rounded-xl"
        placeholder="Descrizione"
        value={newModelData.description}
        onChange={(e) => setNewModelData({...newModelData, description: e.target.value})}
      />
      <textarea
        className="w-full px-4 py-2 border rounded-xl"
        placeholder="Note interne"
        value={newModelData.internal_notes}
        onChange={(e) => setNewModelData({...newModelData, internal_notes: e.target.value})}
      />
      <div className="flex justify-end">
        <button
              onClick={handleCreateModel}
              className="flex items-center gap-2 px-6 py-3 bg-green-200/30 hover:bg-green-200 text-green-600 font-semibold rounded-2xl cursor-pointer transition"
            >
              Crea Modello e Avanti
            </button>
      </div>
      
    </div>
  </div>
)}


        {/* Step 3: Crea/Seleziona nave */}
        {step === 3 && (
         <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-2">{isNewModel ? "Crea Nave Specifica" : `Seleziona o crea nave per modello ${selectedModel?.name}`}</h4>

            {!isNewModel && ships.length > 0 && (
              <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto mb-4">
                {ships.map(s => (
                  <div
                    key={s.id}
                    className={`${cardClass} ${selectedShip?.id === s.id ? "border-green-500 bg-green-50" : ""}`}
                    onClick={() => setSelectedShip(s)}
                  >
                    <div className="font-semibold">{s.unit_name}</div>
                    <div className="text-sm text-gray-500">{s.unit_code}</div>
                    <div className="text-xs text-gray-400">Lancio: {s.launch_date}</div>
                    <div className="text-xs text-gray-400">Consegna: {s.delivery_date}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3">
              <input
                className="w-full px-4 py-2 border rounded-xl"
                placeholder="Nome Nave"
                value={newShipData.unit_name}
                onChange={(e) => setNewShipData({...newShipData, unit_name: e.target.value})}
              />
              <input
                className="w-full px-4 py-2 border rounded-xl"
                placeholder="Codice Nave"
                value={newShipData.unit_code}
                onChange={(e) => setNewShipData({...newShipData, unit_code: e.target.value})}
              />
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-xl"
                value={newShipData.launch_date}
                onChange={(e) => setNewShipData({...newShipData, launch_date: e.target.value})}
              />
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-xl"
                value={newShipData.delivery_date}
                onChange={(e) => setNewShipData({...newShipData, delivery_date: e.target.value})}
              />
              <textarea
                className="w-full px-4 py-2 border rounded-xl"
                placeholder="Note aggiuntive"
                value={newShipData.notes}
                onChange={(e) => setNewShipData({...newShipData, notes: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-2">{isNewModel ? "Crea Nave Specifica" : `Seleziona o crea nave per modello ${selectedModel?.name}`}</h4>

            {!isNewModel && ships.length > 0 && (
              <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto mb-4">
                {ships.map(s => (
                  <div
                    key={s.id}
                    className={`${cardClass} ${selectedShip?.id === s.id ? "border-green-500 bg-green-50" : ""}`}
                    onClick={() => setSelectedShip(s)}
                  >
                    <div className="font-semibold">{s.unit_name}</div>
                    <div className="text-sm text-gray-500">{s.unit_code}</div>
                    <div className="text-xs text-gray-400">Lancio: {s.launch_date}</div>
                    <div className="text-xs text-gray-400">Consegna: {s.delivery_date}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3">
              <input
                className="w-full px-4 py-2 border rounded-xl"
                placeholder="Nome Nave"
                value={newShipData.unit_name}
                onChange={(e) => setNewShipData({...newShipData, unit_name: e.target.value})}
              />
              <input
                className="w-full px-4 py-2 border rounded-xl"
                placeholder="Codice Nave"
                value={newShipData.unit_code}
                onChange={(e) => setNewShipData({...newShipData, unit_code: e.target.value})}
              />
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-xl"
                value={newShipData.launch_date}
                onChange={(e) => setNewShipData({...newShipData, launch_date: e.target.value})}
              />
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-xl"
                value={newShipData.delivery_date}
                onChange={(e) => setNewShipData({...newShipData, delivery_date: e.target.value})}
              />
              <textarea
                className="w-full px-4 py-2 border rounded-xl"
                placeholder="Note aggiuntive"
                value={newShipData.notes}
                onChange={(e) => setNewShipData({...newShipData, notes: e.target.value})}
              />
            </div>

            <div className="flex justify-end">
                <button
                onClick={handleAssignShip}
              className="flex items-center gap-2 px-6 py-3 bg-green-200/30 hover:bg-green-200 text-green-600 font-semibold rounded-2xl cursor-pointer transition"
                >
                <Save size={18} /> Salva e Assegna
                </button>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
