import { useState, useEffect } from "react";
import FailuresRow from "./FailuresRow";
import LegendModal from "./LegendModal";
import FilterModal from "./FilterModal";
import FailuresModal from "./FailuresModal";
import { getFailures } from "@/api/failures";

const FailuresTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [addFailureOpen, setAddFailureOpen] = useState(false);
  const [failures, setFailures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFailures() {
      try {
        const data = await getFailures();
        setFailures(data);
      } catch (error) {
        console.error("Errore durante il fetch delle avarie:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFailures();
  }, []);

  return (
    <div className="w-full mx-auto rounded-lg shadow-md">
      <div className="items-center flex mb-2">
        <button
          className="text-white text-2xl font-semibold flex items-center gap-2 py-2 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Avarie ({failures.length})
        </button>

        <div className="flex items-center ml-auto gap-4">
          {/* Gravitá Button */}
          <button
            type="submit"
            onClick={() => setFilterOpen(true)}
            className="rounded-md flex items-center bg-[#022a52] text-white font-bold py-2 px-6 transition duration-200 cursor-pointer"
          >
            <div className="w-4 h-4 rounded-full relative">
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-red-600 rounded-tl-full"></div>
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-orange-500 rounded-tr-full"></div>
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-green-500 rounded-bl-full"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-400 rounded-br-full"></div>
            </div>
            &nbsp;&nbsp; Gravitá
          </button>

          {/* Filtri Button */}
          <button
            type="submit"
            onClick={() => setFilterOpen(true)}
            className="rounded-md flex items-center bg-[#022a52] text-white font-bold py-2 px-6 transition duration-200 cursor-pointer"
          >
            <svg width="18px" height="18px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M3.9 22.9C10.5 8.9 24.5 0 40 0L472 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L396.4 195.6C316.2 212.1 256 283 256 368c0 27.4 6.3 53.4 17.5 76.5c-1.6-.8-3.2-1.8-4.7-2.9l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 65.3C-.7 53.4-2.8 36.8 3.9 22.9zM432 224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm59.3 107.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L432 345.4l-36.7-36.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L409.4 368l-36.7 36.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L432 390.6l36.7 36.7c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L454.6 368l36.7-36.7z"/></svg>

            &nbsp; Filtri
          </button>

          {/* Aggiungi Avaria Button */}
          <button
            type="submit"
            onClick={() => setAddFailureOpen(true)}
            className="rounded-md flex items-center bg-[#789fd6] text-white font-bold py-2 px-6 transition duration-200 cursor-pointer"
          >
            <svg width="18px" height="18px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
            &nbsp; Aggiungi avaria
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[3fr_1fr_1fr_1fr] text-black/70 bg-white rounded-t-lg font-semibold" style={{ paddingLeft: `8px` }}>
        <p className="border-r border-t border-b border-[#022a52] p-3">Titolo / ESWBS</p>
        <p className="border border-[#022a52] p-3 text-center">Note</p>
        <p className="border border-[#022a52] p-3 text-center flex items-center" style={{ justifyContent: "center" }}>
          Utente
        </p>
        <p className="border border-[#022a52] p-3 text-center">Data di inserimento</p>
      </div>

      {loading ? (
        <div className="text-white p-4">Caricamento in corso...</div>
      ) : failures.length === 0 ? (
        <div className="text-white p-4">Nessuna avaria trovata.</div>
      ) : (
        failures.map((item) => <FailuresRow key={item.id} data={item} />)
      )}

      <FailuresModal isOpen={addFailureOpen} onClose={() => setAddFailureOpen(false)} />
      <FilterModal isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
};

export default FailuresTable;
