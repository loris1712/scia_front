'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PdfViewer from "@/components/manual/PdfViewer";
import SelectModal from "./SelectModal";
import { getFiles } from "@/api/shipFiles";
import { useUser } from "@/context/UserContext";
import { fetchElementData } from "@/api/elements";

const ManualInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSelectType = (type) => {
    setSelectedType(type);
    setIsOpen(false);
  };

  const { user } = useUser();
const shipId = user?.ships[0].id;

  const loadTasks = async () => {
      try {
        setLoading(true);
        const fetchedFiles = await getFiles(shipId, user?.id);
    
        setTasksData(fetchedFiles);
    
        if (fetchedFiles.length > 0) {
          setSelectedType(fetchedFiles[0]);
        }
      } catch (err) {
        setError("Errore nel recupero dei file");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
      loadTasks();
    }, [shipId, user]);

  return (
    <div>

        <div className="items-center flex">
          <button
            className="text-white text-2xl font-semibold flex items-center gap-2 py-2 cursor-pointer mt-2"
            onClick={() => setIsOpen(true)}
          >
            {selectedType ? `${selectedType.file_name}` : "Seleziona file"}
            <svg width="18px" height="18px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
            </svg>
          </button>

          <button
            type="submit"
            onClick={() => {
              if (selectedType?.file_link) {
                window.open(selectedType.file_link, "_blank");
              }
            }}
            className={'rounded-md flex items-center ml-auto bg-[#789fd6] text-white font-bold py-2 px-6 transition duration-200 cursor-pointer'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="white" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
              &nbsp; Download
          </button>
        </div>
        

      {selectedType && <PdfViewer fileUrl={selectedType.file_link} />}
      
      <SelectModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSelect={handleSelectType} files={tasksData} />
      
    </div>
  );
};

export default ManualInterface;
