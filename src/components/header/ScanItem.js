"use client";
import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { BrowserMultiFormatReader } from "@zxing/library";

export default function ScanItem({ scan }) {
  const [result, setResult] = useState(null);
  const webcamRef = useRef(null);

  const captureAndDecode = useCallback(() => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const codeReader = new BrowserMultiFormatReader();
      try {
        const luminanceSource = codeReader.createLuminanceSourceFromImage(img);
        const binaryBitmap = codeReader.createBinaryBitmap(luminanceSource);
        const result = codeReader.decode(binaryBitmap);
        setResult(result.getText());
        alert(`Barcode scansionato: ${result.getText()}`);

      } catch (err) {
      }
    };
  }, []);

  return (
    <div className="p-3 bg-[#001c38] rounded-lg flex flex-col gap-4 justify-center items-center">
      <p className="font-semibold">{scan.name}</p>
      <p className="text-sm text-[#ffffff60]">{scan.details}</p>

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={{
          facingMode: "environment",
        }}
        className="rounded-lg"
      />

      <button
        onClick={captureAndDecode}
        className="mt-3 px-4 py-2 bg-blue-600 rounded text-white"
      >
        Scansiona QR/Barcode
      </button>

      {result && <p className="mt-2 text-green-400">Ultimo risultato: {result}</p>}
    </div>
  );
}
