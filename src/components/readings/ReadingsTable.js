import { useState, useEffect } from "react";
import ReadingsRow from "./ReadingsRow";
import SelectModal from "./SelectModal";
import LegendModal from "./LegendModal";
import FilterModal from "./FilterModal";
import { getReadings } from "@/api/readings";
import { useUser } from "@/context/UserContext";

const ReadingsTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [legendOpen, setLegendOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shipId = 1;
  const { user } = useUser();

  const loadTasks = async () => {
    try {
      setLoading(true);
      const fetchReadings = await getReadings(shipId, user?.id);
      console.log(fetchReadings)
      setTasksData(fetchReadings);
    } catch (err) {
      setError("Errore nel recupero dei task");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [shipId, user]);

  const handleSelectType = (type) => {
    setSelectedType(type);
    setIsOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const tasksToShow = selectedType
  ? tasksData.filter((task) => task.type.id === selectedType.id)
  : tasksData;

  return (
    <div className="w-full mx-auto rounded-lg shadow-md">
      <div className="items-center flex mb-2">
        <button
          className="text-white text-2xl font-semibold flex items-center gap-2 py-2 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          {selectedType ? `${selectedType.name} (${selectedType.taskCount})` : "Visualizza tutti"}
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

      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-black/70 bg-white rounded-t-lg font-semibold">
        <p className="border border-[#022a52] p-3">Task / ESWBS</p>
        <p className="border border-[#022a52] p-3 text-center">Ricorrenza</p>
        <p className="border border-[#022a52] p-3 text-center">Note</p>
        <p className="border border-[#022a52] p-3 text-center">Valore</p>
      </div>

      {tasksToShow.map((task) => {
        return <ReadingsRow key={task.id} data={task} />;
      })}

      <SelectModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSelect={handleSelectType} datas={tasksData} />

      <LegendModal isOpen={legendOpen} onClose={() => setLegendOpen(false)} />

      <FilterModal isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
        
    </div>
  );
};

export default ReadingsTable;