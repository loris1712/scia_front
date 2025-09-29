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
import { getTextsGeneral, getPhotosGeneral, getAudiosGeneral } from "@/api/shipFiles";

const ReadingsDetails = ({ details }) => {
  const [showFull, setShowFull] = useState(false);
  const [noteHistoryModal, setNoteHistoryModal] = useState(false);
  const [textHistoryModal, setTextHistoryModal] = useState(false);
  const [photoHistoryModal, setPhotoHistoryModal] = useState(false);
  const [value, setValue] = useState("");

  const [latestPhoto, setLatestPhoto] = useState(null);
  const [latestAudio, setLatestAudio] = useState(null);
  const [latestText, setLatestText] = useState(null);

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

    useEffect(() => {
    if (!readingId) return;

    const fetchLatestNotes = async () => {
      try {
        const [photos, audios, texts] = await Promise.all([
          getPhotosGeneral(readingId, "reading"),
          getAudiosGeneral(readingId, "reading"),
          getTextsGeneral(readingId, "reading"),
        ]);

        if (photos?.notes?.length) {
          const sortedPhotos = [...photos.notes].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setLatestPhoto(sortedPhotos[0]);
        }

        if (audios?.notes?.length) {
          const sortedAudios = [...audios.notes].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setLatestAudio(sortedAudios[0]);
        }

        if (texts?.notes?.length) {
          const sortedTexts = [...texts.notes].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setLatestText(sortedTexts[0]);
        }


      } catch (error) {
        console.error("Errore nel recupero delle note:", error);
      }
    };

    fetchLatestNotes();
  }, [readingId]);

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
            {details[0]?.unit}
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

        {latestPhoto && (
          <div className="flex items-center gap-4 cursor-pointer">
            <Image 
              src={latestPhoto.image_url}
              alt="Foto nota"
              width={80}
              height={80}
              className="rounded-lg"
              style={{width: "80px", height: "80px", objectFit: "cover"}}
            />
            <div>
              <h2 className="text-md text-[#fff]">{latestPhoto.authorDetails.first_name} {latestPhoto.authorDetails.last_name}</h2>
              <h2 className="text-[14px] text-[#ffffff94]">{new Date(latestPhoto.created_at).toLocaleString()}</h2>
            </div>
          </div>
        )}

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">{t("vocal_note")}</h2>
          <button className="text-[14px] text-[#fff] ml-auto cursor-pointer" onClick={() => setNoteHistoryModal(true)}>{t("add")}</button>
        </div>

        {latestAudio && (
          <div className="flex items-center gap-4 cursor-pointer">
            <div className="w-full">
              <AudioPlayer
                audioSrc={latestAudio.audio_url}
                username={latestAudio.authorDetails.first_name[0] + latestAudio.authorDetails.last_name[0]}
                dateTime={latestAudio.created_at}
              />
            </div>
          </div>
        )}

      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">{t("text_note")}</h2>
          <button className="text-[14px] text-[#fff] ml-auto cursor-pointer" onClick={() => setTextHistoryModal(true)}>{t("add")}</button>
        </div>
      
        {latestText && (
          <div className="flex items-center gap-4 cursor-pointer">
            <div className="w-full bg-[#00000038] p-4 rounded-md">
              <p className="text-white text-[12px] opacity-60">{latestText.authorDetails.first_name} {latestText.authorDetails.last_name}</p>
              <p className="text-white text-[16px] mt-2 mb-2">{latestText.text_field}</p>
              <p className="text-white opacity-60 text-sm ml-auto w-fit">{new Date(latestText.created_at).toLocaleString()}</p>
            </div>
          </div>
        )}

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