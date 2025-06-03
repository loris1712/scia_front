"use client";

import { useState } from "react";
import Istructions from "./Istructions";

const MaintenanceInfo = ({ details }) => {
  const [showIstructions, setShowIstructions] = useState(false);

  return (
    <div className="p-2">
      <h2 className="text-lg text-[#789fd6] mb-2">Descrizione</h2>

      <p
        className={`text-white`}
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          overflow: "hidden",
        }}
      >
        {details && details.length > 0 ? details[0].description : "Non disponibile"}
      </p>

        <button
          className="mt-2 text-sm text-[#fff] w-fit cursor-pointer bg-[#ffffff1a] py-1 px-4 rounded mt-2"
          onClick={() => setShowIstructions(true)}
        >
          Dettagli
        </button>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">Prezzo</h2>
        </div>
        <p>{details && details.length > 0 ? details[0].price : "Non disponibile"} euro</p>
      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">Lead time</h2>
        </div>
      
        <div className="flex items-center gap-4">

        <p>3 settimana</p>
  
        </div>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">Fornitore</h2>
        </div>
      

        <div className="flex items-center gap-4">

        <p>{details && details.length > 0 ? details[0].company : "Non disponibile"}</p>
  
        </div>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">NCAGE Fornitore</h2>
        </div>
      

        <div className="flex items-center gap-4">

        <p>{details && details.length > 0 ? details[0].NCAGE_supplier : "Non disponibile"}</p>
  
        </div>

      </div>

      {showIstructions &&
        <Istructions data={details} onClose={() => setShowIstructions(false)} />
      }
      </div>
  );
};

export default MaintenanceInfo;