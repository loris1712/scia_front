"use client";

import { useState, useEffect } from "react";
import { fetchMaintenanceTypes } from "@/api/maintenance";
import { useTranslation } from "@/app/i18n";

export default function SelectModal({ isOpen, onClose, onSelect, types, defaultType }) {
  const [maintenanceTypes, setMaintenanceTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    if (defaultType) {
      setSelectedType(defaultType);
    }
  }, [defaultType, isOpen]);
  
  const handleConfirm = () => {
    if (selectedType) {
      onSelect(selectedType);
      onClose();
    }
  };
  const { t, i18n } = useTranslation("maintenance");
    const [mounted, setMounted] = useState(false);

  useEffect(() => {
      setMounted(true);
    }, []);
      
    if (!mounted || !i18n.isInitialized) return null;

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
      <div className="bg-[#022a52] w-[70%] p-6 rounded-md shadow-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[22px] font-semibold">{t("select_checklist")}</h2>
          <button className="text-white text-xl cursor-pointer" onClick={onClose}>
            <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </button>
        </div>

        <div className="bg-transparent rounded-md overflow-hidden">
          <table className="w-full text-white border-collapse">
            <thead className="bg-white text-black">
              <tr>
                <th className="p-3 text-left border border-[#022a52]">{t("select")}</th>
                <th className="p-3 text-left border border-[#022a52]">{t("title_text")}</th>
                <th className="p-3 text-left border border-[#022a52]">Task</th>
                <th className="p-3 text-left border border-[#022a52]">{t("expiration")}</th>
                <th className="p-3 text-left border border-[#022a52]">{t("last_execution")}</th>
              </tr>
            </thead>
            <tbody>
              {types.length > 0 ? (
                types.map((type) => (
                  <tr
                    key={type.id}
                  >
                    <td className="p-3 text-center border border-[#022a52]" style={{borderRight: '1px solid black', borderBottom: '1px solid black',}}>
                      <input
                        type="radio"
                        name="maintenanceType"
                        value={type.id}
                        onChange={() => setSelectedType(type)}
                        checked={selectedType?.id === type.id}
                      />
                    </td>
                    <td className="p-3 border border-[#022a52]" style={{borderRight: '1px solid black', borderBottom: '1px solid black'}}>{type.title}</td>
                    <td className="p-3 border border-[#022a52]" style={{borderRight: '1px solid black', borderBottom: '1px solid black'}}>{type.title}</td>
                    <td className="p-3 border border-[#022a52]" style={{borderRight: '1px solid black', borderBottom: '1px solid black'}}>{type.tasks[0].start_date || "N/A"}</td>
                    <td className="p-3 border border-[#022a52]" style={{borderBottom: '1px solid black'}}>{type.tasks[0].end_date || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center border border-[#022a52]">
                    {t("no_data_available")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          className="w-full bg-[#789fd6] p-3 mt-4 text-white font-semibold cursor-pointer"
          onClick={handleConfirm}
          disabled={!selectedType}
        >
          {t("confirm")}
        </button>
      </div>
    </div>
  ) : null;
}

