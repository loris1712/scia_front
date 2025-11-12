"use client";

import { useState, useEffect } from "react";
import { X, Users, Settings, Shield } from "lucide-react";
import {
  updateTeam,
  getTeamMembers,
  updateTeamMembers,
} from "@/api/admin/teams";
import { getUsers } from "@/api/admin/users";

export default function EditTeamModal({ team, onSave, onCancel }) {
  const [activeTab, setActiveTab] = useState("info");
  const [editData, setEditData] = useState(team);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null); // per gestire multiselect aperto

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allUsers, teamMembers] = await Promise.all([
          getUsers(),
          getTeamMembers(team.id),
        ]);

        setUsers(allUsers);
        setSelectedMembers(
          teamMembers.map((m) => ({
            user_id: m.id,
            is_leader: m.is_leader || false,
            role_name: m.role_name || "",
            elements: m.elements || "",
          }))
        );
      } catch (err) {
        console.error("Errore caricamento dati team:", err);
      }
    };
    fetchData();
  }, [team.id]);

  /* 🔹 Gestione cambi input (anche nested) */
  const handleChange = (field, value, nested = null) => {
    if (nested) {
      const keys = nested.split(".");
      setEditData((prev) => {
        let updated = { ...prev };
        let ref = updated;
        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          ref[key] = { ...ref[key] };
          ref = ref[key];
        }
        ref[keys[keys.length - 1]] = {
          ...ref[keys[keys.length - 1]],
          [field]: value,
        };
        return updated;
      });
    } else {
      setEditData({ ...editData, [field]: value });
    }
  };

  /* 🔹 Toggle membro selezionato */
  const toggleMember = (userId) => {
    setSelectedMembers((prev) => {
      const exists = prev.find((m) => m.user_id === userId);
      if (exists) {
        return prev.filter((m) => m.user_id !== userId);
      } else {
        return [
          ...prev,
          { user_id: userId, is_leader: false, role_name: "", elements: "" },
        ];
      }
    });
  };

  /* 🔹 Toggle leader */
  const toggleLeader = (userId) => {
    setSelectedMembers((prev) =>
      prev.map((m) =>
        m.user_id === userId ? { ...m, is_leader: !m.is_leader } : m
      )
    );
  };

  /* 🔹 Gestione dropdown multiselect elements */
  const toggleElement = (userId, value) => {
    setSelectedMembers((prev) =>
      prev.map((m) => {
        if (m.user_id !== userId) return m;
        const current = m.elements ? m.elements.split(",") : [];
        const newElements = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        return { ...m, elements: newElements.join(",") };
      })
    );
  };

  /* 🔹 Salvataggio info generali */
  const handleSaveInfo = async () => {
    try {
      setLoading(true);
      const updated = await updateTeam(team.id, editData);
      onSave(updated);
      window.location.reload();
    } catch (err) {
      console.error("Errore salvataggio info team:", err);
      alert("Errore durante il salvataggio");
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 Salvataggio membri e ruoli */
  const handleSaveMembers = async () => {
    try {
      setLoading(true);
      await updateTeamMembers(team.id, selectedMembers);
      alert("Membri aggiornati con successo!");
      onSave();
      window.location.reload();
    } catch (err) {
      console.error("Errore aggiornamento membri:", err);
      alert("Errore durante l'aggiornamento membri");
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 Tab Button */
  const tabButton = (id, label, Icon) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
        activeTab === id
          ? "bg-blue-100 text-blue-600 shadow"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );

  /* 🔹 Lista elementi disponibili (mock) */
  const availableElements = ["551", "441", "221", "111", "661", "771", "881", "991"];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-6 relative text-gray-900">
        {/* ❌ Close */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Gestisci Team: <span className="text-blue-600">{team.name}</span>
        </h2>

        {/* 🔹 Tabs */}
        <div className="flex gap-3 mb-6 border-b border-gray-200 pb-2">
          {tabButton("info", "Info Generali", Settings)}
          {tabButton("members", "Membri", Users)}
          {tabButton("roles", "Ruoli & Permessi", Shield)}
        </div>

        {/* TAB 1: Info */}
        {activeTab === "info" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome Squadra
              </label>
              <input
                type="text"
                value={editData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex items-center w-full gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Nome Leader
                </label>
                <input
                  type="text"
                  value={editData.leader?.first_name || ""}
                  onChange={(e) =>
                    handleChange("first_name", e.target.value, "leader")
                  }
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Cognome Leader
                </label>
                <input
                  type="text"
                  value={editData.leader?.last_name || ""}
                  onChange={(e) =>
                    handleChange("last_name", e.target.value, "leader")
                  }
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Leader
              </label>
              <input
                type="text"
                value={editData.leader?.login?.email || ""}
                onChange={(e) =>
                  handleChange("email", e.target.value, "leader.login")
                }
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSaveInfo}
                disabled={loading}
                className={`px-5 py-2 rounded-lg text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Salvataggio..." : "Salva Info"}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Membri */}
        {activeTab === "members" && (
          <div>
            <p className="text-sm text-gray-600 mb-3">
              Seleziona gli utenti che fanno parte di questa squadra:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[45vh] overflow-y-auto rounded-lg">
              {users.map((u) => (
                <label
                  key={u.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 cursor-pointer transition ${
                    selectedMembers.some((m) => m.user_id === u.id)
                      ? "bg-blue-100 border-blue-400 shadow-sm"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedMembers.some((m) => m.user_id === u.id)}
                    onChange={() => toggleMember(u.id)}
                    className="accent-blue-500"
                  />
                  <span className="text-sm text-gray-800 truncate">
                    {u.first_name} {u.last_name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Ruoli e Permessi */}
        {activeTab === "roles" && (
          <div>
            <p className="text-sm text-gray-600 mb-3">
              Configura ruoli e visibilità per i membri del team:
            </p>

            {selectedMembers.length === 0 ? (
              <p className="text-gray-500 text-sm italic">
                Nessun membro selezionato. Vai alla scheda “Membri”.
              </p>
            ) : (
              <div className="overflow-y-auto max-h-[55vh] rounded-xl shadow-inner bg-gray-50 p-2">
                <table className="min-w-full text-sm text-gray-800">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-2 text-left rounded-tl-lg">Nome</th>
                      <th className="px-4 py-2 text-left">Leader</th>
                      <th className="px-4 py-2 text-left">Ruolo</th>
                      <th className="px-4 py-2 text-left rounded-tr-lg">
                        Elements
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMembers.map((m) => {
                      const user = users.find((u) => u.id === m.user_id);
                      const userElements = m.elements
                        ? m.elements.split(",")
                        : [];
                      return (
                        <tr
                          key={m.user_id}
                          className="border-b border-gray-200 hover:bg-gray-100 transition"
                        >
                          <td className="px-4 py-2 font-medium">
                            {user?.first_name} {user?.last_name}
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="checkbox"
                              checked={m.is_leader}
                              onChange={() => toggleLeader(m.user_id)}
                              className="accent-green-600"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              placeholder="Ruolo"
                              value={m.role_name || ""}
                              onChange={(e) =>
                                setSelectedMembers((prev) =>
                                  prev.map((p) =>
                                    p.user_id === m.user_id
                                      ? { ...p, role_name: e.target.value }
                                      : p
                                  )
                                )
                              }
                              className="border border-gray-300 rounded-lg px-2 py-1 text-sm w-full"
                            />
                          </td>
                          <td className="px-4 py-2 relative">
                            <div
                              className="border border-gray-300 bg-white rounded-lg px-2 py-1 text-sm cursor-pointer flex justify-between items-center"
                              onClick={() =>
                                setDropdownOpen(
                                  dropdownOpen === m.user_id ? null : m.user_id
                                )
                              }
                            >
                              <span className="truncate text-gray-700">
                                {userElements.length > 0
                                  ? userElements.join(", ")
                                  : "Seleziona elementi"}
                              </span>
                              <span className="text-gray-400 text-xs">
                                ▼
                              </span>
                            </div>
                            {dropdownOpen === m.user_id && (
                              <div className="absolute mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto w-40 z-20">
                                {availableElements.map((el) => (
                                  <label
                                    key={el}
                                    className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={userElements.includes(el)}
                                      onChange={() =>
                                        toggleElement(m.user_id, el)
                                      }
                                      className="accent-blue-600"
                                    />
                                    {el}
                                  </label>
                                ))}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {selectedMembers.length > 0 && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSaveMembers}
                  disabled={loading}
                  className={`px-5 py-2 rounded-lg text-white transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Salvataggio..." : "Salva Ruoli & Permessi"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
