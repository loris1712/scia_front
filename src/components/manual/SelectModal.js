"use client";

import { useState, useEffect } from "react";
import { fetchMaintenanceTypes } from "@/api/maintenance";

export default function SelectModal({ isOpen, onClose, onSelect, files }) {
  const [maintenanceTypes, setMaintenanceTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  
  const handleConfirm = () => {
    if (selectedType) {
      onSelect(selectedType);
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
      <div className="bg-[#022a52] sm:w-[70%] w-full sm:h-auto h-full p-6 rounded-md shadow-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[22px] font-semibold">Selezione File</h2>
          <button className="text-white text-xl cursor-pointer" onClick={onClose}>
            <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </button>
        </div>

        <div className="bg-transparent rounded-md overflow-hidden">
          <table className="w-full text-white border-collapse sm:table hidden">
            <thead className="bg-white text-black">
              <tr>
                <th className="p-3 text-left border border-[#022a52]">Seleziona</th>
                <th className="p-3 text-left border border-[#022a52]">Nome</th>
                <th className="p-3 text-left border border-[#022a52]">Tipo</th>
                <th className="p-3 text-left border border-[#022a52]">Descrizione</th>
              </tr>
            </thead>
            <tbody>
              {files.length > 0 ? (
                files.map((file) => (
                  <tr
                    key={file.id}
                  >
                    <td className="p-3 text-center border border-[#022a52]" style={{borderRight: '1px solid black', borderBottom: '1px solid black',}}>
                      <input
                        type="radio"
                        name="maintenanceType"
                        value={file.id}
                        onChange={() => setSelectedType(file)}
                        checked={selectedType?.id === file.id}
                      />
                    </td>
                    <td className="p-3 border border-[#022a52]" style={{borderRight: '1px solid black', borderBottom: '1px solid black'}}>{file.file_name}</td>
                    <td className="p-3 border border-[#022a52]" style={{borderRight: '1px solid black', borderBottom: '1px solid black'}}>{file.file_type}</td>
                    <td className="p-3 border border-[#022a52]" style={{borderRight: '1px solid black', borderBottom: '1px solid black'}}>{file.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center border border-[#022a52]">
                    Nessun dato disponibile
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="sm:hidden flex flex-col gap-4">
            {files.length > 0 ? (
                files.map((file) => (
                <label
                  key={file.id}
                  className={`cursor-pointer rounded-md p-4 flex items-center gap-4 border-b border-black
`}
                >
                  <input
                        type="radio"
                        name="maintenanceType"
                        value={file.id}
                        onChange={() => setSelectedType(file)}
                        checked={selectedType?.id === file.id}
                      />
                  <div className="flex flex-col flex-grow gap-2">
                    <span className={`rounded-full py-1 px-3 w-[fit-content] bg-[#395575] text-[10px]`}>{file.file_name}</span>
                    <span className="font-semibold text-2xl text-white">{file.file_name}</span>
                    <span className="text-[#9ba7b9]">Pag: 390 - Ultima agg: 18/04/2024</span>
                  </div>
                </label>
              ))
            ) : (
              <p className="text-center">{t("no_data_available")}</p>
            )}
          </div>
        </div>

        <button
          className="w-full bg-[#789fd6] p-3 mt-4 text-white font-semibold cursor-pointer rounded-md"
          onClick={handleConfirm}
          disabled={!selectedType}
        >
          Conferma
        </button>
      </div>
    </div>
  ) : null;
}

