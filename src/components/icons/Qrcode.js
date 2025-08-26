"use client";

import { useState, useEffect, useRef } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import Image from "next/image";
import LastScanPopup from "@/components/header/LastScanPopup";
import { useRouter } from "next/navigation";

export default function Qrcode({ className = "", onScan }) {
  const [scanning, setScanning] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showLastScan, setShowLastScan] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scannerRef = useRef(null);
  const scannerId = "reader";
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 640);
    }
  }, []);

  useEffect(() => {
    if (!scanning) return;

    const html5QrCode = new Html5Qrcode(scannerId);
    scannerRef.current = html5QrCode;

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices.length === 0) throw new Error("Nessuna camera trovata");

        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          formatsToSupport: [
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.CODE_128,
          ],
        };

        html5QrCode
          .start(
            { facingMode: "environment" },
            config,
            (decodedText) => {
              stopScanner();

              // Check if EAN-13: 13 digits only
              const ean13Regex = /^\d{13}$/;

              if (ean13Regex.test(decodedText)) {
                // Redirect to product page with EAN code
                router.push(`/product/${decodedText}`);
                return;
              }

              // Check if decodedText is a valid URL
              try {
                const url = new URL(decodedText);
                window.location.href = url.href;
              } catch {
                // Not a URL, fallback to onScan callback if exists
                if (onScan) onScan(decodedText);
              }
            },
            (error) => {
              // Ignore continuous scan errors
            }
          )
          .catch((err) => {
            console.error("Errore avvio scanner:", err);
            stopScanner();
          });
      })
      .catch((err) => {
        console.error("Errore accesso camera:", err);
        stopScanner();
      });

    return () => {
      stopScanner();
    };
  }, [scanning, onScan, router]);

  const stopScanner = () => {
    /*if (scannerRef.current) {
      scannerRef.current
        .stop()
        .then(() => {
          scannerRef.current.clear();
          scannerRef.current = null;
        })
        .catch((err) => {
          console.error("Errore arresto scanner:", err);
        });
    }*/
    setScanning(false);
  };

  const handleQrcodeClick = () => {
    if (isMobile) {
      setShowMenu(true);
    } else {
      setScanning(true);
    }
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
        <div
          className="absolute bg-white rounded-md shadow-md p-4 z-50 mt-2 w-48 text-black"
          style={{ right: "2rem" }}
        >
          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
            onClick={() => {
              setShowMenu(false);
              setScanning(true);
            }}
          >
            Scansiona
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
        <div className="fixed inset-0 bg-[#00000082] flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-md">
            <button
              onClick={stopScanner}
              className="absolute top-2 right-2 text-black font-bold text-lg"
            >
              ×
            </button>
            <div id={scannerId} className="w-[300px] h-[300px] bg-black" />
          </div>
        </div>
      )}

      {showLastScan && (
        <LastScanPopup onClose={() => setShowLastScan(false)} />
      )}
    </div>
  );
}
