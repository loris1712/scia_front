"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/app/i18n";

export default function MoveProductTable({ data, scanning, setScanning, onDataChange, setActiveField }) {
  const [locations, setLocations] = useState(() => {
    const initialLocations = Array.isArray(data.locationData) ? data.locationData : [data.locationData];

    return initialLocations.map(location => {
      return {
        ...location,
        quantity: data.quantity || 0, // Impostiamo quantity al valore di data.quantity
      };
    });
  });

  console.log(data);

  const handleChange = (index, field, value) => {
    const updatedLocations = [...locations];
    const updatedLocation = { ...updatedLocations[index] };

    if (field === "stock") {
      const stockValue = /^\d*$/.test(value) ? parseInt(value, 10) : 0;
      updatedLocation[field] = stockValue;

      // Se stock è nullo o vuoto, ripristina quantity al valore iniziale (data.quantity)
      if (value === "" || value === null) {
        updatedLocation.quantity = data.quantity || 0;
      } else {
        // Calcola quantity in base a stock
        const quantityLocation = updatedLocation.quantity || data.quantity;
        updatedLocation.quantity = quantityLocation - stockValue;
      }

      updatedLocations[index] = updatedLocation;
    } else {
      updatedLocation[field] = value;
      updatedLocations[index] = updatedLocation;
    }

    setLocations(updatedLocations);
  };

  useEffect(() => {
    onDataChange({
      ...data,
      locationData: locations,
    });
  }, [locations]);

  const { t, i18n } = useTranslation("maintenance");
  if (!i18n.isInitialized) return null;

  return (
    <div>
      {locations.map((row, index) => (
        <div key={index} className="grid grid-cols-5 gap-4 items-center mb-4">
          {/* Magazzino */}
          <div>
            <label className="text-[14px] text-[#789fd6] block mb-2">{t("warehouse")}</label>
            <input
              value={row.warehouse || data?.warehouseData?.name || ""}
              disabled
              className="bg-transparent border border-gray-400 focus:border-[#e2d52d] focus:outline-none rounded px-3 py-2 w-full"
            />
          </div>

          {/* Ubicazione attuale */}
          <div>
            <label className="text-[14px] text-[#789fd6] block mb-2">{t("current_location")}</label>
            <div className="flex items-center gap-2 relative">
              <input
                value={row.location || ""}
                onChange={(e) => handleChange(index, "location", e.target.value)}
                className="bg-transparent border border-gray-400 focus:border-[#e2d52d] focus:outline-none rounded px-3 py-2 w-full"
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
            <label className="text-[14px] text-[#789fd6] block mb-2">{t("quantity")}</label>
            <input
              value={row.quantity}
              onFocus={() => setActiveField("")}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              className="bg-transparent border border-gray-400 focus:border-[#e2d52d] focus:outline-none rounded px-3 py-2 w-full"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="text-[14px] text-[#789fd6] block mb-2">Stock</label>
            <input
              value={row.stock || ""}
              onFocus={() => setActiveField("stock")}
              onChange={(e) => handleChange(index, "stock", e.target.value)}
              className="bg-transparent border border-gray-400 focus:border-[#e2d52d] focus:outline-none rounded px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="text-[14px] text-[#789fd6] block mb-2">{t("new_location")}</label>
            <input
              type="text"
              value={row.newLocation || ""}
              onFocus={() => setActiveField("newLocation")}
              onChange={(e) => handleChange(index, "newLocation", e.target.value)}
              className="bg-transparent border border-gray-400 focus:border-[#e2d52d] focus:outline-none rounded px-3 py-2 w-full"
              placeholder=""
            />
          </div>
        </div>
      ))}
    </div>
  );
}
