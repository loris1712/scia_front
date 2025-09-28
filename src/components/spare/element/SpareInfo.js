"use client";

import { useState } from "react";
import Istructions from "./Istructions";
import { useTranslation } from "@/app/i18n";

const MaintenanceInfo = ({ details }) => {
  const [showIstructions, setShowIstructions] = useState(false);

  const { t, i18n } = useTranslation("maintenance");
  if (!i18n.isInitialized) return null;

  return (
    <div className="p-2">
      {details && details[0].description > 0 &&
      <div className="mb-6">
        <h2 className="text-lg text-[#789fd6] mb-2">{t("description")}</h2>

                      <p
                        className={`text-white`}
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                        }}
                      >
                        {details && details.length > 0 ? details[0].description : "Non disponibile"}
                      </p>

                        <button
                          className="text-sm text-[#fff] w-fit cursor-pointer bg-[#ffffff1a] py-1 px-4 rounded mt-4"
                          onClick={() => setShowIstructions(true)}
                        >
                          {t("details")}
                        </button>
              </div>
        }
      

      <div className="mb-6">

        <div className="flex items-center mb-2">
          <h2 className="text-lg text-[#789fd6]">{t("price")}</h2>
        </div>
        <p>{details && details.length > 0 ? details[0].Unitary_price : "Non disponibile"} euro</p>
      </div>

      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">Lead time</h2>
        </div>
      
        <div className="flex items-center gap-4">

        <p>{details && details[0].Provisioning_Lead_Time_PLT > 0 ? details[0].Provisioning_Lead_Time_PLT : "Non disponibile"}</p>
  
        </div>

      </div>


    {details && details[0].company > 0 && 
      <div className="mb-6">

        <div className="flex items-center mb-2 mt-4">
          <h2 className="text-lg text-[#789fd6]">{t("supplier")}</h2>
        </div>
      

        <div className="flex items-center gap-4">

        <p>{details && details[0].company > 0 ? details[0].company : "Non disponibile"}</p>
  
        </div>

      </div>
    }


    {details && details[0].NCAGE_supplier > 0 && 
          <div className="mb-6">

            <div className="flex items-center mb-2 mt-4">
              <h2 className="text-lg text-[#789fd6]">NCAGE {t("supplier")}</h2>
            </div>
          

            <div className="flex items-center gap-4">

            <p>{details && details[0].NCAGE_supplier > 0 ? details[0].NCAGE_supplier : "Non disponibile"}</p>
      
            </div>

          </div>
    }

      {showIstructions &&
        <Istructions data={details} onClose={() => setShowIstructions(false)} />
      }
      </div>
  );
};

export default MaintenanceInfo;