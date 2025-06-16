"use client";

import { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import { useTranslation } from "@/app/i18n";

export default function FilterSidebar({ isOpen, onClose, filters, toggleFilter }) {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Helper function to map the filters
  const renderCheckboxes = (category, filterList) => (
    filterList.map(({ key, label, iconSrc, iconAlt }) => (
      <label key={key} className="flex items-center gap-2 mb-4 cursor-pointer">
        {iconSrc && (
          <Image src={iconSrc} alt={iconAlt} width={18} height={18} />
        )}
        <span>{label}</span>

        <input
          type="checkbox"
          checked={filters[category][key]}
          onChange={() => toggleFilter(category, key)}
          className="mr-2 cursor-pointer w-[20px] h-[20px] appearance-none border-2 border-[#ffffff20] bg-transparent rounded-sm transition-all duration-200 
            checked:bg-[#789fd6] checked:border-[#789fd6] hover:opacity-80 focus:outline-none ml-auto"
        />
      </label>
    ))
  );

  const { t, i18n } = useTranslation("maintenance");
    if (!i18n.isInitialized) return null;

  return isOpen ? (
    <div className="fixed inset-0 flex justify-end bg-black/50 z-10">
      <div ref={sidebarRef} className="w-80 h-screen bg-[#022a52] text-white p-5" style={{ height: '100%', overflowY: 'scroll'}}>
        <h2 className="text-2xl font-semibold mb-4">{t("filters")}</h2>

        {/* Task Filter */}
        <div className="mb-5">
          <h3 className="text-[16px] text-[#789fd6] mb-3">Task</h3>
          {renderCheckboxes("task", [
            { key: "inGiacenza", label: "In giacenza" },
            { key: "nonDisponibile", label: "Non disponibile" },
          ])}
        </div>
        
        <div className="mb-5">
          <h3 className="text-[16px] text-[#789fd6] mb-2">{t("supplier")}</h3>
          {Object.keys(filters.fornitore).map((key) => (
            <label key={key} className="flex items-center gap-2 mb-4 cursor-pointer">
              {key.charAt(0).toUpperCase() + key.slice(1)}

              <input
                type="checkbox"
                checked={filters.fornitore[key]}
                onChange={() => toggleFilter("fornitore", key)}
                className="mr-2 cursor-pointer w-[20px] h-[20px] appearance-none border-2 border-[#ffffff20] bg-transparent rounded-sm transition-all duration-200 
                checked:bg-[#789fd6] checked:border-[#789fd6] hover:opacity-80 focus:outline-none ml-auto"
              />
            </label>
          ))}
        </div>

        {/* Macrogruppo e ESWBS */}
        <div className="mb-5">
                  <h3 className="text-[16px] text-[#789fd6] mb-2">{t("level")}</h3>
                  {Object.keys(filters.magazzino).map((key) => (
                    <label key={key} className="flex items-center gap-2 mb-4 cursor-pointer">
                      
                      {key === "aBordo" && (
                        <Image src="/icons/shape.png" alt="A Bordo" width={18} height={18} />
                      )}
                      {key === "inBanchina" && (
                        <Image src="/icons/Shape-10.png" alt="In Banchina" width={18} height={18} />
                      )}
                      {key === "inBacino" && (
                        <Image src="/icons/Shape-11.png" alt="In Bacino" width={18} height={18} />
                      )}
                      {key === "fornitoreEsterno" && (
                        <Image src="/icons/Shape-12.png" alt="Fornitore Esterno" width={18} height={18} />
                      )}
        
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
        
                      <input
                        type="checkbox"
                        checked={filters.magazzino[key]}
                        onChange={() => toggleFilter("magazzino", key)}
                        className="mr-2 cursor-pointer w-[20px] h-[20px] appearance-none border-2 border-[#ffffff20] bg-transparent rounded-sm transition-all duration-200 
                        checked:bg-[#789fd6] checked:border-[#789fd6] hover:opacity-80 focus:outline-none ml-auto"
                      />
                    </label>
                  ))}
                </div>

        <button
          className="w-full bg-[#789fd6] p-3 mt-8 text-white font-semibold cursor-pointer rounded-md"
          onClick={onClose}
        >
          {t("confirm")}
        </button>
      </div>

    </div>
  ) : null;
}
