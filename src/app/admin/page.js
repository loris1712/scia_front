"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* --- API --- */
import { getUsers } from "@/api/admin/users";
import { getTeams } from "@/api/admin/teams";
import { getProjects } from "@/api/admin/projects";
import { getShipyards } from "@/api/admin/shipyards";

/* --- COMPONENTS --- */
import UsersTable from "@/components/admin/dashboard/UsersTable";
import TeamsTable from "@/components/admin/dashboard/TeamsTable";
import ProjectsTable from "@/components/admin/dashboard/ProjectsTable";
import SitesTable from "@/components/admin/dashboard/SitesTable";

export default function AdminDashboard() {
  /* 🔹 STATE UTENTI */
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  /* 🔹 STATE TEAM */
  const [teams, setTeams] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [teamFilters, setTeamFilters] = useState({ name: "", role: "", status: "" });

  /* 🔹 STATE PROGETTI */
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectFilters, setProjectFilters] = useState({ name: "", manager: "", status: "" });
  const [detailsModalProject, setDetailsModalProject] = useState(null);

  /* 🔹 STATE CANTIERI (SITES) */
  const [sites, setSites] = useState([]);
  const [loadingSites, setLoadingSites] = useState(true);
  const [siteFilters, setSiteFilters] = useState({ companyName: "" });

  /* ==================== FETCH UTENTI ==================== */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error("Errore nel fetch utenti:", err);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  /* ==================== FETCH TEAM ==================== */
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        setTeams(data);
      } catch (err) {
        console.error("Errore nel fetch squadre:", err);
      } finally {
        setLoadingTeams(false);
      }
    };
    fetchTeams();
  }, []);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(teamFilters.name.toLowerCase()) &&
    (teamFilters.role === "" || team.role === teamFilters.role) &&
    (teamFilters.status === "" || (teamFilters.status === "attivo" ? team.active : !team.active))
  );

  /* ==================== FETCH PROGETTI ==================== */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Errore nel fetch progetti:", err);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) =>
    p.name?.toLowerCase().includes(projectFilters.name.toLowerCase()) &&
    (projectFilters.manager === "" || p.manager === projectFilters.manager) &&
    (projectFilters.status === "" || p.status === projectFilters.status)
  );

  /* ==================== FETCH CANTIERI ==================== */
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const data = await getShipyards();
        setSites(data);
      } catch (err) {
        console.error("Errore nel fetch cantieri:", err);
      } finally {
        setLoadingSites(false);
      }
    };
    fetchSites();
  }, []);

  const filteredSites = sites.filter((s) =>
    s.companyName?.toLowerCase().includes(siteFilters.companyName.toLowerCase())
  );

  /* ==================== RENDER ==================== */
  return (
    <div className="min-h-screen text-gray-900 p-6 bg-gray-50 rounded-md">
      {/* Titolo principale */}
      <h2 className="text-3xl font-bold mb-2">Benvenuto nella Dashboard</h2>
      <p className="text-gray-600 mb-10">
        Gestisci utenti, squadre, commesse, cantieri e aziende in un'unica vista.
      </p>

      {/* Griglia 2x3 (3 righe per schermi grandi) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* --- BOX 1: UTENTI --- */}
        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Gestione Utenti</h3>
            <Link href="/admin/users">
              <button className="cursor-pointer flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-full hover:bg-blue-50 transition">
                Mostra tutto
              </button>
            </Link>
          </div>
          {loadingUsers ? (
            <p className="text-gray-500">Caricamento utenti...</p>
          ) : (
            <UsersTable users={users} />
          )}
        </div>

        {/* --- BOX 2: TEAM --- */}
        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Gestione Team</h3>
            <Link href="/admin/teams">
              <button className="cursor-pointer flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-full hover:bg-blue-50 transition">
                Mostra tutto
              </button>
            </Link>
          </div>
          {loadingTeams ? (
            <p className="text-gray-500">Caricamento squadre...</p>
          ) : (
            <TeamsTable teams={filteredTeams} />
          )}
        </div>

        {/* --- BOX 3: COMMESSE --- */}
        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Commesse</h3>
            <Link href="/admin/projects">
              <button className="cursor-pointer flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-full hover:bg-blue-50 transition">
                Mostra tutto
              </button>
            </Link>
          </div>
          {loadingProjects ? (
            <p className="text-gray-500">Caricamento commesse...</p>
          ) : (
            <ProjectsTable
              projects={filteredProjects}
              onRowClick={(project) => setDetailsModalProject(project)}
            />
          )}
        </div>

        {/* --- BOX 4: CANTIERI --- */}
        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Cantieri Navali</h3>
            <Link href="/admin/shipyards">
              <button className="cursor-pointer flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-full hover:bg-blue-50 transition">
                Mostra tutto
              </button>
            </Link>
          </div>
          {loadingSites ? (
            <p className="text-gray-500">Caricamento cantieri...</p>
          ) : (
            <SitesTable sites={filteredSites} />
          )}
        </div>
      </div>
    </div>
  );
}
