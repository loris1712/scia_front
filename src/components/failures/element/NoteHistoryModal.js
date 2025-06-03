"use client";

import { useState } from "react";
import Image from 'next/image';
import AudioPlayer from "@/components/element/audioPlayer";

export default function NoteHistoryModal({ onClose }) {
    const [reactivationDate, setReactivationDate] = useState("");
    const [reason, setReason] = useState("");
    
    const [reactivation, setReactivation] = useState(false);
    const [oneReason, setOneReason] = useState(false);
    const [allFacilities, setAllFacilities] = useState("");

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000ab] bg-opacity-50 z-2">
            <div className="bg-[#022a52] w-[70%] p-5 rounded-md shadow-lg text-white">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[26px] font-semibold">Storico note vocali</h2>
                    <button className="text-white text-xl cursor-pointer" onClick={onClose}>
                        <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </button>
                </div>

                <div className="mb-6">
                    <div className="items-center gap-4 cursor-pointer">

                    <div className="w-full mb-8">
                        <AudioPlayer audioSrc="/audiotest.mp3" />
                    </div>
                    
                    <div className="w-full mb-8">
                        <AudioPlayer audioSrc="/audiotest.mp3" />
                    </div>
                    
                    <div className="w-full">
                        <AudioPlayer audioSrc="/audiotest.mp3" />
                    </div>
            
                    </div>

                </div>

                <button className="w-full bg-[#789fd6] px-3 py-4 rounded-md mt-4 text-white font-semibold cursor-pointer" onClick={onClose}>
                    Chiudi
                </button>
            </div>
        </div>
    );
}
