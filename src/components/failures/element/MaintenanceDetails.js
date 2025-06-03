"use client";

import { useState } from "react";
import Image from 'next/image';
import AudioPlayer from "@/components/element/audioPlayer";
import NoteHistoryModal from "@/components/maintenance/element/NoteHistoryModal";
import PhotoHistoryModal from "@/components/maintenance/element/PhotoHistoryModal";
import TextHistoryModal from "@/components/maintenance/element/TextHistoryModal";

const MaintenanceDetails = ({ details }) => {
  const [showFull, setShowFull] = useState(false);
  const [noteHistoryModal, setNoteHistoryModal] = useState(false);
  const [textHistoryModal, setTextHistoryModal] = useState(false);
  const [photoHistoryModal, setPhotoHistoryModal] = useState(false);

  return (
    <div className="p-2 w-full">

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">Note fotografiche</h2>
          <button className="text-[14px] text-[#fff] ml-auto cursor-pointer" onClick={() => setPhotoHistoryModal(true)}>Vedi storico</button>
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
          <h2 className="text-lg text-[#789fd6]">Note vocali</h2>
          <button className="text-[14px] text-[#fff] ml-auto cursor-pointer" onClick={() => setNoteHistoryModal(true)}>Vedi storico</button>
        </div>
      

        <div className="flex items-center gap-4 cursor-pointer">

          <div className="w-full">
            <AudioPlayer audioSrc="/audiotest.mp3" />
          </div>
  
        </div>

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">Note testuali</h2>
          <button className="text-[14px] text-[#fff] ml-auto cursor-pointer" onClick={() => setTextHistoryModal(true)}>Vedi storico</button>
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