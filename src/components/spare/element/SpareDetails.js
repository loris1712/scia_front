"use client";

import { useState } from "react";
import Image from 'next/image';
import FacilitiesModal from "@/components/maintenance/FacilitiesModal";
import ElementIcon from "@/components/ElementIcon";
import PositionIcon from "@/components/PositionIcon";
import { useRouter } from "next/navigation";

const SpareDetails = ({ details }) => {
  const [showFull, setShowFull] = useState(false);
  const [facilitiesOpen, setFacilitiesOpen] = useState(false);

  const router = useRouter();

  return (

    <div className="grid grid-cols-2 gap-4 px-2">
      <div className="p-2 w-full">

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">Part Number</h2>
        </div>

        <p className="text-md text-[#fff]">{details && details.length > 0 ? details[0].Serial_number : "Non disponibile"}</p>

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

        <p className="text-md text-[#fff]">{details && details.length > 0 ? details[0].quantity : "Non disponibile"}</p>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">Denominazione originale</h2>
        </div>

        <p className="text-md text-[#fff]">{details && details.length > 0 ? details[0].Part_name : "Non disponibile"}</p>

      </div>

{details && details[0].NCAGE > 0 &&
  <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">NCAGE Costruttore</h2>
        </div>

        <p className="text-md text-[#fff]">{details && details[0].NCAGE > 0 ? details[0].NCAGE : "Non disponibile"}</p>

      </div>
}

      </div>
      <div className="p-2 w-full">

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">Magazzino (ubicazioni)</h2>
        </div>

          {details && details[0].location.length > 0 ? (
            details[0].locations.map((loc, index) => {
              const warehouse = details[0].warehouses.find(
                (w) => w.id.toString() === loc.warehouse.toString()
              );

              // Splitta le quantità in array
              const quantities = details[0].quantity.split(",");

              return (
                <div key={index} className="flex mb-2 gap-2">
                  {warehouse?.icon_url ? (
                    <>
                      <Image
                        src={warehouse.icon_url}
                        alt="Position Icon"
                        width={20}
                        height={20}
                        className="inline-block opacity-60"
                      />
                      <span className="text-white/80">{warehouse.name}</span>
                      <span className="text-white/60">
                        &nbsp;({loc.location})
                      </span>
                      <span className="text-white ml-auto">
                        &nbsp;x{quantities[index] ?? "0"}
                      </span>
                    </>
                  ) : (
                    <div>No Icon Available</div>
                  )}
                </div>
              );
            })
          ) : (
            <div>No locations available</div>
          )}

          <button
                  className="text-sm text-[#fff] w-fit cursor-pointer bg-[#ffffff1a] py-1 px-4 rounded mt-4"
                  onClick={() => router.push("/dashboard/spare")}
                >
                  Gestisci
                </button>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">EAN13</h2>
        </div>

        {/*<Image 
                            src={details && details[0].ean13 > 0 ? details[0].ean13 : "Non disponibile"}

                            alt="Ean13" 
                            width={80} 
                            height={80} 
                            className="rounded-lg"
                          />*/}

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">Ordini</h2>
        </div>

        <div className="flex items-center cursor-pointer" onClick={() => router.push("/dashboard/cart")}>

          <p className="text-white text-[16px] text-sm truncate flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#9da9bb" height="18px" width="18px" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
            In ordine         
             </p>
            <svg className="ml-auto" fill="white" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
        </div>

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

    {details && details[0].NCAGE > 0 && 
      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">Part Number Costruttore</h2>
        </div>

        <p className="text-md text-[#fff]">{details && details[0].NCAGE > 0 ? details[0].NCAGE : "Non disponibile"}</p>

      </div>
      }

      </div> 

            <FacilitiesModal isOpen={facilitiesOpen} onClose2={() => setFacilitiesOpen(false)} />
                    
    </div>
    
    
  );
};

export default SpareDetails;