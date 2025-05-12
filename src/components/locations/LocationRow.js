import { useState, useEffect, useRef } from "react";
import StatusBadge from "./StatusBadge";
import Icons from "./Icons";
import NotesModal from "./NotesModal";
import { useRouter } from "next/navigation";
import Image from 'next/image';

const statusColors = {
  good: "text-white",
  not_good: "text-orange-500",
  bad: "text-red-600",
  default: "text-white opacity-20",
};

const calculateStatus = (expirationDate) => {
  if (!expirationDate) return "sconosciuto";

  const today = new Date();
  const dueDate = new Date(expirationDate);
  const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "scaduto";
  if (diffDays <= 7) return "in_scadenza";
  return "ok";
};

const getStatusColor = (dueDays) => {
  if (dueDays < -15) {
    return "rgb(208,2,27)";
  } else if (dueDays < 0) {
    return "rgb(244,114,22)"; 
  } else if (dueDays <= 3) {
    return "rgb(255,191,37)";
  } else if (dueDays > 15) {
    return "rgb(45,182,71)";
  }
  return "#CCCCCC";
};

const LocationRow = ({ data }) => {

  console.log(data)
  const status = calculateStatus(data.data_recovery_expiration);
  const today = new Date();
  const dueDate = new Date(data.data_recovery_expiration);
  const dueDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

  const [isOpen, setIsOpen] = useState(false);

  const cameraStatus = data.img ? data.img_status || "good" : "default";
  const micStatus = data.audio ? data.audio_status || "good" : "default";
  const docStatus = data.note ? data.note_status || "good" : "default";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div
        className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center border-b border-[#001c38] bg-[#022a52]"
      >
        <div className="border border-[#001c38] p-3 flex flex-col justify-center min-h-[60px]" style={{ height: "-webkit-fill-available" }}> 
        {data.warehouseInfo ? ( 
          <p className="text-white text-[18px] font-semibold truncate flex items-center"> 
                <Image src={data.warehouseInfo.icon_url} alt="Element Icon" width={20} height={20} className="inline-block mr-2 opacity-60" />
                {data.warehouseInfo.name}        
          </p>
        ) : (
          <p className="text-white text-[18px] font-semibold truncate flex items-center"> 
            Nessun magazzino
          </p>
        )
        }
        </div>
        <div className="border border-[#001c38] p-3 text-center text-white justify-center flex flex-col items-center gap-2" style={{ height: "-webkit-fill-available" }}>
          <p className="text-[18px] text-white">{data.location}</p>
        </div>
        <div className="border border-[#001c38] p-3 flex items-center justify-center" onClick={() => setIsOpen(true)} style={{ height: "-webkit-fill-available" }}>
          <div className="flex gap-4">
            {data.spare_count}
          </div>
        </div>
        <div
          className={`border border-[#001c38] p-3 flex items-center justify-center`}
          style={{ height: "-webkit-fill-available" }}
        >
          <svg fill="white" width={"18px"} height={"18px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
        </div>
      </div>

      <NotesModal isOpen={isOpen} onClose={() => setIsOpen(false)} data={data} />
    </div>
  );
};

export default LocationRow;
