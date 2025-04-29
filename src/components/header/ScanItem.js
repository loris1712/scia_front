"use client";
import { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Image from "next/image";
import { saveScan } from "@/api/scan";

export default function ScanItem({ scan }) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const scannerRef = useRef(null);

    useEffect(() => {
      if (scanning) {
        const scanner = new Html5QrcodeScanner("reader", {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        });
  
        scanner.render(
          async (decodedText) => {
            setEan13(decodedText); // imposta il barcode scansionato nel campo EAN13
            setScanning(false);
            alert(`Barcode scansionato: ${decodedText}`);
  
            try {
              await saveScan({
                scannedData: decodedText,
                scannedAt: new Date().toISOString(),
                scanId: data?.id || null, // oppure altro id se vuoi salvare
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

  return (
    <div className="p-3 bg-[#001c38] rounded-lg flex flex-col gap-4 justify-center items-center cursor-pointer">
      <div className="flex justify-between items-center w-full">
        <div>
          <p className="font-semibold">{scan.name}</p>
          <p className="text-sm text-[#ffffff60]">{scan.details}</p>
        </div>
        {!scanning && (
          <Image
            src="/icons/qrcode.svg"
            alt="Qrcode"
            width={40}
            height={40}
            className="rounded-lg cursor-pointer"
            onClick={() => setScanning(true)}
          />
        )}
      </div>

      {scanning && (
        <div id="reader" className="w-full flex justify-center absolute"></div>
      )}
    </div>
  );
}
