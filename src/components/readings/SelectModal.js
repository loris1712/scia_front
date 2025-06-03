"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/app/i18n";

export default function SelectModal({ isOpen, onClose, onSelect, datas, defaultType }) {
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    if (defaultType) {
      setSelectedTypeId(defaultType.id);
    }
  }, [defaultType, isOpen]);

  useEffect(() => {
    if (datas && datas.length > 0) {
      const typeMap = new Map();

      datas.forEach((item) => {
        const typeId = item.type?.id;
        if (!typeId) return;

        if (!typeMap.has(typeId)) {
          typeMap.set(typeId, {
            id: typeId,
            name: item.type.name,
            tasks: [],
          });
        }

        typeMap.get(typeId).tasks.push(item);
      });

      const grouped = Array.from(typeMap.values()).map((group) => {
        const sortedTasks = [...group.tasks].sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
        return {
          id: group.id,
          name: group.name,
          taskCount: group.tasks.length,
          latestDueDate: sortedTasks[0]?.due_date || "N/A",
          secondLatestDueDate: sortedTasks[1]?.due_date || "N/A",
        };
      });

      setGroupedData(grouped);
    } else {
      setGroupedData([]);
    }
  }, [datas]);

  const handleConfirm = () => {
    const selectedGroup = groupedData.find((group) => group.id === selectedTypeId);
    if (selectedGroup) {
      onSelect(selectedGroup);
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
            <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
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
              {groupedData.length > 0 ? (
                groupedData.map((group) => (
                  <tr key={group.id}>
                    <td className="p-3 text-center border border-[#022a52]" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>
                      <input
                        type="radio"
                        name="maintenanceType"
                        value={group.id}
                        onChange={() => setSelectedTypeId(group.id)}
                        checked={selectedTypeId === group.id}
                      />
                    </td>
                    <td className="p-3 border border-[#022a52]" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>{group.name}</td>
                    <td className="p-3 border border-[#022a52]" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>{group.taskCount}</td>
                    <td className="p-3 border border-[#022a52]" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>{group.latestDueDate}</td>
                    <td className="p-3 border border-[#022a52]" style={{ borderBottom: '1px solid black' }}>{group.secondLatestDueDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center border border-[#022a52]">
                    Nessun dato disponibile
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          className="w-full bg-[#789fd6] p-3 mt-4 text-white font-semibold cursor-pointer"
          onClick={handleConfirm}
          disabled={selectedTypeId === null}
        >
          {t("confirm")}
        </button>
      </div>
    </div>
  ) : null;
}
