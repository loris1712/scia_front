"use client";

import { useEffect, useState } from "react";
import { getShips, updateShipSettings } from "@/api/admin/ships";

export default function ShipSettingsPage() {
  const [ships, setShips] = useState([]);
  const [selectedShipId, setSelectedShipId] = useState("");
  const [settings, setSettings] = useState({
    name: "",
    code: "",
    type: "",
    active: true,
    notes: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchShips = async () => {
      try {
        const data = await getShips();
        setShips(data);
      } catch (err) {
        console.error("Errore fetch navi:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShips();
  }, []);

  useEffect(() => {
    if (!selectedShipId) return;
    const ship = ships.find(s => s.id === selectedShipId);
    if (ship) {
      setSettings({
        name: ship.name,
        code: ship.unit_code,
        type: ship.type,
        active: ship.active,
        notes: ship.notes || ""
      });
    }
  }, [selectedShipId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateShipSettings(selectedShipId, settings);
      alert("Impostazioni salvate con successo!");
    } catch (err) {
      console.error(err);
      alert("Errore salvando impostazioni");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Impostazioni Navi</h2>

      {/* Selezione nave */}
      {loading ? (
        <p className="text-gray-600">Caricamento navi...</p>
      ) : (
        <select
          value={selectedShipId}
          onChange={(e) => setSelectedShipId(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl mb-6 w-1/3 bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Seleziona una nave</option>
          {ships.map((s) => (
            <option key={s.id} value={s.id}>
              {s.unit_code} - {s.name}
            </option>
          ))}
        </select>
      )}

      {/* Impostazioni nave */}
      {selectedShipId && (
        <div className="bg-gray-50 p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1 text-gray-700">Nome Nave</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1 text-gray-700">Codice Nave</label>
              <input
                type="text"
                value={settings.code}
                onChange={(e) => setSettings({ ...settings, code: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <label className="block font-medium mb-1 text-gray-700">Tipo</label>
              <select
                value={settings.type}
                onChange={(e) => setSettings({ ...settings, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Seleziona tipo</option>
                <option value="tipo1">Tipo 1</option>
                <option value="tipo2">Tipo 2</option>
                <option value="tipo3">Tipo 3</option>
              </select>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <input
                type="checkbox"
                checked={settings.active}
                onChange={(e) => setSettings({ ...settings, active: e.target.checked })}
                id="activeShip"
                className="h-5 w-5 text-blue-600"
              />
              <label htmlFor="activeShip" className="font-medium text-gray-700">Attiva</label>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">Note</label>
            <textarea
              value={settings.notes}
              onChange={(e) => setSettings({ ...settings, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              saving ? "bg-gray-300 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
            }`}
          >
            {saving ? "Salvando..." : "Salva Impostazioni"}
          </button>
        </div>
      )}
    </div>
  );
}
