"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { addLocation } from "@/api/location";

export default function CreateLocationModal({ isOpen, onLoad, onClose, data, shipId, userId}) {

  const [wareHouse, setWarehouse] = useState("scegli");
  const [location, setLocation] = useState("");

  const handleConfirm = async () => {
    if (!wareHouse || !location.trim()) {
      alert("Seleziona un magazzino e inserisci una ubicazione.");
      return;
    }
  
    try {
      await addLocation({
        warehouse: wareHouse,
        shipId: shipId,
        userId: userId,
        location: location,
      });
      onClose(); 
      onLoad();
    } catch (error) {
      console.error("Errore durante l'aggiunta dell'ubicazione:", error);
      alert("Si è verificato un errore.");
    }
  };
  

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
      <div className="bg-[#022a52] w-[50%] p-6 rounded-md shadow-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[22px] font-semibold">Crea ubicazione</h2>
          <button className="text-white text-xl cursor-pointer" onClick={onClose}>
            <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
          </button>
        </div>

        <div>

        <div className="mt-2">
  <label className="text-[#789fd6] block mb-2">Magazzino</label>
  <select
    value={wareHouse}
    onChange={(e) => setWarehouse(e.target.value)}
    className="w-full bg-[#ffffff10] text-white px-4 py-2 rounded-md"
  >
    <option value="">Seleziona magazzino</option>
    {[...new Map(data.filter(item => item.warehouseInfo).map(item => [item.warehouseInfo.id, item.warehouseInfo])).values()]
      .map((warehouse) => (
        <option key={warehouse.id} value={warehouse.id}>
          {warehouse.name}
        </option>
    ))}
  </select>
</div>

          
        </div>

        <div className="mt-2">
                <label className="text-[#789fd6] block mb-2">Ubicazione</label>
                <input
                type="text"
                value={location}
                placeholder="Scrivi qui..."
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
                required/>
              </div>

        

        <button
          className="w-full bg-[#789fd6] p-3 mt-8 text-white font-semibold cursor-pointer"
          onClick={handleConfirm}
        >
          Conferma
        </button>
      </div>
    </div>
  ) : null;
}
