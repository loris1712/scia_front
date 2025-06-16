"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/header/DashboardHeader";
import { getLogs } from "@/api/profile";

export default function SparePage() {
  const [logs, setLogs] = useState([]);
  const [logType, setLogType] = useState('combined');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getLogs(logType)
      .then((data) => {
        setLogs(data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Errore nel caricamento dei log');
        setIsLoading(false);
      });
  }, [logType]);

  const getLevelStyle = (level) => {
    switch (level) {
      case "error":
        return "text-red-600 font-bold";
      case "warn":
        return "text-yellow-600 font-semibold";
      case "info":
        return "text-blue-600 font-medium";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#001c38] text-white p-4">
      <DashboardHeader />

      <div className="flex space-x-4 mb-8 mt-8">
        <button
          className={`px-4 py-2 text-[14px] rounded-full ${
            logType === "combined" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600"
          }`}
          onClick={() => setLogType('combined')}
        >
          Logs
        </button>
        <button
          className={`px-4 py-2 text-[14px] rounded-full ${
            logType === "error" ? "bg-red-600 text-white" : "border-red-600 text-red-600"
          }`}
          onClick={() => setLogType('error')}
        >
          Errors
        </button>
      </div>

      {isLoading && <p>Caricamento log...</p>}
      {error && <p className="text-red-600">Errore: {error}</p>}

      <div className="overflow-auto flex-1 rounded-lg border-gray-600 p-4 bg-[#002a50]">
        {logs.length === 0 && !isLoading && !error && (
          <p>Nessun log disponibile.</p>
        )}
        {logs.map((log, index) => (
          <div key={index} className="mb-4 p-3 border border-gray-700 rounded-md bg-[#00315a]">
            <div className="flex justify-between mb-2">
              <strong className={getLevelStyle(log.level)}>{log.level.toUpperCase()}</strong>
              <span className="text-gray-400 text-sm">{new Date(log.timestamp).toLocaleString()}</span>
            </div>
            <pre className="whitespace-pre-wrap text-xs font-mono">{JSON.stringify(log, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
