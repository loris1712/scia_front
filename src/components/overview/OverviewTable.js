"use client";

import { useState, useEffect } from "react";
import { getTeamUsers, updateUserElements } from "@/api/profile";
import { useUser } from "@/context/UserContext";
import { useTranslation } from "@/app/i18n";

const ELEMENTS_OPTIONS = ["111", "221", "331", "441", "551", "661", "771", "881", "991"];

const OverviewTable = () => {
  const [teamUsers, setTeamUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedElements, setEditedElements] = useState({});

  const { user } = useUser();
  const teamId = user?.team?.id;

  const { t, i18n } = useTranslation("team");
  const [mounted, setMounted] = useState(false);

  const getTeamUsersData = async () => {
    try {
      setLoading(true);
      const users = await getTeamUsers(teamId);
      setTeamUsers(users || []);
    } catch (err) {
      setError("Errore nel recupero degli utenti del team");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (teamId) getTeamUsersData();
  }, [teamId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleElementsChange = (userId, e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setEditedElements((prev) => ({
      ...prev,
      [userId]: selected,
    }));
  };

  const handleSaveElements = async (userId) => {
    const elements = editedElements[userId] || [];
    try {
      await updateUserElements(userId, elements);
      alert("Impianti aggiornati!");
      getTeamUsersData();
    } catch (err) {
      console.error(err);
      alert("Errore durante l'aggiornamento!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!mounted || !i18n.isInitialized) return null;

  return (
    <div className="w-full mx-auto rounded-lg">
      <div className="flex items-center mb-4">
        <h2 className="text-white text-2xl font-semibold py-2">
          {t("team_members")}
        </h2>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr_2fr] text-black/70 bg-white rounded-t-lg font-semibold">
        <p className="border border-[#022a52] p-3">{t("name")}</p>
        <p className="border border-[#022a52] p-3 text-center">{t("role")}</p>
        <p className="border border-[#022a52] p-3 text-center">{t("ship")}</p>
        <p className="border border-[#022a52] p-3 text-center">{t("system")}</p>
      </div>

      {/* DESKTOP ROWS */}
      {teamUsers.map((member) => (
        <div
          key={member.id}
          className="hidden sm:grid grid-cols-[1fr_1fr_1fr_2fr] text-white bg-[#022a52]"
        >
          <p className="border border-[#001c38] p-3 flex items-center">{member.first_name} {member.last_name}</p>
          <p className="border border-[#001c38] p-3 text-center flex items-center justify-center">{member.role.type || "-"}</p>
          <p className="border border-[#001c38] p-3 text-center flex items-center justify-center">{member.ship?.model_code || "-"}</p>
          <div className="border border-[#001c38] p-4 text-center">
            <div className="flex flex-wrap gap-2 mb-2 justify-center">
              {(editedElements[member.id] || member.role.Elements?.split(",") || []).map((el) => (
                <span key={el} className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full flex items-center">
                  {el}
                  <button
                    onClick={() => {
                      const filtered = (editedElements[member.id] || member.role.Elements?.split(",")).filter(x => x !== el);
                      setEditedElements(prev => ({ ...prev, [member.id]: filtered }));
                    }}
                    className="ml-1 text-blue-600 hover:text-blue-900"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center mt-4 mb-4 gap-4">
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  const current = editedElements[member.id] || member.role.Elements?.split(",") || [];
                  if (val && !current.includes(val)) {
                    setEditedElements(prev => ({ ...prev, [member.id]: [...current, val] }));
                  }
                  e.target.selectedIndex = 0;
                }}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>+ {t("add_plant")}</option>
                {ELEMENTS_OPTIONS.filter(opt => !(editedElements[member.id] || member.role.Elements?.split(",") || []).includes(opt)).map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>

              <button
                onClick={() => handleSaveElements(member.id)}
                className="w-full bg-[#789fd6] hover:bg-blue-500 text-white font-bold py-2 px-2 rounded-md transition cursor-pointer"
              >
                {t("save")}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* MOBILE CARDS */}
      <div className="flex flex-col sm:hidden gap-4">
        {teamUsers.map((member) => (
          <div
            key={member.id}
            className="bg-[#022a52] text-white rounded-lg p-4 shadow-md"
          >
            <p className="mb-2"><strong>{t("name")}:</strong> {member.first_name} {member.last_name}</p>
            <p className="mb-2"><strong>{t("role")}:</strong> {member.role.type || "-"}</p>
            <p className="mb-2"><strong>{t("ship")}:</strong> {member.ship?.model_code || "-"}</p>

            <div className="mb-2">
              <strong>{t("plants")}:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {(editedElements[member.id] || member.role.Elements?.split(",") || []).map((el) => (
                  <span key={el} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                    {el}
                    <button
                      onClick={() => {
                        const filtered = (editedElements[member.id] || member.role.Elements?.split(",")).filter(x => x !== el);
                        setEditedElements(prev => ({ ...prev, [member.id]: filtered }));
                      }}
                      className="ml-1 text-blue-600 hover:text-blue-900"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  const current = editedElements[member.id] || member.role.Elements?.split(",") || [];
                  if (val && !current.includes(val)) {
                    setEditedElements(prev => ({ ...prev, [member.id]: [...current, val] }));
                  }
                  e.target.selectedIndex = 0;
                }}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>+ {t("add_plant")}</option>
                {ELEMENTS_OPTIONS.filter(opt => !(editedElements[member.id] || member.role.Elements?.split(",") || []).includes(opt)).map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>

              <button
                onClick={() => handleSaveElements(member.id)}
                className="w-full bg-[#789fd6] hover:bg-blue-500 text-white font-bold py-2 px-2 rounded-md transition"
              >
                {t("save")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewTable;