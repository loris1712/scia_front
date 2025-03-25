"use client";

import { useEffect, useState } from "react";
import InfoCard from "@/components/profile/InfoCard";
import Link from "next/link";
import { getSettings, updateSettings } from "@/api/settings";
import { useUser } from "@/context/UserContext";

export default function SettingsContainer() {
  const [isNotificationsEnabledMaintenance, setIsNotificationsEnabledMaintenance] = useState(false);
  const [isNotificationsEnabledChecklist, setIsNotificationsEnabledChecklist] = useState(false);
  const [maintenanceFrequency, setMaintenanceFrequency] = useState("settimanale");
  const [checklistFrequency, setChecklistFrequency] = useState("settimanale");
  const [license, setLicense] = useState("");

  const { user } = useUser();

  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) return; 

      const data = await getSettings(user.id);
      if (data) {
        setIsNotificationsEnabledMaintenance(data.is_notifications_enabled_maintenance || false);
        setMaintenanceFrequency(data.maintenance_frequency || "mensile");
        setIsNotificationsEnabledChecklist(data.is_notifications_enabled_checklist || false);
        setChecklistFrequency(data.checklist_frequency || "mensile");
        setLicense(data.license || "");
      }
    };
  
    fetchSettings();
  }, [user]); 

  const handleSaveSettings = async () => {
    if (!user) {
      console.error("Errore: user è null o undefined");
      alert("Errore: utente non trovato!");
      return;
    }
  
    const userId = user.id; // Ora siamo sicuri che user esista
  
    const payload = {
      user_id: userId,
      isNotificationsEnabledMaintenance,
      maintenanceFrequency,
      isNotificationsEnabledChecklist,
      checklistFrequency,
      license,
    };
  
    console.log("Payload inviato:", payload); // Debug per verificare il payload
  
    const success = await updateSettings(payload);
  
    if (success) {
      alert("Impostazioni salvate!");
    } else {
      alert("Errore nel salvataggio.");
    }
  };  

  return (
    <div className="flex flex-col text-white">
      <div className="flex gap-4">
        <div className="w-full space-y-4 bg-[#022A52] py-4 px-6 rounded-md">
          <div className="mb-8">
            <h4 className="text-[#ffffffa6] mb-4">NOTIFICHE</h4>

            {/* Switch per le manutenzioni */}
            <div className="flex items-center mb-4">
              <div>
                <p className="text-[18px] text-[#fff]">Rendiconto manutenzioni</p>
                <p className="text-[16px] text-[#ffffffa6]">Attiva notifiche per le manutenzioni da eseguire</p>
              </div>
              <div className="ml-auto">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNotificationsEnabledMaintenance}
                    onChange={() => setIsNotificationsEnabledMaintenance(!isNotificationsEnabledMaintenance)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-[#4cd964] transition-colors">
                    <div
                      className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        isNotificationsEnabledMaintenance ? "translate-x-5" : ""
                      }`}
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Dropdown per la frequenza delle manutenzioni */}
            {isNotificationsEnabledMaintenance && (
              <div className="mt-2">
                <label className="text-[#789fd6] block mb-2">Frequenza notifiche manutenzione</label>
                <select
                  value={maintenanceFrequency}
                  onChange={(e) => setMaintenanceFrequency(e.target.value)}
                  className="w-full bg-[#ffffff10] text-white px-4 py-2 rounded-md"
                >
                  <option value="settimanale">Settimanale</option>
                  <option value="mensile">Mensile</option>
                  <option value="annuale">Annuale</option>
                </select>
              </div>
            )}

            {/* Switch per le checklist */}
            <div className="flex items-center mt-6">
              <div>
                <p className="text-[18px] text-[#fff]">Rendiconto checklist</p>
                <p className="text-[16px] text-[#ffffffa6]">Attiva notifiche per le checklist da eseguire</p>
              </div>
              <div className="ml-auto">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNotificationsEnabledChecklist}
                    onChange={() => setIsNotificationsEnabledChecklist(!isNotificationsEnabledChecklist)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-[#4cd964] transition-colors">
                    <div
                      className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        isNotificationsEnabledChecklist ? "translate-x-5" : ""
                      }`}
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Dropdown per la frequenza delle checklist */}
            {isNotificationsEnabledChecklist && (
              <div className="mt-2">
                <label className="text-[#789fd6] block mb-2">Frequenza notifiche checklist</label>
                <select
                  value={checklistFrequency}
                  onChange={(e) => setChecklistFrequency(e.target.value)}
                  className="w-full bg-[#ffffff10] text-white px-4 py-2 rounded-md"
                >
                  <option value="settimanale">Settimanale</option>
                  <option value="mensile">Mensile</option>
                  <option value="annuale">Annuale</option>
                </select>
              </div>
            )}
          </div>

          <div className="mb-8">
                <h4 className="text-[#ffffffa6] mb-4">SUPPORTO</h4>

                <div className="flex items-center mb-4">
                    <div>
                        <p className="text-[18px] text-[#fff]">Assistenza clienti</p>
                        <p className="text-[16px] text-[#ffffffa6]">Sarai redirezionato al sito web per richieste di supporto generale</p>
                    </div>

                    <div className="ml-auto cursor-pointer">
                        <Link href="/dashboard/remoteAssistance" className="flex items-center px-4 py-2cursor-pointer">
                            <svg fill="white" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                        </Link>
                    </div>
                    
                </div>
            </div>

          {/* LICENZA */}
          <div className="mb-8">
            <h4 className="text-[#ffffffa6] mb-4">LICENZE</h4>
            <div className="mb-4">
              <label className="text-[#789fd6] block mb-2">Licenza dispositivo</label>
              <input
                type="text"
                value={license}
                placeholder="Licenza"
                onChange={(e) => setLicense(e.target.value)}
                className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Bottone Salva */}
          <button
            type="submit"
            onClick={handleSaveSettings}
            className="rounded-sm mt-6 w-full bg-[#789fd6] hover:bg-blue-500 text-white font-bold py-4 px-4 transition duration-200 cursor-pointer"
          >
            Salva
          </button>
        </div>
      </div>
    </div>
  );
}