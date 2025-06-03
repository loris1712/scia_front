"use client"

import { useState, useEffect } from "react";
import DashboardHeader from "@/components/header/DashboardHeader";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import MaintenanceDetails from "@/components/checklist/element/MaintenanceDetails";
import MaintenanceInfo from "@/components/checklist/element/MaintenanceInfo";
import PauseModal from "@/components/checklist/element/PauseModal";
import NoteModal from "@/components/checklist/element/NoteModal";
import { useParams } from "next/navigation";

export default function ElementPage({ params }) {
  const [isOpen, setIsOpen] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  
  const params2 = useParams();
  const jobId = params2.elem;
 
  let bgColor = "bg-gray-400";
  let textColor = "text-white"; 

  /*if (maintenanceInfo.dueDays < -15) {
    bgColor = "bg-[rgb(208,2,27)]"; 
  } else if (maintenanceInfo.dueDays < 0) {
    bgColor = "bg-[rgb(244,114,22)]"; 
  } else if (maintenanceInfo.dueDays <= 3) {
    bgColor = "bg-[rgb(255,191,37)]";
    textColor = "text-black"; 
  } else if (maintenanceInfo.dueDays > 15) {
    bgColor = "bg-[rgb(45,182,71)]";
  }*/

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

        <div className='ml-auto flex items-center gap-4'>
          <button
            type="submit"
            onClick={() => setNoteModal(!noteModal)}
            className="rounded-md flex items-center bg-[#789fd6] hover:bg-blue-500 text-white font-bold py-1 px-4 transition duration-200 cursor-pointer"
          >
            <svg width="16px" height="16px" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
            &nbsp;&nbsp; Aggiungi nota
          </button>
        </div>
      </div>

      {isOpen && (
        <PauseModal onClose={() => setIsOpen(false)} />
      )}

      {noteModal && (
        <NoteModal onClose={() => setNoteModal(false)} />
      )}

      <div className="flex gap-4">
        <div className="w-3/4 space-y-4 bg-[#022a52] p-4 rounded-md">
          <div className="flex px-2">
            <MaintenanceDetails details={""} />
          </div>
        </div>

        <div className="w-1/4 bg-[#022a52] p-4 rounded-md">
          <MaintenanceInfo details={""}/>
        </div>
      </div>
    </div>
  );
}
