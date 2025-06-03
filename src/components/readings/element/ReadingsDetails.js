"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import AudioPlayer from "@/components/element/audioPlayer";
import NoteHistoryModal from "@/components/readings/element/NoteHistoryModal";
import PhotoHistoryModal from "@/components/readings/element/PhotoHistoryModal";
import TextHistoryModal from "@/components/readings/element/TextHistoryModal";
import EditModal from "./EditModal";
import { useRouter } from 'next/navigation';
import { updateReading } from "@/api/readings";
import { useTranslation } from "@/app/i18n";

const ReadingsDetails = ({ details }) => {
  const [showFull, setShowFull] = useState(false);
  const [noteHistoryModal, setNoteHistoryModal] = useState(false);
  const [textHistoryModal, setTextHistoryModal] = useState(false);
  const [photoHistoryModal, setPhotoHistoryModal] = useState(false);
  const [value, setValue] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const router = useRouter();
  const readingId = details?.[0]?.id;

  useEffect(() => {
    if (details?.[0]?.value) {
      setValue(details?.[0]?.value);
    }
  }, [details]);

  const handleDivClick = () => {
    setIsPopupOpen(true);
  };

  const handleValueChange = (e) => {
    setValue(e);

    updateReading(readingId, { value: e });
  };

  const { t, i18n } = useTranslation("maintenance");
  if (!i18n.isInitialized) return null;

  return (
    <div className="p-2 w-full">

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">{t("value")}</h2>
        </div>
      
        <div className="relative flex ">
          <div className={`w-[70%] flex items-center justify-left pl-4 rounded-bl-md rounded-tl-md ${value ? 'bg-[rgb(45,182,71)]' : 'bg-[#ffffff10]'}`}>
            Lt
          </div>

          <div
            onClick={handleDivClick}
            className={`ml-auto text-right rounded-br-md rounded-tr-md w-[30%] px-4 py-2 text-white cursor-pointer ${value ? 'bg-[rgb(45,182,71)]' : 'bg-[#ffffff10]'}`}
          >
            {value || t("write_here")}
          </div>
        </div>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">{t("photographic_note")}</h2>
          <button className="text-[14px] text-[#fff] ml-auto cursor-pointer" onClick={() => setNoteHistoryModal(true)}>{t("add")}</button>
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
          <button className="text-[14px] text-[#fff] ml-auto cursor-pointer" onClick={() => setNoteHistoryModal(true)}>{t("add")}</button>
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
          <button className="text-[14px] text-[#fff] ml-auto cursor-pointer" onClick={() => setTextHistoryModal(true)}>{t("add")}</button>
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

            <button 
            onClick={() => router.push('/dashboard/readings')}
            className="cursor-pointer flex items-center justify-center w-full py-6 bg-[#ffffff10] text-white rounded-md hover:bg-blue-700 transition duration-300">
            
            {t("return_to_the_list")}
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


      <EditModal 
          isOpen={isPopupOpen} 
          onClose={() => setIsPopupOpen(false)} 
          handleSave={handleValueChange} 
        />
      
    </div>
  );
};

export default ReadingsDetails;