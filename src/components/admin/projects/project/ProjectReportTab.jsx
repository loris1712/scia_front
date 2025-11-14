"use client";

import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";

export default function ProjectReportTab({ project }) {
  const [loadingLastRuntime, setLoadingLastRuntime] = useState(false);
  const [loadingShipReport, setLoadingShipReport] = useState(false);

  const generateLastRuntimeReport = async () => {
    setLoadingLastRuntime(true);
    console.log(
      `📄 Inizio generazione report runtime più recente per il progetto ID: ${project?.id}`
    );

    setTimeout(() => {
      setLoadingLastRuntime(false);
      console.log(
        `✔️ Report generato! Riceverai presto il file scaricabile per il runtime più recente.`
      );
      alert("Report runtime generato! (Simulazione)");
    }, 1500);
  };

  const generateShipGeneralReport = async () => {
    setLoadingShipReport(true);
    console.log(
      `📄 Inizio generazione report generale nave per il progetto ID: ${project?.id}`
    );

    setTimeout(() => {
      setLoadingShipReport(false);
      console.log(
        `✔️ Report nave generato! Riceverai presto il file scaricabile.`
      );
      alert("Report nave generato! (Simulazione)");
    }, 1800);
  };

  return (
    <div className="p-6 text-gray-700 text-[15px]">

      <h2 className="text-xl font-semibold text-gray-900 mb-4">Report</h2>

      <div className="space-y-6">

        {/* 🔹 Runtime Latest Report */}
        <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Report Runtime più recente
          </h3>
          <p className="text-gray-600 mb-4">
            Genera il report relativo all'ultimo runtime registrato per questo progetto.
          </p>

          <button
            onClick={generateLastRuntimeReport}
            disabled={loadingLastRuntime}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition disabled:bg-blue-300"
          >
            {loadingLastRuntime ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <FileDown size={18} />
            )}
            {loadingLastRuntime ? "Generazione..." : "Genera Report Runtime"}
          </button>
        </div>

        {/* 🔹 Ship General Report */}
        <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Report generale nave
          </h3>
          <p className="text-gray-600 mb-4">
            Genera un report completo della nave associata, incluse configurazioni e runtime storici.
          </p>

          <button
            onClick={generateShipGeneralReport}
            disabled={loadingShipReport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition disabled:bg-green-300"
          >
            {loadingShipReport ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <FileDown size={18} />
            )}
            {loadingShipReport ? "Generazione..." : "Genera Report Nave"}
          </button>
        </div>

      </div>
    </div>
  );
}

