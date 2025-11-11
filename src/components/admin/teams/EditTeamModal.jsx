"use client";

import { useState, useEffect } from "react";
import { X, Save, Users, Settings } from "lucide-react";
import { updateTeam, getTeamMembers, updateTeamMembers } from "@/api/admin/teams";
import { getUsers } from "@/api/admin/users";

export default function EditTeamModal({ team, onSave, onCancel }) {
  const [activeTab, setActiveTab] = useState("info");
  const [editData, setEditData] = useState(team);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  // 🔹 Carica utenti e membri del team
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allUsers, teamMembers] = await Promise.all([
          getUsers(),
          getTeamMembers(team.id),
        ]);
        setUsers(allUsers);
        setSelectedMembers(teamMembers.map((m) => m.user_id));
      } catch (err) {
        console.error("Errore caricamento dati team:", err);
      }
    };
    fetchData();
  }, [team.id]);

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

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

  const toggleMember = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

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

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative text-gray-900">
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
        </div>

        {/* 📄 Tab contenuto */}
        {activeTab === "info" ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome Squadra
              </label>
              <input
                type="text"
                value={editData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ruolo
              </label>
              <input
                type="text"
                value={editData.role || ""}
                onChange={(e) => handleChange("role", e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Responsabile
              </label>
              <input
                type="text"
                value={editData.manager || ""}
                onChange={(e) => handleChange("manager", e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                value={editData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
        ) : (
          <div>
            <p className="text-sm text-gray-600 mb-3">
              Seleziona gli utenti che fanno parte di questa squadra:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[45vh] overflow-y-auto border rounded-lg p-3">
              {users.map((u) => (
                <label
                  key={u.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition ${
                    selectedMembers.includes(u.id)
                      ? "bg-blue-100 border-blue-400"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(u.id)}
                    onChange={() => toggleMember(u.id)}
                    className="accent-blue-500"
                  />
                  <span className="text-sm text-gray-800">
                    {u.first_name} {u.last_name}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSaveMembers}
                disabled={loading}
                className={`px-5 py-2 rounded-lg text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "Aggiornamento..." : "Salva Membri"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
