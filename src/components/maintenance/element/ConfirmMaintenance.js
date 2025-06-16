"use client";

import { useState } from "react";
import { addSpareToMaintenanceList } from "@/api/spare";
import { useTranslation } from "@/app/i18n";
import SpareSelector from "./SpareSelector";
import { useUser } from "@/context/UserContext";
import { markAsOk } from "@/api/maintenance";

export default function SpareModal({ onClose, maintenanceListId }) {
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [userType, setUserType] = useState("");

  const { t, i18n } = useTranslation("maintenance");
  const [selectedSpare, setSelectedSpare] = useState([]);
  const { user } = useUser();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const spareData = {
    time,
    location,
    userType,
    userId: user?.id,
    maintenanceList_id: maintenanceListId,
    spares: selectedSpare, 
  };

  console.log(spareData)

  const result = await markAsOk(maintenanceListId, spareData, selectedSpare);

  if (result) {
    //alert(t("spare_added"));
    //onClose();
  } else {
    alert(t("spare_not_added"));
  }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000ab] bg-opacity-50 z-2">
      <form
        onSubmit={handleSubmit}
        className="bg-[#022a52] sm:w-[70%] w-full p-5 rounded-md shadow-lg text-white"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[26px] font-semibold">{t("confirm_mark")}</h2>
          <button type="button" className="text-white text-xl cursor-pointer" onClick={onClose}>
            <svg
              width="24px"
              height="24px"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>
        </div>

        <div>
          <p className="text-[26px] font-semibold mb-4">{t("confirm_maintenance_text")}</p>

          <label className="text-[#789FD6] text-sm">{t("spare_parts")}</label>

            <SpareSelector
              images={['/motor.jpg', '/motor.jpg', '/motor.jpg', '/motor.jpg','/motor.jpg', '/motor.jpg', '/motor.jpg', '/motor.jpg','/motor.jpg', '/motor.jpg', '/motor.jpg', '/motor.jpg']}
              onSelectChange={(selected) => setSelectedSpare(selected)}
            />
        </div>

        <div className="block sm:grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-[#789FD6] text-sm">{t("time_taken")}</label>
            <input
              type="text"
              placeholder={t("write_here")}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none mt-2 rounded-md"
              required
            />
          </div>
           <div>
            <label className="text-[#789FD6] text-sm">{t("location")} </label>
            <input
              type="text"
              placeholder={t("write_here")}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none mt-2 rounded-md"
              required
            />
          </div>
        </div>

        <div className="block sm:grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-[#789FD6] text-sm">{t("user_type_executor")}</label>
            <div className="mt-2">

            <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none rounded-md"
                    >
                      <option value="">{t("failure_modal2")}</option>
                      <option value="connected_user">{t("failure_modal3")}</option>
                    </select>
            </div>
          </div>

          <div>
            <label className="text-[#789FD6] text-sm">{t("user_executor")}</label>

            <div className="relative mt-2">
                    <input
                      type="text"
                      value={user?.firstName + ' ' + user?.lastName}
                      readOnly
                      className="w-full px-4 py-2 bg-[#ffffff10] text-[#ffffff20] focus:outline-none rounded-md"
                    />
                  </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#789fd6] px-3 py-4 rounded-md mt-4 text-white font-semibold cursor-pointer"
        >
          {t("save")}
        </button>
      </form>
    </div>
  );
}
