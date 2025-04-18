"use client";

import { useState } from "react";
import Image from 'next/image';
import SpareModal from "./SpareModal";
import Istructions from "./Istructions";
import FacilitiesModal from "@/components/maintenance/FacilitiesModal";

const MaintenanceInfo = ({ details }) => {
  const [showIstructions, setShowIstructions] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [facilitiesOpen, setFacilitiesOpen] = useState(false);

  const handleProductSelect = (imageSrc) => {
    setSelectedProduct(imageSrc);
  };

  return (
    <div className="p-2">
      <h2 className="text-lg text-[#789fd6] mb-2">Descrizione</h2>

      <p
        className={`text-white ${
          showFull
            ? ""
            : "line-clamp-2 overflow-hidden text-ellipsis whitespace-normal"
        }`}
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: showFull ? "unset" : 2,
          overflow: "hidden",
        }}
      >
        {details.job_id}
      </p>

      {!showFull && (
        <button
          className="mt-2 text-sm text-[#fff] w-fit cursor-pointer bg-[#ffffff1a] py-1 px-4 rounded mt-2"
          onClick={() => setShowIstructions(true)}
        >
          Vedi istruzioni
        </button>
      )}

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">Impianto/Componente</h2>
        </div>
      

        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setFacilitiesOpen(true)}>
          <Image 
                    src="/motor.jpg"
                    alt="Motore"
                    width={25} 
                    height={25} 
                    className=""
                  />

          <div>
            <h2 className="text-md text-[#fff]">2.1.4 Motore centrale</h2>

          </div>
        
          <div className="ml-auto mr-8">
                <svg fill="white" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
              </div>
        </div>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">Ricorrenza</h2>
        </div>
      

        <div className="flex items-center gap-4 cursor-pointer">

        <p>1 settimana</p>
  
        </div>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">Squadra di assegnazione</h2>
        </div>
      

        <div className="flex items-center gap-4 cursor-pointer">

        <p>1 settimana</p>
  
        </div>

      </div>

      {showIstructions &&
        <Istructions istructions={""} onClose={() => setShowIstructions(false)} />
      }

      <FacilitiesModal isOpen={facilitiesOpen} onClose2={() => setFacilitiesOpen(false)} />
      
      
    </div>
  );
};

export default MaintenanceInfo;