"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/api/admin/projects";
import ProjectsTable from "@/components/admin/projects/ProjectsTable";
import ProjectsFilters from "@/components/admin/projects/ProjectsFilters";
import AddProjectsButton from "@/components/admin/projects/AddProjectsButton";
import AddProjectsModal from "@/components/admin/projects/AddProjectsModal";
import SelectShipModal from "@/components/admin/projects/SelectShipModal";
import { createProject } from "@/api/admin/projects";
import ESWBSModal from "@/components/admin/projects/ESWBSModal";
import ProjectDetailsModal from "@/components/admin/projects/ProjectDetailsModal";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", manager: "", status: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectShipModalOpen, setSelectShipModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const [isSelectShipModalOpen, setIsSelectShipModalOpen] = useState(false);
  const [eswbsModal, setESWBSModal] = useState(false);
  const [assignedShipId, setAssignedShipId] = useState(null);

  const [detailsModalProject, setDetailsModalProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Errore nel fetch progetti:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    (filters.manager === "" || p.manager === filters.manager) &&
    (filters.status === "" || (filters.status === "active" ? p.active : !p.active))
  );

const handleAddProjectSave = async (projectsData) => {
    try {
      // Salva i progetti sul backend
      const savedProjects = [];
      for (const p of projectsData) {
        const saved = await createProject(p);
        savedProjects.push(saved);
      }

      // Aggiorna lista progetti
      setProjects((prev) => [...prev, ...savedProjects]);

      // Chiudi AddProjectsModal
      setModalOpen(false);

      // Apri SelectShipModal sul primo progetto appena creato
      setCurrentProject(savedProjects[0]);
      setSelectShipModalOpen(true);

    } catch (err) {
      console.error("Errore salvando commesse:", err);
      alert("Errore salvando commesse");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Commesse</h2>

      <ProjectsFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <p className="text-gray-500">Caricamento commesse...</p>
      ) : (
        <ProjectsTable projects={filteredProjects} onRowClick={(project) => setDetailsModalProject(project)}/>
      )}

      <AddProjectsButton onClick={() => setModalOpen(true)} />

      {modalOpen && (
        <AddProjectsModal
          onClose={() => setModalOpen(false)}
          onSave={handleAddProjectSave}
        />
      )}

      {selectShipModalOpen && currentProject && (
        <SelectShipModal
          project={currentProject}
          onClose={() => setSelectShipModalOpen(false)}
          onShipAssigned={(shipId) => {
            setAssignedShipId(shipId);
            setIsSelectShipModalOpen(false);
            setESWBSModal(true);
          }}
        />
      )}

      {eswbsModal && (
        <ESWBSModal
          shipId={assignedShipId}
          onClose={() => setESWBSModal(false)}
        />
      )}

      {detailsModalProject && (
        <ProjectDetailsModal
          project={detailsModalProject}
          onClose={() => setDetailsModalProject(null)}
        />
      )}
    </div>
  );
}
