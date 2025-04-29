"use client";

import { useState } from "react";
import Image from 'next/image';
import FacilitiesModal from "@/components/maintenance/FacilitiesModal";
import ElementIcon from "@/components/ElementIcon";
import PositionIcon from "@/components/PositionIcon";

const SpareDetails = ({ details }) => {
  const [showFull, setShowFull] = useState(false);
  const [facilitiesOpen, setFacilitiesOpen] = useState(false);

  console.log(details)

  return (

    <div className="grid grid-cols-2 gap-4 px-2">
      <div className="p-2 w-full">

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">Part Number</h2>
        </div>

        <p className="text-md text-[#fff]">{details && details.length > 0 ? details[0].serial_number : "Non disponibile"}</p>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">Immagine</h2>
        </div>

        <Image 
                            src="/motor.jpg"
                            alt="Motore"
                            width={80} 
                            height={80} 
                            className="rounded-lg"
                          />

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">Q.tá installata</h2>
        </div>

        <p className="text-md text-[#fff]">2</p>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">Denominazione originale</h2>
        </div>

        <p className="text-md text-[#fff]">{details && details.length > 0 ? details[0].original_denomination : "Non disponibile"}</p>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">NCAGE Costruttore</h2>
        </div>

        <p className="text-md text-[#fff]">{details && details.length > 0 ? details[0].NCAGE : "Non disponibile"}</p>

      </div>

      </div>
      <div className="p-2 w-full">

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">Magazzino (ubicazioni)</h2>
        </div>

        {details && details[0].location.length > 0 && 
                    <div className="flex items-center">
                      <Image
                              src={details[0].warehouseData.icon_url}
                              alt="Position Icon"
                              width={20}
                              height={20}
                              className="inline-block mr-2 opacity-60"
                            /> {details[0].warehouseData.name}
                             <span className="text-white/60 text-[12px]"> &nbsp;({details[0].locationData.location})</span>
                    </div>
                  }

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">EAN13</h2>
        </div>

        <Image 
                            src="/motor.jpg"
                            alt="Motore"
                            width={80} 
                            height={80} 
                            className="rounded-lg"
                          />

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">Ordini</h2>
        </div>

        <p className="text-md text-[#fff]">2</p>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">Impianto/Componente</h2>
        </div>

        <div className="flex items-center cursor-pointer" onClick={() => setFacilitiesOpen(true)}>

        <p className="text-white text-[16px] text-sm truncate">
            <ElementIcon elementId={"201"} /> {details && details.length > 0 ? details[0].eswbs : "Non disponibile"} {details && details.length > 0 ? details[0].system_description : "Non disponibile"}
          </p>
            <svg className="ml-auto" fill="white" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
          </div>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">Part Number Costruttore</h2>
        </div>

        <p className="text-md text-[#fff]">{details && details.length > 0 ? details[0].NCAGE : "Non disponibile"}</p>

      </div>

      </div> 

            <FacilitiesModal isOpen={facilitiesOpen} onClose2={() => setFacilitiesOpen(false)} />
                    
    </div>
    
    
  );
};

export default SpareDetails;