"use client"

import { useState, useEffect } from "react";
import DashboardHeader from "@/components/header/DashboardHeader";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import MaintenanceDetails from "@/components/maintenance/element/MaintenanceDetails";
import MaintenanceInfo from "@/components/maintenance/element/MaintenanceInfo";
import PauseModal from "@/components/maintenance/element/PauseModal";
import NoteModal from "@/components/maintenance/element/NoteModal";
import { fetchMaintenanceJob } from "@/api/maintenance";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n";

export default function ElementPage({ params }) {
  const [isOpen, setIsOpen] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  
  const params2 = useParams();
  const jobId = params2.elem;

  //const maintenanceInfo = maintenanceData.find((item) => item.job_id === jobId);
 
  let bgColor = "bg-gray-400";
  let textColor = "text-white"; 

  const [maintenancedata, setMaintenanceData] = useState(false);


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

  useEffect(() => {
          fetchMaintenanceJob(jobId).then((data) => {
            setMaintenanceData(data || []);
          });
      }, [jobId]);

  const { t, i18n } = useTranslation("maintenance");
  const [mounted, setMounted] = useState(false);
    
  useEffect(() => {
    setMounted(true);
  }, []);
    
  if (!mounted || !i18n.isInitialized) return null;

  return (
    <div className="flex flex-col bg-[#001c38] text-white p-4">
      <DashboardHeader />

      <div className="flex w-full items-center mt-4">
        <Breadcrumbs />
      </div>

      <div className="flex items-center pt-2 pb-4">
        <div className='flex items-center gap-4'>
          <h2 className="text-2xl font-bold">{maintenancedata.job_id}</h2>
          <div className={`rounded-full py-1 px-4 ${bgColor} ${textColor}`}>
            {maintenancedata.data_recovery_expiration}
          </div>
        </div>

        <div className='ml-auto flex items-center gap-4'>
          <button
            type="submit"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md flex items-center bg-[#022a52] hover:bg-blue-500 text-white font-bold py-2 px-4 transition duration-200 cursor-pointer"
          >
              <svg width="16px" height="16px" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"/></svg> 
              &nbsp;&nbsp; {t("pause")}
          </button>

          <button
            type="submit"
            className="rounded-md flex items-center bg-[#022a52] hover:bg-blue-500 text-white font-bold py-2 px-4 transition duration-200 cursor-pointer"
          >
              <svg width="16px" height="16px" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
              &nbsp;&nbsp; {t("start")}
          </button>

          <button
            type="submit"
            onClick={() => setNoteModal(!noteModal)}
            className="rounded-md flex items-center bg-[#789fd6] hover:bg-blue-500 text-white font-bold py-1 px-4 transition duration-200 cursor-pointer"
          >
            <svg width="16px" height="16px" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
            &nbsp;&nbsp; {t("add_note")}
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
            <MaintenanceDetails details={maintenancedata} />
          </div>
        </div>

        <div className="w-1/4 bg-[#022a52] p-4 rounded-md">
          <MaintenanceInfo details={maintenancedata}/>
        </div>
      </div>
    </div>
  );
}
