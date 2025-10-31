"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getProjectById } from "@/api/admin/projects";
import ProjectGeneralTab from "@/components/admin/projects/ProjectGeneralTab";
import ProjectESWBSTab from "@/components/admin/projects/ProjectESWBSTab";
import ProjectMaintenanceTab from "@/components/admin/projects/ProjectMaintenanceTab";

export default function ProjectDetailsPage() {
  const pathname = usePathname();
  const [project, setProject] = useState(null);
  const [editableProject, setEditableProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("generali");

  const match = pathname.match(/\/admin\/projects\/(\d+)/);
  const projectId = match ? match[1] : null;

  useEffect(() => {
    if (!projectId) return;
    const fetchProject = async () => {
      try {
        const data = await getProjectById(projectId);
        setProject(data);
        setEditableProject(data);
      } catch {
        setError("Errore nel caricamento della commessa");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleTabChange = (tab) => setActiveTab(tab);
  const tabClass = (tab) =>
    `px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors duration-200 cursor-pointer ${
      activeTab === tab
        ? "border-blue-500 text-blue-600 bg-gray-50"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`;

  if (loading) return <p className="text-gray-500 text-center mt-10">Caricamento...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Dettagli Commessa
      </h1>

      <div className="border-b border-gray-200 mb-6 flex gap-4">
        <button onClick={() => handleTabChange("generali")} className={tabClass("generali")}>
          Generali
        </button>
        <button onClick={() => handleTabChange("eswbs")} className={tabClass("eswbs")}>
          ESWBS
        </button>
        <button onClick={() => handleTabChange("manutenzioni")} className={tabClass("manutenzioni")}>
          Manutenzioni
        </button>
      </div>

      {activeTab === "generali" && (
        <ProjectGeneralTab
          projectId={projectId}
          editableProject={editableProject}
          setEditableProject={setEditableProject}
          project={project}
          setProject={setProject}
        />
      )}

      {activeTab === "eswbs" && <ProjectESWBSTab />}
      {activeTab === "manutenzioni" && <ProjectMaintenanceTab />}
    </div>
  );
}
