"use client"

import { useState, useEffect } from "react";
import DashboardHeader from "@/components/header/DashboardHeader";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import SpareDetails from "@/components/spare/element/SpareDetails";
import SpareInfo from "@/components/spare/element/SpareInfo";
import NoteModal from "@/components/spare/element/NoteModal";
import { useParams } from "next/navigation";

export default function ElementPage({ params }) {
  const [noteModal, setNoteModal] = useState(false);
  
  const params2 = useParams();
  const jobId = params2.elem;
 
  let bgColor = "bg-gray-400";
  let textColor = "text-white";

  return (
    <div className="flex flex-col bg-[#001c38] text-white p-4">
      <DashboardHeader />

      <div className="flex w-full items-center mt-4">
        <Breadcrumbs />
      </div>

      <div className="flex items-center pt-2 pb-4">
        <div className='flex items-center gap-4'>
          <h2 className="text-2xl font-bold">Test</h2>
        </div>

        <div className='ml-auto flex items-center gap-4 mr-4'>
          <button
            type="submit"
            onClick={() => setNoteModal(!noteModal)}
            className="rounded-md flex items-center bg-[#022a52] hover:bg-blue-500 text-white font-bold py-1 px-4 transition duration-200 cursor-pointer"
          >
            <svg width="16px" height="16px" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
            
            &nbsp;&nbsp; Aggiungi
          </button>
        </div>
        <div className='flex items-center gap-4'>
          <button
            type="submit"
            onClick={() => setNoteModal(!noteModal)}
            className="rounded-md flex items-center bg-[#789fd6] hover:bg-blue-500 text-white font-bold py-1 px-4 transition duration-200 cursor-pointer"
          >
            <svg width="16px" height="16px" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
            &nbsp;&nbsp; Push&Buy
          </button>
        </div>
      </div>

      {noteModal && (
        <NoteModal onClose={() => setNoteModal(false)} />
      )}

        <div className="flex gap-4">
          <div className="w-3/4 space-y-4 bg-[#022a52] p-4 rounded-md">
            <div className="grid grid-cols-1 gap-4 px-2">
              <SpareDetails details={""} />
            </div>
          </div>

          <div className="w-1/4 bg-[#022a52] p-4 rounded-md">
            <SpareInfo details={""} />
          </div>
        </div>

    </div>
  );
}
