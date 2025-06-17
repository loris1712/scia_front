"use client";

import { useState } from "react";
import Image from 'next/image';

export default function NoteModal({ onClose }) {
    const [reactivationDate, setReactivationDate] = useState("");
    const [reason, setReason] = useState("");
    
    const [reactivation, setReactivation] = useState(false);
    const [oneReason, setOneReason] = useState(false);
    const [allFacilities, setAllFacilities] = useState("");

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000ab] bg-opacity-50 z-2">
            <div className="bg-[#022a52] w-[70%] p-5 rounded-md shadow-lg text-white">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[26px] font-semibold">Aggiungi nota</h2>
                    <button className="text-white text-xl cursor-pointer" onClick={onClose}>
                        <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </button>
                </div>

                 <div className="flex items-center gap-4 cursor-pointer mb-4">
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

                        <div className="flex items-center gap-4 cursor-pointer mb-4">
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

                        <div className="flex items-center gap-4 cursor-pointer mb-4">
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



                <button className="w-full bg-[#789fd6] px-3 py-4 rounded-md mt-4 text-white font-semibold cursor-pointer">
                    Chiudi
                </button>
            </div>
        </div>
    );
}
