import { useTranslation } from "@/app/i18n";
import { useState, useEffect } from "react";


const StatusBadgeDetail = ({ dueDate, pauseDate, string }) => {
  let bgColor = "bg-gray-400"; // Default color
  let textColor = "text-white";
  let symbol= "+" 
  
  const today = new Date();
  const dueDate2= new Date(dueDate);
  const dueDays = Math.ceil((dueDate2 - today) / (1000 * 60 * 60 * 24));

  if(string == "inPause"){
    bgColor = "bg-[rgba(255,255,255,0.2)]"; 
    symbol = "";
  }else if (dueDays < 0) {
    // SCADUTA → Rosso
    bgColor = "bg-[rgb(208,2,27)]"; // Rosso
    symbol = "+";
  } else if (dueDays <= 5) {
    // Scadenza urgente → Arancione
    bgColor = "bg-[rgb(244,114,22)]"; // Arancione
    symbol = "-";
  } else if (dueDays <= 15) {
    // Scadenza non urgente → Giallo
    bgColor = "bg-[rgb(255,191,37)]"; // Giallo
    textColor = "text-black";
    symbol = "-";
  } else {
    // Ancora tempo → Verde
    bgColor = "bg-[rgb(45,182,71)]"; // Verde
    symbol = "-";
  }


  const { t, i18n } = useTranslation("maintenance");
      const [mounted, setMounted] = useState(false);
        
      useEffect(() => {
        setMounted(true);
      }, []);
        
      if (!mounted || !i18n.isInitialized) return null;

  return (
    <div className={`w-[fit-content] sm:text-[16px] text-[12px] rounded-full py-1 px-4 ${bgColor} ${textColor}`}>
      {t(string)} {t("from")}&nbsp;

      {string == "inPause" && pauseDate && 
        new Date(pauseDate).toLocaleDateString("it-IT")
      }
            {dueDate !== "N/A"
                ? new Date(dueDate).toLocaleDateString("it-IT")
                : "N/A"}
          </div>
  );
};

export default StatusBadgeDetail;
  