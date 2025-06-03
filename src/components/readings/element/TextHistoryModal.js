"use client";

import { useState } from "react";
import Image from 'next/image';
import { useTranslation } from "@/app/i18n";

export default function NoteModal({ onClose }) {
    const [reactivationDate, setReactivationDate] = useState("");
    const [reason, setReason] = useState("");
    
    const [reactivation, setReactivation] = useState(false);
    const [oneReason, setOneReason] = useState(false);
    const [allFacilities, setAllFacilities] = useState("");
    const { t, i18n } = useTranslation("maintenance");
    if (!i18n.isInitialized) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000ab] bg-opacity-50 z-2">
            <div className="bg-[#022a52] w-[70%] p-5 rounded-md shadow-lg text-white">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[26px] font-semibold">{t("add_note")}</h2>
                    <button className="text-white text-xl cursor-pointer" onClick={onClose}>
                        <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
    
                    <div className={`bg-[#00000020] p-8 w-full rounded-md mb-4 cursor-pointer`}>
                        <div>
                            <svg 
                                fill="white" 
                                width="45px" 
                                height="45px" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 512 512"
                                className="ml-auto mr-auto mb-4"
                            >
                                <path d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/>
                            </svg>
                        </div>   
                        <p className="text-center">{t("photographic_note")}</p>
                    </div>

                    <div className={`bg-[#00000020] p-8 w-full rounded-md mb-4 cursor-pointer`}>
                        <div>
                            <svg 
                                fill="white" 
                                width="45px" 
                                height="45px"
                                className="ml-auto mr-auto mb-4"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path d="M192 0C139 0 96 43 96 96l0 160c0 53 43 96 96 96s96-43 96-96l0-160c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6c85.8-11.7 152-85.3 152-174.4l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 70.7-57.3 128-128 128s-128-57.3-128-128l0-40z"/>
                            </svg>
                        </div>   
                        <p className="text-center">{t("vocal_note")}</p>
                    </div>

                    <div className={`bg-[#00000020] p-8 w-full rounded-md mb-4 cursor-pointer`}>
                        <div>
                            <svg 
                                fill="white" 
                                width="45px" 
                                height="45px"
                                xmlns="http://www.w3.org/2000/svg" 
                                className="ml-auto mr-auto mb-4"
                                viewBox="0 0 384 512">
                                <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                            </svg>
                        </div>   
                        <p className="text-center">{t("text_note")}</p>
                    </div>

                </div>


                <button className="w-full bg-[#789fd6] px-3 py-4 rounded-md mt-4 text-white font-semibold cursor-pointer">
                    {t("close_button")}
                </button>
            </div>
        </div>
    );
}
