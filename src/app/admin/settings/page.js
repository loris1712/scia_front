"use client";

import { useState } from "react";
import { X } from "lucide-react";

// Definizione tabs generici del back office
const tabs = [
  { id: "ships", label: "Navi" },
  { id: "users", label: "Utenti" },
  { id: "projects", label: "Commesse" },
  { id: "system", label: "Sistema" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("ships");

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Impostazioni Back Office</h2>

      <div className="flex h-[70vh] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        {/* Sidebar laterale */}
        <div className="w-1/4 bg-gray-50 border-r border-gray-200 p-4 flex flex-col gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition cursor-pointer ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenuto principale */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "ships" && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Configurazione Navi</h3>
              <p className="text-gray-700">Qui puoi modificare nome, codice, tipo, stato e note delle navi.</p>
              {/* Qui puoi inserire il componente ShipSettingsPage */}
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Gestione Utenti</h3>
              <p className="text-gray-700">Modifica ruoli, stato e informazioni degli utenti.</p>
              {/* Componente utenti */}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Gestione Commesse</h3>
              <p className="text-gray-700">Gestisci le commesse e i relativi progetti.</p>
              {/* Componente progetti */}
            </div>
          )}

          {activeTab === "system" && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Impostazioni Sistema</h3>
              <p className="text-gray-700">Configura parametri generali del back office.</p>
              {/* Impostazioni generali */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
