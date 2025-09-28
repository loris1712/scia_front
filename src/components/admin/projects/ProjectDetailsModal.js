"use client";

import { useState } from "react";
import { X } from "lucide-react";

const tabs = [
  { id: "overview", label: "Panoramica" },
  { id: "team", label: "Team" },
  { id: "dates", label: "Date" },
  { id: "status", label: "Stato" },
];

export default function ProjectDetailsModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[80vh] flex overflow-hidden relative">
        {/* Pulsante chiudi */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"
        >
          <X size={24} />
        </button>

        {/* Sidebar sinistra */}
        <div className="w-1/4 border-r bg-gray-50 p-4 flex flex-col gap-2">
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

        {/* Contenuto destro */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 text-gray-900">
        {activeTab === "overview" && (
            <div>
            <h2 className="text-2xl font-semibold mb-4 border-b border-[#ededed] pb-2 text-gray-800">Panoramica</h2>
            <p className="mb-2"><span className="font-medium text-gray-700">ID:</span> {project.id}</p>
            <p className="mb-2"><span className="font-medium text-gray-700">Nome:</span> {project.name}</p>
            <p className="mb-2"><span className="font-medium text-gray-700">Responsabile:</span> {project.manager}</p>
            </div>
        )}

        {activeTab === "team" && (
            <div>
            <h2 className="text-2xl font-semibold mb-4 border-b border-[#ededed] pb-2 text-gray-800">Team</h2>
            <p>Qui puoi mostrare i membri del team assegnati.</p>
            </div>
        )}

        {activeTab === "dates" && (
            <div>
            <h2 className="text-2xl font-semibold mb-4 border-b border-[#ededed] pb-2 text-gray-800">Date</h2>
            <p className="mb-2"><span className="font-medium text-gray-700">Inizio:</span> {project.startDate}</p>
            <p className="mb-2"><span className="font-medium text-gray-700">Fine:</span> {project.endDate}</p>
            </div>
        )}

        {activeTab === "status" && (
            <div>
            <h2 className="text-2xl font-semibold mb-4 border-b border-[#ededed] pb-2 text-gray-800">Stato</h2>
            <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                project.active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
            >
                {project.active ? "Attiva" : "Inattiva"}
            </span>
            </div>
        )}
        </div>

      </div>
    </div>
  );
}
