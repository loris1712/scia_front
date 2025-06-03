"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import AudioPlayer from "@/components/element/audioPlayer";
import NoteHistoryModal from "@/components/maintenance/element/NoteHistoryModal";
import PhotoHistoryModal from "@/components/maintenance/element/PhotoHistoryModal";
import TextHistoryModal from "@/components/maintenance/element/TextHistoryModal";
import { useTranslation } from "@/app/i18n";

const MaintenanceDetails = ({ details }) => {
  const [showFull, setShowFull] = useState(false);
  const [noteHistoryModal, setNoteHistoryModal] = useState(false);
  const [textHistoryModal, setTextHistoryModal] = useState(false);
  const [photoHistoryModal, setPhotoHistoryModal] = useState(false);

  const { t, i18n } = useTranslation("maintenance");
  const [mounted, setMounted] = useState(false);
    
  useEffect(() => {
    setMounted(true);
  }, []);
    
  if (!mounted || !i18n.isInitialized) return null;

  return (
    <div className="p-2 w-full">

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">{t("details")}</h2>
          <button className="text-[14px] text-[#fff] ml-auto cursor-pointer" onClick={() => setPhotoHistoryModal(true)}>{t("see_history")}</button>
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
        
          <div className="ml-auto">
                <svg fill="white" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
              </div>
        </div>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">{t("vocal_note")}</h2>
          <button className="text-[14px] text-[#fff] ml-auto cursor-pointer" onClick={() => setNoteHistoryModal(true)}>{t("see_history")}</button>
        </div>
      

        <div className="flex items-center gap-4 cursor-pointer">

          <div className="w-full">
            <AudioPlayer audioSrc="/audiotest.mp3" />
          </div>
  
        </div>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">{t("text_note")}</h2>
          <button className="text-[14px] text-[#fff] ml-auto cursor-pointer" onClick={() => setTextHistoryModal(true)}>{t("see_history")}</button>
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

      <div className="mb-6">
        <div className="flex gap-4">
        <button className="cursor-pointer flex items-center justify-center w-full py-6 bg-[#2db647] text-white rounded-md hover:bg-blue-700 transition duration-300">
            <Image 
                src="/done.png"
                alt="Done"
                width={20} 
                height={20} 
                className="mr-2" 
            />
              {t("ok")}
            </button>

            <button className="cursor-pointer flex items-center justify-center w-full py-6 bg-[#ffffff10] text-white rounded-md hover:bg-blue-700 transition duration-300">
            <Image 
                src="/x.png"
                alt="X"
                width={20} 
                height={20} 
                className="mr-2" 
            />
             {t("Anomaly")}
            </button>

            <button className="cursor-pointer flex items-center justify-center w-full py-6 bg-[#ffffff10] text-white rounded-md hover:bg-blue-700 transition duration-300">
            <Image 
                src="/time.png"
                alt="Time"
                width={20} 
                height={20} 
                className="mr-2" 
            />
              {t("not_perfomed")}
            </button>
        </div>
      </div>

      {noteHistoryModal &&
        <NoteHistoryModal onClose={() => setNoteHistoryModal(false)} />
      }

      {photoHistoryModal &&
        <PhotoHistoryModal onClose={() => setPhotoHistoryModal(false)} />
      }

      {textHistoryModal &&
        <TextHistoryModal onClose={() => setTextHistoryModal(false)} />
      }
      
    </div>
  );
};

export default MaintenanceDetails;