"use client";

import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { saveScan } from "@/api/scan";
import Image from "next/image";

export default function MoveProductTable({ data, scanning, setScanning, onDataChange }) {
  const [locations, setLocations] = useState(() =>
    Array.isArray(data.locationData) ? data.locationData : [data.locationData]
  );

  // Aggiorna il campo modificato
  const handleChange = (index, field, value) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = { ...updatedLocations[index], [field]: value };
    console.log(updatedLocations)
    setLocations(updatedLocations);
  };
  
  useEffect(() => {
    onDataChange({
      ...data,
      locationData: locations
    });
  }, [locations]);

  return (
    <div>
      
      {locations.map((row, index) => (
        <div key={index} className="grid grid-cols-5 gap-4 items-center mb-4">
          {/* Magazzino */}
          <div>
            <label className="text-[14px] text-[#789fd6] block mb-2">Magazzino</label>
            <input
              value={row.warehouse || data?.warehouseData?.name || ""}
              disabled
              className="bg-transparent border border-gray-400 rounded px-3 py-2 w-full"
            />
          </div>

          {/* Ubicazione attuale */}
          <div>
            <label className="text-[14px] text-[#789fd6] block mb-2">Ubicazione attuale</label>
            <div className="flex items-center gap-2 relative">
              <input
                value={row.location || ""}
                onChange={(e) => handleChange(index, "location", e.target.value)}
                className="bg-transparent border border-gray-400 rounded px-3 py-2 w-full"
              />
              <span className="text-white absolute cursor-pointer" style={{ right: "10%" }} onClick={() => setScanning(true)}>
                <svg fill="white" width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
                </svg>
              </span>
            </div>
          </div>

          {/* Quantità */}
          <div>
            <label className="text-[14px] text-[#789fd6] block mb-2">Q.tà</label>
            <input
              value={row.quantity || data?.quantity || ""}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              className="bg-transparent border border-gray-400 rounded px-3 py-2 w-full text-center"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="text-[14px] text-[#789fd6] block mb-2">Stock</label>
            <input
              value={row.stock || ""}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) {
                  handleChange(index, "stock", val);
                }
              }}
              className="bg-transparent border border-gray-400 rounded px-3 py-2 w-full text-center"
            />
          </div>

          {/* Nuova ubicazione */}
          <div>
            <label className="text-[14px] text-[#789fd6] block mb-2">Nuova ubicazione</label>
            <input
              type="text"
              value={row.newLocation || ""}
              onChange={(e) => handleChange(index, "newLocation", e.target.value)}
              className="bg-transparent border border-gray-400 rounded px-3 py-2 w-full text-white placeholder-gray-300"
              placeholder=""
            />
          </div>
        </div>
      ))}
    </div>
  );
}
