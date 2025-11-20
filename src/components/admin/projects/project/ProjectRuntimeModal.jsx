"use client";

import { useState } from "react";

export default function ProjectRuntimeModal({ item, onClose }) {
  const [activeTab, setActiveTab] = useState("details");

  if (!item) return null;

  const tabStyle = (tab) =>
    `px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200
     ${activeTab === tab 
        ? "bg-white border-t border-l border-r border-gray-200 text-blue-600" 
        : "text-gray-500 hover:text-gray-800"}`;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Dettaglio Manutenzione</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl leading-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="black" height="20px" width="20px" viewBox="0 0 640 640"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-5">
          <button onClick={() => setActiveTab("details")} className={tabStyle("details")}>
            Dettagli
          </button>

          {item.maintenance_list && (
            <button onClick={() => setActiveTab("maintenance")} className={tabStyle("maintenance")}>
              Maintenance List
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="space-y-6">

          {/* TAB 1: DETTAGLI GENERALI */}
          {activeTab === "details" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(item).map(([key, value]) => (
                key !== "maintenance_list" && (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/_/g, " ")}
                    </label>
                    <p className="mt-1 px-4 py-2 bg-gray-50 rounded-md text-gray-900 border border-gray-200">
                      {value !== null ? value.toString() : "—"}
                    </p>
                  </div>
                )
              ))}
            </div>
          )}

          {/* TAB 2: MAINTENANCE LIST */}
          {activeTab === "maintenance" && item.maintenance_list && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(item.maintenance_list).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/_/g, " ")}
                  </label>
                  <p className="mt-1 px-4 py-2 bg-gray-50 rounded-md text-gray-900 border border-gray-200">
                    {value !== null ? value.toString() : "—"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium transition hover:bg-blue-700"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}
