"use client";

import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Image from "next/image";

export default function Qrcode({ className, onScan }) {
  const [scanning, setScanning] = useState(false);

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
          if (onScan) {
            onScan(decodedText);
          }
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

  const handleStartScanning = () => {
    setScanning(true);
  };

  const handleCloseScanner = () => {
    setScanning(false);
  };

  return (
    <div className={className}>
      <Image
        src="/icons/qrcode.svg"
        alt="Qrcode"
        width={40}
        height={40}
        onClick={handleStartScanning}
        className="cursor-pointer"
      />

      {scanning && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
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
    </div>
  );
}
