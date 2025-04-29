"use client";

import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { fetchSpareById, updateSpare } from "@/api/spare";
import { saveScan } from "@/api/scan";
import FacilitiesModal from "./FacilitiesModal";
import MoveProductTable from "./MoveProductTable";
import AddProduct from "./AddProduct";
import Image from 'next/image';
import { useUser } from "@/context/UserContext";

export default function MoveProduct({ isOpen, onClose, data }) {
  const [ean13, setEan13] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [eswbsSearch, setEswbsSearch] = useState('');
  const [showEswbsPopup, setShowEswbsPopup] = useState(false);
  const [selectedEswbs, setSelectedEswbs] = useState('');
  const [scanning, setScanning] = useState(false);


  const shipId = 1;
  const { user } = useUser();

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      });

      scanner.render(
        async (decodedText) => {
          setEan13(decodedText);
          setScanning(false);
          alert(`Barcode scansionato: ${decodedText}`);

          try {
            await saveScan({
              scannedData: decodedText,
              scannedAt: new Date().toISOString(),
              scanId: data?.id || null,
            });
          } catch (error) {
            console.error("Errore durante il salvataggio dello scan:", error);
          }
        },
        (error) => console.error("Errore scansione:", error)
      );

      return () => {
        scanner.clear().catch((error) => console.error("Errore nel pulire lo scanner", error));
      };
    }
  }, [scanning, data]);

  const handleEan13Change = (e) => setEan13(e.target.value);
  const handleClearEan13 = () => setEan13('');
  const handlePartNumberChange = (e) => setPartNumber(e.target.value);
  const handleEswbsSearchChange = (e) => setEswbsSearch(e.target.value);

  const handleSearch = async () => {
    try {
      const response = await fetchSpareById(ean13, partNumber, eswbsSearch);

      if(response.length > 0){

        setResults(response[0]);
        setShowResults(true)
      }else{
        setAddSpare(true);
      }
    } catch (error) {
      console.error("Errore nella ricerca:", error);
    }
  };  

  const handleEswbsClick = () => setShowEswbsPopup(true);
  const handleEswbsPopupClose = () => setShowEswbsPopup(false);
  const handleEswbsSelect = (eswbs) => {
    setSelectedEswbs(eswbs);
    setEswbsSearch(eswbs);
    setShowEswbsPopup(false);
  };

  const isSearchEnabled = ean13 || partNumber || eswbsSearch || scanning;
  const [showResults, setShowResults] = useState(false);
  const [addSpare, setAddSpare] = useState(false);
  const [results, setResults] = useState(false);

  const handleClose = () => {
    onClose();
    setShowResults(false);
  }

  const handleConfirm = async () => {
    try {
      if (!results) return;
  
      const updatedData = {
        ...results,
        updatedAt: new Date().toISOString(),
        scanId: data?.id || null,
      };
  
      const response = await updateSpare(updatedData.id, updatedData, shipId, user.id);

      handleClose();
    } catch (error) {
      console.error("Errore durante la conferma:", error);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
      <div className="bg-[#022a52] w-[50%] p-6 rounded-md shadow-lg text-white overflow-y-auto max-h-[95vh]">

      {
        addSpare ? (
          <div>
              <AddProduct onClose={() => setScanning(true)} />
          </div>
        ) : (
          !showResults ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[22px] font-semibold">Sposta o aggiungi ricambio</h2>
                <button className="text-white text-xl cursor-pointer" onClick={onClose}>
                  <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </button>
              </div>

              <div className="px-4 py-4 rounded-lg flex items-center justify-between bg-[#e2d52d] gap-4 cursor-pointer" onClick={() => setScanning(true)}>
                <div className="flex items-center gap-2">
                  <svg fill="#022a52" width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zm32 320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64v-64zm288-320c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32h-96zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64h-64c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32v-96z"/>
                  </svg>
                  <h2 className="text-[#022a52] font-semibold">Scansiona il barcode del ricambio</h2>
                </div>
              </div>

              {scanning && (
                <div id="reader" className="w-full flex justify-center mt-4" />
              )}

              <div className="flex items-center w-full my-6">
                <div className="flex-grow h-[2px] bg-white opacity-60"></div>
                <span className="px-6 text-white text-[16px] opacity-60">Oppure ricerca per codice</span>
                <div className="flex-grow h-[2px] bg-white opacity-60"></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-[#789FD6] text-sm mb-2">EAN13</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={ean13}
                      onChange={handleEan13Change}
                      placeholder="Scrivi qui..."
                      className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none rounded-md"
                    />
                    {ean13 && (
                      <button
                        onClick={handleClearEan13}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[#789FD6] text-sm mb-2">Part Number</label>
                  <input
                    type="text"
                    value={partNumber}
                    onChange={handlePartNumberChange}
                    placeholder="Scrivi qui..."
                    className="px-4 py-2 bg-[#ffffff10] text-white focus:outline-none rounded-md"
                  />
                </div>
              </div>

              <div className="flex items-center w-full my-6">
                <div className="flex-grow h-[2px] bg-white opacity-60"></div>
                <span className="px-6 text-white text-[16px] opacity-60">Oppure scegli da ESWBS</span>
                <div className="flex-grow h-[2px] bg-white opacity-60"></div>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-[#789FD6] text-sm mb-2">Ricerca ESWBS</label>
                  <div
                    onClick={handleEswbsClick}
                    className="px-4 py-2 bg-[#ffffff10] text-white cursor-pointer focus:outline-none rounded-md"
                  >
                    {selectedEswbs || "Scegli"}
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-[#789fd6] p-3 text-white font-semibold mt-6 cursor-pointer rounded-md"
                onClick={handleSearch}
                disabled={!isSearchEnabled}
              >
                Avvia ricerca
              </button>
              <FacilitiesModal isOpen={showEswbsPopup} onClose2={handleEswbsPopupClose} />
            </div>
          ) : (
            <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-[22px] font-semibold">Sposta/carica ricambio</h2>
                      <button className="text-white text-xl cursor-pointer" onClick={handleClose}>
                        <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-4 mt-4">
                      <div className="flex">
                          <Image 
                                          src="/motor.jpg"
                                          alt="Motore"
                                          width={160} 
                                          height={160} 
                                          className="rounded-lg"
                                        />                
                      </div>

                      <div className="flex flex-col items-start">
                        <p className="text-[14px] text-[#789fd6]">Part Number</p>
                        <p className="text-[18px] text-white">{results && results.serial_number}</p>
                      </div>

                      <div className="flex flex-col items-start">
                        <p className="text-[14px] text-[#789fd6]">Fornitore</p>
                        <p className="text-[18px] text-white">{results && results.company}</p>
                      </div>
                    </div>

                    <div className="px-4 py-4 rounded-lg flex items-center justify-between bg-[#e2d52d] gap-4 cursor-pointer mb-8" onClick={() => setScanning(true)}>
                      <div className="flex items-center gap-2">
                        <svg fill="#022a52" width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zm32 320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64v-64zm288-320c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32h-96zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64h-64c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32v-96z"/>
                        </svg>
                        <h2 className="text-[#022a52] font-semibold">Scansiona ubicazione attuale</h2>
                      </div>
                    </div>

                    {scanning && (
                      <div id="reader" className="w-full flex justify-center mt-4" />
                    )}

                    {results &&
                      <MoveProductTable data={results} scanning={scanning} setScanning={setScanning} onDataChange={setResults} />
                    }

                    <button
                      className="w-full bg-[#789fd6] p-3 text-white font-semibold mt-6 cursor-pointer rounded-md"
                      onClick={handleConfirm}
                      disabled={!results}
                    >
                      Conferma
                    </button>
                </div>
          )
        )
      }

    </div>
    </div>
  ) : null;
}
