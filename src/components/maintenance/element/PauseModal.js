"use client";

import { useState } from "react";
import { useTranslation } from "@/app/i18n";
import { updateMaintenanceJobStatus, handleSaveStatusComment } from "@/api/maintenance";

export default function PauseModal({ oldStatusId, jobId, onClose }) {
  const { t, i18n } = useTranslation("maintenance");

  const [reactivationDate, setReactivationDate] = useState("");
  const [reason, setReason] = useState("");
  const [reactivation, setReactivation] = useState(false);
  const [oneReason, setOneReason] = useState(false);
  const [allFacilities, setAllFacilities] = useState(false);

  const handleSaveStatus = async () => {
    const newStatusId = oldStatusId === 1 ? 2 : 1;

    try {
      const commentData = {
        maintenance_id: jobId,
        date: reactivationDate ? new Date(reactivationDate) : null,
        date_flag: reactivation ? "no_reactivation" : null,
        reason,
        only_this: oneReason ? "true" : null,
        all_from_this_product: allFacilities ? "true" : null,
        old_status_id: oldStatusId,
        new_status_id: newStatusId,
      };

      await handleSaveStatusComment(jobId, commentData);
      await updateMaintenanceJobStatus(jobId, newStatusId);

      onClose();
    } catch (error) {
      console.error("Errore durante il salvataggio:", error);
    }
  };

  if (!i18n.isInitialized) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000ab] bg-opacity-50 z-10">
      <div className="bg-[#022a52] w-[70%] p-5 rounded-md shadow-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[26px] font-semibold">{t("title")}</h2>
          <button className="text-white text-xl cursor-pointer" onClick={onClose}>
            <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="text-[#789FD6] text-sm">{t("reactivation_date")}</label>
            <div className="flex w-full">
              <div className="w-[50%]">
                <input
                  type="date"
                  placeholder={t("write_here")}
                  value={reactivationDate}
                  onChange={(e) => setReactivationDate(e.target.value)}
                  disabled={reactivation}
                  className={`w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none mt-2 ${
                    reactivation ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              <div className="w-50 p-4">
                <label className="flex items-center w-1/2 w-100">
                  <input
                    type="checkbox"
                    checked={reactivation}
                    onChange={() => setReactivation(!reactivation)}
                    className="mr-2 cursor-pointer w-[16px] h-[16px] appearance-none border-2 border-[#ffffff20] bg-transparent rounded-sm transition-all duration-200 
                    checked:bg-[#789fd6] checked:border-[#789fd6] hover:opacity-80 focus:outline-none"
                  />
                  {t("no_reactivation")}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="text-[#789FD6] text-sm">{t("reason")}</label>
            <textarea
              placeholder={t("write_here")}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none mt-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="flex items-center w-1/2">
              <input
                type="checkbox"
                checked={oneReason}
                onChange={() => setOneReason(!oneReason)}
                className="mr-2 cursor-pointer w-[16px] h-[16px] appearance-none border-2 border-[#ffffff20] bg-transparent rounded-sm transition-all duration-200 
                checked:bg-[#789fd6] checked:border-[#789fd6] hover:opacity-80 focus:outline-none"
              />
              {t("only_this_maintenance")}
            </label>
          </div>

          <div>
            <label className="flex items-center w-1/2">
              <input
                type="checkbox"
                checked={allFacilities}
                onChange={() => setAllFacilities(!allFacilities)}
                className="mr-2 cursor-pointer w-[16px] h-[16px] appearance-none border-2 border-[#ffffff20] bg-transparent rounded-sm transition-all duration-200 
                checked:bg-[#789fd6] checked:border-[#789fd6] hover:opacity-80 focus:outline-none"
              />
              {t("all_maintenance_this_component")}
            </label>
          </div>
        </div>

        <button onClick={() => handleSaveStatus()}
 className="w-full bg-[#789fd6] px-3 py-4 rounded-md mt-4 text-white font-semibold cursor-pointer">
          {t("save")}
        </button>
      </div>
    </div>
  );
}

