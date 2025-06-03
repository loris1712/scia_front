"use client"

import { useState, useEffect } from "react";
import DashboardHeader from "@/components/header/DashboardHeader";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import ReadingsDetails from "@/components/readings/element/ReadingsDetails";
import ReadingsInfo from "@/components/readings/element/ReadingsInfo";
import PauseModal from "@/components/readings/element/PauseModal";
import NoteModal from "@/components/readings/element/NoteModal";
import { useParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { getReading } from "@/api/readings";
import { useTranslation } from "@/app/i18n";

export default function ElementPage({ params }) {
  const [isOpen, setIsOpen] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  
  const params2 = useParams();
  const readingId = params2.elem;

  const { user } = useUser();
  const [tasksData, setTasksData] = useState([]);

    const loadTasks = async () => {
      try {
        const fetchReading = await getReading(readingId, user?.id);
        console.log(fetchReading)
        setTasksData(fetchReading);
      } catch (err) {
        console.error(err);
      } finally {
      }
    };
  
    useEffect(() => {
      loadTasks();
    }, [readingId, user]);

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
        <Breadcrumbs title={tasksData?.[0]?.task_name} position="last" />
      </div>

      <div className="flex items-center pt-2 pb-4">
        <div className='flex items-center gap-4'>
          <h2 className="text-2xl font-bold">{tasksData?.[0]?.task_name || 'Caricamento...'}</h2>
        </div>

        <div className='ml-auto flex items-center gap-4'>
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
            <ReadingsDetails details={tasksData} />
          </div>
        </div>

        <div className="w-1/4 bg-[#022a52] p-4 rounded-md">
          <ReadingsInfo details={tasksData}/>
        </div>
      </div>
    </div>
  );
}
