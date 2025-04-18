"use client";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Image from "next/image";

export default function ScanItem({ scan }) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      });

      scanner.render(
        (decodedText) => {
          setResult(decodedText);
          setScanning(false);
          alert(`QR Code Scanned: ${decodedText}`);
        },
        (error) => console.error(error)
      );

      return () => scanner.clear();
    }
  }, [scanning]);

  return (
    <div className="p-3 bg-[#001c38] rounded-lg flex justify-between items-center cursor-pointer">
      <div>
        <p className="font-semibold">{scan.name}</p>
        <p className="text-sm text-[#ffffff60">{scan.details}</p>
      </div>
      {scanning ? (
        <div id="reader" />
      ) : (
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
  );
}
