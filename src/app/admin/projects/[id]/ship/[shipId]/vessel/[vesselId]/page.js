"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getProjectById } from "@/api/admin/projects";
import Link from "next/link";

export default function ProjectDetailsPage() {
  const pathname = usePathname();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("generali");

  // Estrai l'ID del progetto dalla URL (es. /admin/projects/5)
  const match = pathname.match(/\/admin\/projects\/(\d+)/);
  const projectId = match ? match[1] : null;

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const data = await getProjectById(projectId);
        setProject(data);
      } catch (err) {
        console.error("Errore nel caricamento della commessa:", err);
        setError("Errore nel caricamento della commessa");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading)
    return <p className="text-gray-500 text-center mt-10">Caricamento...</p>;

  if (error)
    return <p className="text-red-500 text-center mt-10">{error}</p>;

  if (!project)
    return <p className="text-gray-500 text-center mt-10">Commessa non trovata</p>;

  // ✅ Funzione per cambiare tab
  const handleTabChange = (tab) => setActiveTab(tab);

  // ✅ Stile per tab
  const tabClass = (tab) =>
    `px-4 py-2 cursor-pointer text-sm font-medium rounded-t-lg border-b-2 transition-colors duration-200 ${
      activeTab === tab
        ? "border-blue-500 text-blue-600 bg-gray-50"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <Link href={`/admin/projects/${projectId}`} className="text-gray-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="black" width={"18px"} height={"18px"} viewBox="0 0 640 640"><path d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z"/></svg>
        Torna al modello nave      
      </Link>
      <div className="border-b border-gray-200 mb-6 flex gap-4 mt-4">
        <button onClick={() => handleTabChange("generali")} className={tabClass("generali")}>
          Generali
        </button>
        <button onClick={() => handleTabChange("ewbs")} className={tabClass("ewbs")}>
          EWBs
        </button>
        <button onClick={() => handleTabChange("manutenzioni")} className={tabClass("manutenzioni")}>
          Manutenzioni
        </button>
      </div>

      {/* 🔹 Contenuto tab attivo */}
      {activeTab === "generali" && (
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Dati Generali della Commessa
          </h1>

          <table className="min-w-full border border-gray-200 rounded-lg text-sm">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium text-gray-700 w-1/3">Codice Commessa</td>
                <td className="p-3 text-gray-600">{project.id}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium text-gray-700">Nome Commessa</td>
                <td className="p-3 text-gray-600">{project.name || "—"}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium text-gray-700">Cliente / Owner</td>
                <td className="p-3 text-gray-600">{project.owner?.name || "N/A"}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium text-gray-700">Data di Inizio</td>
                <td className="p-3 text-gray-600">
                  {project.startDate
                    ? new Date(project.startDate).toLocaleDateString("it-IT")
                    : "—"}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium text-gray-700">Data di Consegna</td>
                <td className="p-3 text-gray-600">
                  {project.endDate
                    ? new Date(project.endDate).toLocaleDateString("it-IT")
                    : "—"}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium text-gray-700">Referente / Team Leader</td>
                <td className="p-3 text-gray-600">
                  {project.teamLeader
                    ? `${project.teamLeader.firstName} ${project.teamLeader.lastName}`
                    : "—"}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-700">Stato Commessa</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === "active"
                        ? "bg-green-100 text-green-700"
                        : project.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {project.status || "Sconosciuto"}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {project.ships && project.ships.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Navi Associate
              </h2>
              <ul className="space-y-2 text-sm">
                {project.ships.map((ship) => (
                  <li
                    key={ship.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <span>{ship.unitName}</span>
                    <span className="text-gray-500 text-xs">{ship.modelCode}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 🔹 EWBs */}
      {activeTab === "ewbs" && (
        <div className="p-4 text-gray-600 text-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">EWBs</h2>
          <p>Qui compariranno i dati relativi agli EWBs associati alla commessa.</p>
          {/* TODO: Aggiungere tabella EWBs */}
        </div>
      )}

      {/* 🔹 Manutenzioni */}
      {activeTab === "manutenzioni" && (
        <div className="p-4 text-gray-600 text-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Manutenzioni</h2>
          <p>Qui compariranno le manutenzioni pianificate o eseguite sulla commessa.</p>
          {/* TODO: Aggiungere tabella manutenzioni */}
        </div>
      )}
    </div>
  );
}
