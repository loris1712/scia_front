"use client";

import { useState, useEffect } from "react";
import { fetchMaintenanceTypes } from "@/api/maintenance";
import { useTranslation } from "@/app/i18n";

export default function SelectModal({ isOpen, onClose, onSelect, shipId, userId }) {
  const [maintenanceTypes, setMaintenanceTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const { t, i18n } = useTranslation("maintenance");

  useEffect(() => {
    if (isOpen) {
      fetchMaintenanceTypes(shipId, userId).then((data) => {
        console.log("Fetched maintenanceTypes:", data); 
        setMaintenanceTypes(data || []);
      });
    }
  }, [isOpen, shipId, userId]);

  const handleConfirm = () => {
    if (selectedType) {
      onSelect(selectedType);
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
      <div className="bg-[#022a52] w-[50%] p-6 rounded-md shadow-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[22px] font-semibold">{t("select_maintenance")}</h2>
          <button className="text-white text-xl cursor-pointer" onClick={onClose}>

            <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </button>
        </div>

        <div className="bg-transparent rounded-md overflow-hidden">
  <table className="w-full text-white border-collapse">
    <thead className="bg-white text-black">
      <tr>
        <th className="p-3 text-left border border-[#022a52]">{t("title_text")}</th>
        <th className="p-3 text-left border border-[#022a52]">Task</th>
        <th className="p-3 text-left border border-[#022a52]">{t("expiration")}</th>
        <th className="p-3 text-left border border-[#022a52]">{t("last_execution")}</th>
      </tr>
    </thead>
    <tbody>
      {maintenanceTypes.length > 0 ? (
        maintenanceTypes
        .filter((item) => item.tasks > 0 )
        .map((item) => (
          <tr
            key={item.id}
            className={` ${selectedType?.id === item.id ? "" : ""}`}
          >
            <td className="p-3 border border-[#022a52] flex items-center gap-4">

              <div>
                <input
                type="radio"
                name="maintenanceType"
                value={item.id}
                onChange={() => setSelectedType(item)}
                checked={selectedType?.id === item.id}
              />
              </div>
              <div>
                {item.title}
              </div>
              
              </td>
            <td className="p-3 border border-[#022a52]">{item.tasks}</td>
            <td className="p-3 border border-[#022a52]">
              {item.dueDate !== "N/A"
                ? new Date(item.dueDate).toLocaleDateString("it-IT")
                : "N/A"}
            </td>
            <td className="p-3 border border-[#022a52]">
              {item.lastExecution !== "N/A"
                ? new Date(item.lastExecution).toLocaleDateString("it-IT")
                : "N/A"}
            </td>

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
          className="w-full bg-[#789fd6] p-3 mt-4 text-white font-semibold rounded-md"
          onClick={handleConfirm}
          disabled={!selectedType}
        >
          {t("confirm")}
        </button>
      </div>
    </div>
  ) : null;
}
