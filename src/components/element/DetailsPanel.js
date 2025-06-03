"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import AudioPlayer from "@/components/element/audioPlayer";
import { useTranslation } from "@/app/i18n";

const DetailsPanel = ({ details }) => {
  const [showFull, setShowFull] = useState(false);

  const { t, i18n } = useTranslation("facilities");
      const [mounted, setMounted] = useState(false);
    
      useEffect(() => {
        setMounted(true);
      }, []);
    
      if (!mounted || !i18n.isInitialized) return null;

  return (
    <div className="p-2">
      <h2 className="text-lg text-[#789fd6] mb-2">{t("description")}</h2>

      <p
        className={`text-white ${
          showFull
            ? ""
            : "line-clamp-2 overflow-hidden text-ellipsis whitespace-normal"
        }`}
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: showFull ? "unset" : 2,
          overflow: "hidden",
        }}
      >
        {details.description}
      </p>

      {!showFull && (
        <button
          className="mt-2 text-sm text-[#fff] w-fit cursor-pointer bg-[#ffffff1a] py-1 px-4 rounded mt-2"
          onClick={() => setShowFull(true)}
        >
          {t("details")}
        </button>
      )}

      <div className="mb-6">
      
        <h2 className="text-lg text-[#789fd6] mb-2 mt-4">{t("exploded")}</h2>

        <div className="flex items-center gap-4 cursor-pointer">
          <Image 
                    src="/motor.jpg"
                    alt="Motore"
                    width={80} 
                    height={80} 
                    className="rounded-lg"
                  />

          <h2 className="text-md text-[#fff]">{t("technical_diagram")}</h2>
        
          <div className="ml-auto mr-8">
                <svg fill="white" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
              </div>
        </div>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">{t("photographic_notes")}</h2>
          <h2 className="text-[14px] text-[#fff] ml-auto">{t("see_history")}</h2>
        </div>
      

        <div className="flex items-center gap-4 cursor-pointer">
          <Image 
                    src="/motor.jpg"
                    alt="Motore"
                    width={80} 
                    height={80} 
                    className="rounded-lg"
                  />

          <div>
            <h2 className="text-md text-[#fff]">Alessandro Coscarelli</h2>
            <h2 className="text-[14px] text-[#ffffff94]">06/05/2024 - 10:23</h2>

          </div>
        
          <div className="ml-auto mr-8">
                <svg fill="white" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
              </div>
        </div>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">{t("vocal_notes")}</h2>
          <h2 className="text-[14px] text-[#fff] ml-auto">{t("see_history")}</h2>
        </div>
      

        <div className="flex items-center gap-4 cursor-pointer">

          <div className="w-full">
            <AudioPlayer audioSrc="/audiotest.mp3" />
          </div>
  
        </div>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">{t("text_notes")}</h2>
          <h2 className="text-[14px] text-[#fff] ml-auto">{t("see_history")}</h2>
        </div>
      

        <div className="flex items-center gap-4 cursor-pointer">

          <div className="w-full bg-[#00000038] p-4 rounded-md">
            <p className="text-white opacity-60">
              Alessandro Coscarelli
            </p>

            <p className="text-white mt-2 mb-2">
            Erano presenti numerose foglie nella scatola elettrica, dovute probabilmente al vento forte della scorsa settimana. Sono state tutte rimosse
            </p>

            <p className="text-white opacity-60 text-sm ml-auto w-[fit-content]">
              06/05/2024 - 10:25
            </p>
          </div>
  
        </div>

      </div>
      
    </div>
  );
};

export default DetailsPanel;
