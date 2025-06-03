"use client";

import { useState, useEffect } from "react";
import { fetchMaintenanceTypes } from "@/api/maintenance";
import Image from 'next/image';
import AudioPlayer from "@/components/element/audioPlayer";
import { useTranslation } from "@/app/i18n";

export default function NotesModal({ isOpen, onClose, data }) {
    const { t, i18n } = useTranslation("maintenance");
    if (!i18n.isInitialized) return null;
    
  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
      <div className="bg-[#022a52] w-[50%] p-6 rounded-md shadow-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[22px] font-semibold">{t("notes")}: {data.element_eswbs_instance_id}</h2>
          <button className="text-white text-xl cursor-pointer" onClick={onClose}>
            <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </button>
        </div>

        <div>
            <p className="text-[#789fd6] mb-4">{t("photograpghic_note")}</p>
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

        <div className="mt-6">
            <p className="text-[#789fd6] mb-4">{t("vocal_note")}</p>

            <div className="flex items-center gap-4 cursor-pointer">

            <div className="w-full">
            <AudioPlayer audioSrc="/audiotest.mp3" />
            </div>

            </div>
        </div>
        <button
          className="w-full bg-[#789fd6] p-3 mt-4 text-white font-semibold mt-6"
          onClick={onClose}
        >
          {t("close_button")}
        </button>
      </div>
    </div>
  ) : null;
}
