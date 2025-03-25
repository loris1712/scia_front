import { useState } from "react";
import MaintenanceRow from "./MaintenanceRow";
import { maintenanceData } from "@/api/maintenance";
import SelectModal from "./SelectModal";
import LegendModal from "./LegendModal";
import FilterModal from "./FilterModal";

const maintenanceTypes = [
  { id: 1, title: "Manutenzioni ordinarie", tasks: 12, dueDate: "10/05/2024", lastExecution: "09/05/2024" },
  { id: 2, title: "Manutenzioni straordinarie", tasks: 20, dueDate: "21/05/2024", lastExecution: "18/04/2024" },
  { id: 3, title: "Manutenzioni annuali", tasks: 7, dueDate: "24/05/2024", lastExecution: "22/04/2024" },
  { id: 4, title: "Manutenzioni extra", tasks: 31, dueDate: "21/05/2024", lastExecution: "18/04/2024" },
];

const MaintenanceTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(maintenanceTypes[0]);
  const [legendOpen, setLegendOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSelectType = (type) => {
    setSelectedType(type);
    setIsOpen(false);
  };

  return (
    <div className="w-full mx-auto rounded-lg shadow-md">
      
      <div className="items-center flex mb-2">
        <button
          className="text-white text-2xl font-semibold flex items-center gap-2 py-2 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          {selectedType.title} ({selectedType.tasks}) &nbsp;
          <svg width="18px" height="18px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
          </svg>
        </button>

        <button
          type="submit"
          onClick={() => setFilterOpen(true)}
          className={'rounded-md flex items-center ml-auto bg-[#022a52] text-white font-bold py-2 px-6 transition duration-200 cursor-pointer'}
        >
          <svg width="18px" height="18px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M3.9 22.9C10.5 8.9 24.5 0 40 0L472 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L396.4 195.6C316.2 212.1 256 283 256 368c0 27.4 6.3 53.4 17.5 76.5c-1.6-.8-3.2-1.8-4.7-2.9l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 65.3C-.7 53.4-2.8 36.8 3.9 22.9zM432 224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm59.3 107.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L432 345.4l-36.7-36.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L409.4 368l-36.7 36.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L432 390.6l36.7 36.7c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L454.6 368l36.7-36.7z"/></svg>
            &nbsp; Filtri
        </button>
      </div>

      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] text-black/70 bg-white rounded-t-lg font-semibold"
      
      style={{ paddingLeft: `8px` }}>
        <p className="border-r border-t border-b border-[#022a52] p-3">Task / ESWBS</p>
        <p className="border border-[#022a52] p-3 text-center">Esecuzione</p>
        <p className="border border-[#022a52] p-3 text-center">Note</p>
        <p className="border border-[#022a52] p-3 text-center flex items-center" style={{justifyContent: "center"}}>
          Classificazione 
          <span onClick={() => setLegendOpen(true)}>
            <svg fill="#202124" className="ml-2 cursor-pointer" width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
          </span>
        </p>
        <p className="border border-[#022a52] p-3 text-center">Data di scadenza</p>
        <p className="border border-[#022a52] p-3 w-8 text-center"></p>
      </div>

      {maintenanceData.map((item) => (
        <MaintenanceRow key={item.id} data={item} />
      ))}

      <SelectModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSelect={handleSelectType} />

      <LegendModal isOpen={legendOpen} onClose={() => setLegendOpen(false)} />

      <FilterModal isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
        
    </div>
  );
};

export default MaintenanceTable;
