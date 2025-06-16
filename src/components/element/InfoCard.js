"use client"

import { useState, useEffect } from "react";
import Image from 'next/image';
import EditModal from "@/components/element/EditModal";
import { useTranslation } from "@/app/i18n";

const InfoCard = ({ data }) => {
  
  const [isPopupOpen, setIsOpen] = useState(false);
  const [usageHours, setUsageHours] = useState(data.usageHours);

  const handleEditClick = () => {
    setIsOpen(true);
  };

  //const BASE_URL = "http://localhost:4000/api/maintenance";
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

  //const BASE_URL = "http://52.59.162.108:4000/api/maintenance";

  const handleSave = async (newUsage) => {

    const newElement = {
      element_model_id: 1,
      ship_id: 10,
      name: "Motore Centrale",
      serial_number: "SN12345",
      installation_date: "2024-03-14",
      new_usage: newUsage,
      progressive_code: 1001,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/element/addTimeWork`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newElement }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Errore");
      
      setUsageHours(newUsage);
      setIsOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const { t, i18n } = useTranslation("facilities");
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted || !i18n.isInitialized) return null;

  return (
    <div className="sm:flex block px-2">
      <div className="sm:w-1/2 w-full">
        <div className="mb-4">
          <h2 className="text-lg text-[#789fd6] mb-2">{t("system")}/{t("component")}</h2>
          <p className="text-white">{data.component}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg text-[#789fd6] mb-2">{t("builder")}</h2>
          <p className="text-white">{data.manufacturer}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg text-[#789fd6] mb-2">{t("image")}</h2>
          <Image 
            src="/motor.jpg"
            alt={data.name} 
            width={80} 
            height={80} 
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="sm:w-1/2 w-full">
        <div className="flex items-center mb-4">
            <div>
              <h2 className="text-lg text-[#789fd6] mb-2">{t("motorcycles_hours")}</h2>
              <p className="text-white">{data.usageHours}</p>
              <p className="text-[#ffffffa6]">06/05/2024 - 10:23</p>
            </div>

            <button
              onClick={handleEditClick}
              className="text-blue-400 hover:text-blue-300 ml-auto cursor-pointer"
            >
              <svg fill="white" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
            </button>
        </div>

        <div className="mb-4">
          <h2 className="text-lg text-[#789fd6] mb-2">Serial Number</h2>
          <p className="text-white">{data.manufacturer}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg text-[#789fd6] mb-2">{t("3D_model")}</h2>
          <Image 
            src="/motor.jpg"
            alt={data.name} 
            width={80} 
            height={80} 
            className="rounded-lg"
          />
        </div>
      </div>
      
        <EditModal 
          isOpen={isPopupOpen} 
          onClose={() => setIsOpen(false)} 
          handleSave={handleSave} 
        />
    </div>

    
  );
};

export default InfoCard;
