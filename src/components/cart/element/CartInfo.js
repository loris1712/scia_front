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
        {details.job_id}
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
        <p>124,15 euro</p>
      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">Lead time</h2>
        </div>
      

        <div className="flex items-center gap-4 cursor-pointer">

        <p>3 settimana</p>
  
        </div>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">Fornitore</h2>
        </div>
      

        <div className="flex items-center gap-4 cursor-pointer">

        <p>My Company Srl</p>
  
        </div>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">NCAGE Fornitore</h2>
        </div>
      

        <div className="flex items-center gap-4 cursor-pointer">

        <p>AL492</p>
  
        </div>

      </div>

      {showIstructions &&
        <Istructions istructions={""} onClose={() => setShowIstructions(false)} />
      }
      </div>
  );
};

export default MaintenanceInfo;