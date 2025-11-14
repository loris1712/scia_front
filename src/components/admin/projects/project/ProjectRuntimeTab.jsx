"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { getProjectRuntime } from "@/api/admin/runtime";

export default function ProjectRuntimeTab({ project }) {
  const [runtimeData, setRuntimeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Fetch Runtime
  useEffect(() => {
    if (!project?.id) return;

    const fetchRuntime = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getProjectRuntime(project.id);
        setRuntimeData(data.runtime || []);
      } catch (err) {
        setError(err.message || "Errore caricamento runtime");
      } finally {
        setLoading(false);
      }
    };

    fetchRuntime();
  }, [project?.id]);

  return (
    <div className="p-6 text-gray-700 text-sm">

      <h2 className="text-xl font-semibold text-gray-900 mb-3">Runtime</h2>
      <p className="mb-5 text-gray-600">Storico manutenzioni pianificate ed eseguite del progetto.</p>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="animate-spin" size={18} />
          Caricamento runtime...
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {/* No data */}
      {!loading && !error && runtimeData.length === 0 && (
        <p className="text-gray-500 italic">Nessuna manutenzione disponibile.</p>
      )}

      {/* Table placeholder */}
      {!loading && runtimeData.length > 0 && (
        <table className="w-full mt-4 border collapse">
          <thead className="bg-gray-200 text-gray-700 text-xs uppercase">
            <tr>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Data</th>
              <th className="p-2 border">Stato</th>
              <th className="p-2 border">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {runtimeData.map((row, index) => (
              <tr key={index} className="border text-sm hover:bg-gray-50 transition">
                <td className="p-2 border">{row.type || "N/D"}</td>
                <td className="p-2 border">{row.date || "N/D"}</td>
                <td className="p-2 border">{row.status || "N/D"}</td>
                <td className="p-2 border text-blue-600 hover:underline cursor-pointer">
                  Dettagli
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
