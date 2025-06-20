"use client";

import { useState, useEffect } from "react";
import { fetchMaintenanceTypes } from "@/api/maintenance";
import Image from 'next/image';
import AudioPlayer from "@/components/element/audioPlayer";
import { getTextsGeneral, getPhotosGeneral, getAudiosGeneral } from "@/api/shipFiles";
import { useTranslation } from "@/app/i18n";

export default function NotesModal({ isOpen, onClose, data }) {

    const [latestPhoto, setLatestPhoto] = useState(null);
    const [latestAudio, setLatestAudio] = useState(null);
    const [latestText, setLatestText] = useState(null);

    const { t, i18n } = useTranslation("maintenance");
  
    useEffect(() => {
      if (!data?.id) return;
  
      const fetchLatestNotes = async () => {
        try {
          const [photos, audios, texts] = await Promise.all([
            getPhotosGeneral(data?.id, "maintenance"),
            getAudiosGeneral(data?.id, "maintenance"),
            getTextsGeneral(data?.id, "maintenance"),
          ]);
  
          setLatestPhoto(photos.notes[0]);
          setLatestAudio(audios.notes[0]);
          setLatestText(texts.notes[0]);
  
          if (photos?.length) {
            const sortedPhotos = [...photos].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setLatestPhoto(sortedPhotos[0]);
          }
  
          if (audios?.length) {
            console.log(audios.notes[0])
            setLatestAudio(audios.notes[0]);
          }
  
          if (texts?.length) {
            const sortedTexts = [...texts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setLatestText(sortedTexts[0]);
          }
  
        } catch (error) {
          console.error("Errore nel recupero delle note:", error);
        }
      };
  
      fetchLatestNotes();
    }, [data?.id]);

    if (!i18n.isInitialized) return null;

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
      <div className="bg-[#022a52] sm:w-[50%] w-full p-6 rounded-md shadow-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[22px] font-semibold">{t("notes")}: {data.element_eswbs_instance_id}</h2>
          <button className="text-white text-xl cursor-pointer" onClick={onClose}>
            <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </button>
        </div>

        <div>
            <p className="text-[#789fd6] mb-4">{t("photographic_notes")}</p>
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
                          <h2 className="text-md text-[#fff]">{latestPhoto.authorDetails.first_name || "Operatore"} {latestPhoto.authorDetails.last_name}</h2>
                          <h2 className="text-[14px] text-[#ffffff94]">{new Date(latestPhoto.created_at).toLocaleString()}</h2>
                        </div>
              </div>
            )}
        </div>

        <div className="mt-6">
            <p className="text-[#789fd6] mb-4">{t("vocal_notes")}</p>

            {latestAudio && (
              <div className="flex items-center gap-4 cursor-pointer">
                <div className="w-full">
                  <AudioPlayer audioSrc={latestAudio.audio_url} username={latestAudio.authorDetails.first_name[0]+latestAudio.authorDetails.last_name[0]} dateTime={latestAudio.created_at} />
                </div>
              </div>
            )}
        </div>

        <div className="mt-6">
            <p className="text-[#789fd6] mb-4">{t("text_notes")}</p>

            {latestText && (
              <div className="flex items-center gap-4 cursor-pointer">
                <div className="w-full bg-[#00000038] p-4 rounded-md">
                  <p className="text-white text-[12px] opacity-60">{latestText.authorDetails.first_name || "Operatore"} {latestText.authorDetails.last_name}</p>
                  <p className="text-white text-[16px] mt-2 mb-2">{latestText.text_field}</p>
                  <p className="text-white opacity-60 text-sm ml-auto w-fit">{new Date(latestText.created_at).toLocaleString()}</p>
                </div>
              </div>
        )}
        </div>
        <button
          className="w-full bg-[#789fd6] p-3 mt-4 text-white font-semibold mt-6 rounded-md"
          onClick={onClose}
        >
          {t("close_button")}
        </button>
      </div>
    </div>
  ) : null;
}
