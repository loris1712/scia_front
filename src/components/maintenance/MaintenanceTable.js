import MaintenanceRow from "./MaintenanceRow";
import { maintenanceData } from "@/api/maintenance";

const MaintenanceTable = () => {
  return (
    <div className="w-full mx-auto bg-[#08274A] p-4 rounded-lg shadow-md">
      <h2 className="text-white text-xl font-semibold mb-4">Manutenzioni ordinarie (102)</h2>
      
      {/* Header della tabella */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] text-black/70 p-2 border-b border-white/20 bg-white rounded-t-lg font-semibold">
        <p>Task / ESWBS</p>
        <p>Esecuzione</p>
        <p>Note</p>
        <p>Classificazione</p>
        <p>Data di scadenza</p>
        <p className="w-8 text-center"></p> {/* Colonna per i 3 puntini */}
      </div>

      {/* Contenuto della tabella */}
      {maintenanceData.map((item) => (
        <MaintenanceRow key={item.id} data={item} />
      ))}
    </div>
  );
};

export default MaintenanceTable;
