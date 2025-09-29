import { useState, useEffect, useRef } from "react";
import StatusBadge from "./StatusBadge";
import Icons from "./Icons";
import NotesModal from "./NotesModal";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n";
import { updateMaintenanceJobStatus } from "@/api/maintenance";
import Image from 'next/image';
import { getTextsGeneral, getPhotosGeneral, getAudiosGeneral } from "@/api/shipFiles";

const areaIcons = {
  "IV - BACINO": "/icons/shape.png",
  "In banchina": "/icons/dock.png",
  "In bacino": "/icons/drydock.png",
  "Esterno": "/icons/external.png",
};

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

const MaintenanceRow = ({ data }) => {
  const status = calculateStatus(data.ending_date);
  const today = new Date();
  const dueDate = new Date(data.ending_date);
  const dueDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

  const [isOpen, setIsOpen] = useState(false);

  const cameraStatus = data.photographicNotes.length > 0 ? "good" : "default";
  const micStatus = data.vocalNotes.length > 0 ? "good" : "default";
  const docStatus = data.textNotes.length > 0 ? "good" : "default";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getStatusColor = (dueDays) => {
    if(data.status_id == 3){
      return "rgba(255,255,255,0.2)"
    }else if (dueDays < 0) {
      // Scaduta → Rosso
      return "#d0021b";
    } else if (dueDays <= 5) {
      // Urgente → Arancione
      return "rgb(244,114,22)";
    } else if (dueDays <= 15) {
      // Non urgente → Giallo
      return "#ffbf25";
    } else if (dueDays > 15) {
      // Ancora tempo → Verde
      return "rgb(45,182,71)";
    }
    return "#CCCCCC"; // Default
  };

  const handleOptionClick = async (option) => { 
    await updateMaintenanceJobStatus(data.id, option);
    setIsDropdownOpen(false);
    router.refresh();
  };

  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/dashboard/maintenance/${data.id}`);
  };

  const { t, i18n } = useTranslation("maintenance");
  const [mounted, setMounted] = useState(false);
    
  useEffect(() => {
    setMounted(true);
  }, []);
    
  if (!mounted || !i18n.isInitialized) return null;

  return (
    <div>

    <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center border-b border-[#001c38] bg-[#022a52] cursor-pointer"
      style={{ borderLeft: `8px solid ${getStatusColor(dueDays)}` }}
    >
      <div onClick={handleRowClick} className="border border-[#001c38] p-3 flex flex-col justify-center min-h-[60px]" style={{ height: "-webkit-fill-available" }}>

        <p className="text-white text-[18px] font-semibold">
          {(() => {
            if (!data.job?.name) return "";
            const text = data.job.name.toLowerCase();
            const formatted =
              text.charAt(0).toUpperCase() + text.slice(1);
            return formatted.length > 45
              ? formatted.substring(0, 45) + "..."
              : formatted;
          })()}
        </p>

        <p className="text-white/60 text-[16px] text-sm truncate">
          {(() => {
            if (!data.Element?.name) return "";
            const text = data.Element.name.toLowerCase();
            return text.charAt(0).toUpperCase() + text.slice(1);
          })()}
        </p>

      </div>

      <div onClick={handleRowClick} className="border border-[#001c38] p-3 text-center text-white flex flex-col items-center gap-2" style={{ height: "-webkit-fill-available" }}>
        <p className="text-[18px] text-white">{data?.job?.maintenance_list?.recurrencyType?.name}</p>
        <div className="flex items-center gap-2">
          {areaIcons[data.job.maintenance_list.maintenance_level?.Level_MMI] 
          && <img src={areaIcons[data.job.maintenance_list.maintenance_level?.Level_MMI]} alt={data.job.maintenance_list.maintenance_level?.Level_MMI} className="w-4 h-4" />}
          <p className="text-[16px] text-[#67c2ae]">{data.job.maintenance_list.maintenance_level?.Level_MMI} {t("level")}</p>
        </div>
      </div>

      <div className="border border-[#001c38] p-3 flex items-center justify-center cursor-pointer" onClick={
          data.photographicNotes.length > 0 || data.vocalNotes.length > 0 || data.textNotes.length > 0
            ? () => setIsOpen(true)
            : undefined
        } style={{ height: "-webkit-fill-available" }}>
        <div className="flex gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="currentColor"
            className={`w-6 h-6 ${statusColors[cameraStatus]}`}
          >
            <path d="M288 144a128 128 0 1 0 0 256 128 128 0 1 0 0-256zm0 208a80 80 0 1 1 0-160 80 80 0 1 1 0 160zm288-80c0 106-86 192-192 192H192C86 464 0 378 0 272V240c0-35 29-64 64-64h48l29-58c6-12 18-20 32-20h192c14 0 26 8 32 20l29 58h48c35 0 64 29 64 64v32z"/>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            fill="currentColor"
            className={`w-6 h-6 ${statusColors[micStatus]}`}
          >
            <path d="M192 352a80 80 0 0 0 80-80V80a80 80 0 1 0-160 0v192a80 80 0 0 0 80 80zm128-128a16 16 0 1 0-32 0v48a96 96 0 1 1-192 0v-48a16 16 0 1 0-32 0v48c0 64 40 118 96 138v50h-40a16 16 0 1 0 0 32h128a16 16 0 1 0 0-32h-40v-50c56-20 96-74 96-138v-48z"/>
          </svg>

          <svg fill="currentColor" className={`w-6 h-6 ${statusColors[docStatus]}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
          </svg>
        </div>
      </div>

      <div className="border border-[#001c38] p-3 flex items-center justify-center gap-4" style={{ height: "-webkit-fill-available" }}>
       {data.ending_date &&
          <LegendItem icon="/icons/Shape-2.png" label={t("items.time_deadline")} />
       }

       {data.status.id == 2 &&
          <LegendItem icon="/icons/Path.png" label={t("items.planned_stop")} />
       }

       {data.execution_state == 2 &&
          <LegendItem icon="/icons/Path.png" label={t("items.planned_stop")} />
       }
      </div>

      <div className="border border-[#001c38]" style={{ height: "-webkit-fill-available" }}>
        <StatusBadge dueDate={data.ending_date} dueDays={dueDays} />
      </div>

      <div className="p-3 flex items-center justify-center w-8 relative" ref={dropdownRef}>
        <svg onClick={toggleDropdown} className="cursor-pointer" fill="white" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
          <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
        </svg>

        {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-20">
              <button
                className="block px-4 py-2 text-black hover:bg-gray-200 w-full text-left"
                onClick={() => handleOptionClick(3)}
              >
                {t("pause")}
              </button>
              <button
                className="block px-4 py-2 text-black hover:bg-gray-200 w-full text-left"
                onClick={() => handleOptionClick(1)}
              >
                {t("resume")}
              </button>
              <button
                className="block px-4 py-2 text-black hover:bg-gray-200 w-full text-left"
                onClick={handleRowClick}
              >
                {t("details")}
              </button>
            </div>
          )}
      </div>

    </div>

    <div
      className="flex sm:hidden flex-col bg-[#022a52] border-b border-[#001c38] rounded-md px-4 py-3 mb-4"
      style={{
        borderLeft: `8px solid ${getStatusColor(dueDays)}`,
      }}
    >
      <div className="flex items-start justify-between">
        <StatusBadge dueDate={data.ending_date} dueDays={dueDays} />

        <div className="relative" ref={dropdownRef}>
          <svg
            onClick={toggleDropdown}
            className="cursor-pointer"
            fill="white"
            width="20px"
            height="20px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 512"
          >
            <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
          </svg>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-20">
              <button className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200" onClick={() => handleOptionClick(2)}>
                {t("pause")}
              </button>
              <button className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200" onClick={() => handleOptionClick(1)}>
                {t("resume")}
              </button>
              <button className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200" onClick={handleRowClick}>
                {t("details")}
              </button>
            </div>
          )}
        </div>
      </div>

    {/* Job name + element info */}
    <div className="mt-4" onClick={handleRowClick}>
      <p className="text-white text-base font-semibold truncate">
        {data.job.name}
      </p>
      <p className="text-white/60 text-sm truncate">
        {data.Element?.element_model.LCN_name}
      </p>
    </div>

    {/* Legend Items */}
    <div className="mt-3 flex flex-wrap gap-3 items-center">
      {data.ending_date && (
        <LegendItem icon="/icons/Shape-2.png" label={t("items.time_deadline")} />
      )}
      {(data.status.id === 2 || data.execution_state === 2) && (
        <LegendItem icon="/icons/Path.png" label={t("items.planned_stop")} />
      )}
    </div>

    {/* Footer: icons and labels */}
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        {areaIcons[data.job.maintenance_list.maintenance_level?.Level_MMI] && (
          <img
            src={areaIcons[data.job.maintenance_list.maintenance_level?.Level_MMI]}
            alt={data.job.maintenance_list.maintenance_level?.Level_MMI}
            className="w-4 h-4"
          />
        )}
        <p className="text-white text-sm">{data.recurrencyType.name}</p>
      </div>

      <div className="text-[#ffffff60] hidden sm:inline">|</div>

      {/* Note Icons */}
      {(data.photographicNotes.length > 0 ||
        data.vocalNotes.length > 0 ||
        data.textNotes.length > 0) && (
        <div className="flex items-center gap-4" onClick={() => setIsOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="currentColor"
            className={`w-5 h-5 ${statusColors[cameraStatus]}`}
          >
              <path d="M288 144a128 128 0 1 0 0 256 128 128 0 1 0 0-256zm0 208a80 80 0 1 1 0-160 80 80 0 1 1 0 160zm288-80c0 106-86 192-192 192H192C86 464 0 378 0 272V240c0-35 29-64 64-64h48l29-58c6-12 18-20 32-20h192c14 0 26 8 32 20l29 58h48c35 0 64 29 64 64v32z"/>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            fill="currentColor"
            className={`w-5 h-5 ${statusColors[micStatus]}`}
          >
              <path d="M192 352a80 80 0 0 0 80-80V80a80 80 0 1 0-160 0v192a80 80 0 0 0 80 80zm128-128a16 16 0 1 0-32 0v48a96 96 0 1 1-192 0v-48a16 16 0 1 0-32 0v48c0 64 40 118 96 138v50h-40a16 16 0 1 0 0 32h128a16 16 0 1 0 0-32h-40v-50c56-20 96-74 96-138v-48z"/>
          </svg>
          <svg
            fill="currentColor"
            className={`w-5 h-5 ${statusColors[docStatus]}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
          </svg>
        </div>
      )}
    </div>
  </div>

    <NotesModal isOpen={isOpen} onClose={() => setIsOpen(false)} data={data} />

    </div>
  );
};

function LegendItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3">
      <Image src={icon} alt="icon" width={16} height={16} />
      
    </div>
  );
}

export default MaintenanceRow;