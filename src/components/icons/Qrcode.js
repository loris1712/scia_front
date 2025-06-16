"use client";

import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Image from "next/image";
import LastScanPopup from "@/components/header/LastScanPopup";

export default function Qrcode({ className, onScan }) {
  const [scanning, setScanning] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showLastScan, setShowLastScan] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 640); 
    }
  }, []);

  useEffect(() => {
    let scanner;

    if (scanning && typeof window !== "undefined") {
      scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      });

      scanner.render(
        (decodedText) => {
          console.log("QR Code scanned:", decodedText);
          if (onScan) onScan(decodedText);
          handleCloseScanner();
        },
        (error) => {
          console.warn("Errore scanner:", error);
        }
      );
    }

    return () => {
      if (scanner) {
        scanner.clear().catch((error) => {
          console.error("Errore stop scanner:", error);
        });
      }
    };
  }, [scanning, onScan]);

  const handleQrcodeClick = () => {
    if (isMobile) {
      setShowMenu(true);
    } else {
      setScanning(true);
    }
  };

  const handleCloseScanner = () => {
    setScanning(false);
    setShowMenu(false);
    setShowLastScan(false);
  };

  return (
    <div className={className}>
      <Image
        src="/icons/qrcode.svg"
        alt="Qrcode"
        width={40}
        height={40}
        onClick={handleQrcodeClick}
        className="cursor-pointer"
      />

      {showMenu && (
        <div className="absolute bg-white rounded-md shadow-md p-4 z-50 mt-2 w-48 text-black" style={{right: '2rem'}}>
          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
            onClick={() => {
              setShowMenu(false);
              setScanning(true);
            }}
          >
            Scansiona QR
          </button>
          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded mt-2"
            onClick={() => {
              setShowMenu(false);
              setShowLastScan(true);
            }}
          >
            Ultime scansioni
          </button>
          <button
            className="block w-full text-left px-2 py-1 mt-2 text-black hover:text-red-700"
            onClick={() => setShowMenu(false)}
          >
            Chiudi
          </button>
        </div>
      )}

      {scanning && (
        <div className="fixed inset-0 bg-[#00000082] bg-opacity-20 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-md">
            <button
              onClick={handleCloseScanner}
              className="absolute top-2 right-2 text-black font-bold text-lg"
            >
              ×
            </button>
            <div id="reader" className="w-[300px] h-[300px] background-black" />
          </div>
        </div>
      )}

      {showLastScan && (
        <LastScanPopup onClose={() => setShowLastScan(false)} />
      )}
    </div>
  );
}
