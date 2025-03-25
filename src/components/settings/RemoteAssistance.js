"use client";

import { useEffect, useState } from "react";
import InfoCard from "@/components/profile/InfoCard";
import Link from "next/link";
import Image from 'next/image';

export default function RemoteAssistance() {

    const handleButtonStartDevice = () => {
    
    };

    const handleButtonStartViewer = () => {
    
    };

  return (
    <div className="flex flex-col text-white">
      <div className="flex gap-4">
        <div className="w-full space-y-4 bg-[#022A52] py-4 px-6 rounded-md">
            <div className="text-center justify-center py-24">
                <div className="w-[fit-content] ml-auto mr-auto">
                    <Image 
                        src="/icons/assistance_icon.png"
                        alt="Logout"
                        width={100} 
                        height={100}
                        className=""
                    />
                </div>

                    <p className="w-70 ml-auto mr-auto my-6">Come vuoi avviare la sessione di assistenza remota?</p>

                    <div className="w-[fit-content] flex items-center gap-6 ml-auto mr-auto">
                        <button
                            type="submit"
                            onClick={() => handleButtonStartDevice()}
                            className={`rounded-sm mt-6 w-70 bg-[#ffffff10] hover:bg-blue-500 text-white font-bold py-4 px-4 transition duration-200 cursor-pointer`}>
                            Avvia con dispositivo
                        </button>
                        <button
                            type="submit"
                            onClick={() => handleButtonStartViewer()}
                            className={`rounded-sm mt-6 w-70 bg-[#789fd6] hover:bg-blue-500 text-white font-bold py-4 px-4 transition duration-200 cursor-pointer`}>
                            Avvia con visore
                        </button>
                    </div>
            </div>
        </div>
      </div>
    </div>
  );
}