"use client";

import { useState, useEffect } from "react";
import FacilitiesModal from "./FacilitiesModal";
import { addFailure } from "@/api/failures";
import { useUser } from "@/context/UserContext";

export default function FailureModal({ isOpen, onClose, data }) {
  const [title, setTitle] = useState('');
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleClearEan13 = () => setEan13('');
  const [facilitiesOpen, setFacilitiesOpen] = useState(false);
  const [description, setDescription] = useState('');

  const [date, setDate] = useState('');
  const handleDate = (e) => setDate(e.target.value);

  const [gravity, setGravity] = useState('');
  const handleGravity = (e) => setGravity(e.target.value);
  
  const [executionUserType, setExecutionUserType] = useState('');
  const handleExecutionUserType = (e) => setExecutionUserType(e.target.value);

  const [userExecution, setUserExecution] = useState('');
  const handleUserExecution = (e) => setUserExecution(e.target.value);

  const [partNumber, setPartNumber] = useState('');
  const handlePartNumberChange = (e) => setPartNumber(e.target.value);

  const [customFields, setCustomFields] = useState([{ name: '', value: '' }]);

  const handleCustomFieldChange = (index, field, value,) => {
    const updatedFields = [...customFields];
    updatedFields[index][field] = value;
    setCustomFields(updatedFields);
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { name: '', value: '' }]);
  };

  const removeCustomField = (index) => {
    const updatedFields = [...customFields];
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };

  const { user } = useUser();

  const handleSubmit = async () => {
    const resolvedExecutionUserType =
    executionUserType === "connected_user" ? user?.id : executionUserType;
  
    const payload = {
      title,
      description,
      date,
      gravity,
      executionUserType: executionUserType,
      userExecution: resolvedExecutionUserType,
      partNumber,
      customFields,
    };
  console.log(payload)
    try {
      const response = await addFailure(payload);
      console.log("Avaria creata con successo:", response);
      onClose();
    } catch (error) {
      console.error("Errore durante la creazione dell'avaria:", error);
    }
  };
  

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
      <div className="bg-[#022a52] w-[50%] p-6 rounded-md shadow-lg text-white" style={{overflowY: 'scroll', height: '70vh'}}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[22px] font-semibold">Aggiungi avaria</h2>
          <button className="text-white text-xl cursor-pointer" onClick={onClose}>
            <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-[#789FD6] text-sm mb-2">Titolo</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="Scrivi qui..."
                      className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none rounded-md"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[#789FD6] text-sm mb-2">Impianto/Componente</label>
                  <div
                    onClick={() => setFacilitiesOpen(true)}
                    className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none rounded-md flex cursor-pointer"
                  >
                    Scegli <span style={{marginLeft:'auto'}}>
                      <svg fill="white" width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-[#789FD6] text-sm mb-2">Descrizione</label>
                    <textarea
                      value={description}
                      placeholder="Scrivi qui..."
                      onChange={(e) => setDescription(e.target.value)}
                      className="px-4 py-2 bg-[#ffffff10] text-white focus:outline-none rounded-md"
                    />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-[#789FD6] text-sm mb-2">Data</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={handleDate}
                      className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none rounded-md"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[#789FD6] text-sm mb-2">Gravitá</label>
                  <div className="relative">
                  <select
                    value={gravity}
                    onChange={handleGravity}
                    className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none rounded-md"
                  >
                    <option value="">Seleziona gravità</option>
                    <option value="critica">Critica</option>
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="bassa">Bassa</option>
                  </select>

                  </div>
                </div>
                
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-[#789FD6] text-sm mb-2">Tipologia utente esecutore</label>
                  <div className="relative">
                    <select
                      value={executionUserType}
                      onChange={handleExecutionUserType}
                      className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none rounded-md"
                    >
                      <option value="">Seleziona tipologia</option>
                      <option value="connected_user">Utente connesso</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[#789FD6] text-sm mb-2">Utente esecutore</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={user?.firstName + ' ' + user?.lastName}
                      readOnly
                      className="w-full px-4 py-2 bg-[#ffffff10] text-[#ffffff20] focus:outline-none rounded-md"
                    />
                  </div>
                </div>
                
              </div>

                {customFields.map((field, index) => (
                  <div key={index} className="flex gap-4 mb-4 items-end">
                  <div className="flex flex-col" style={{ width: '49%' }}>
                    <label className="text-[#789FD6] text-sm mb-2">Nome</label>
                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) => handleCustomFieldChange(index, 'name', e.target.value)}
                      placeholder="Scrivi qui..."
                      className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none rounded-md"
                    />
                  </div>
                
                  <div className="flex flex-col" style={{ width: '40%' }}>
                    <label className="text-[#789FD6] text-sm mb-2">Valore</label>
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => handleCustomFieldChange(index, 'value', e.target.value)}
                      placeholder="Scrivi qui..."
                      className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none rounded-md"
                    />
                  </div>
                
                  <div className="flex items-center justify-center" style={{ width: '5%' }}>
                    <button
                      type="button"
                      onClick={() => removeCustomField(index)}
                      className="mb-2 text-white bg-red-500 hover:bg-red-600 w-6 h-6 rounded-full flex items-center justify-center text-sm"
                      title="Rimuovi campo"
                    >
                      −
                    </button>
                  </div>
                </div>
                
                
                ))}

              <button
                type="button"
                onClick={addCustomField}
                className="cursor-pointer ml-auto mr-auto flex items-center bg-transparent hover:bg-transparent text-white font-medium py-2 px-4 rounded-md"
              >
                <svg fill="#fff" width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg> &nbsp; Aggiungi campo custom
              </button>

        <button
          className="w-full bg-[#789fd6] p-3 mt-4 text-white font-semibold mt-6 rounded-md cursor-pointer"
          onClick={handleSubmit}
        >
          Conferma
        </button>
      </div>

      <FacilitiesModal isOpen={facilitiesOpen} onClose2={() => setFacilitiesOpen(false)} />
      
    </div>
  ) : null;
}
