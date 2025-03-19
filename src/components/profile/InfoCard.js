"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PasswordModal from "./PasswordModal";
import { updateProfileData } from "@/api/profile";

export default function InfoCard({ data }) {

  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState(data?.firstName || "");
  const [lastName, setLastName] = useState(data?.lastName || "");
  const [email, setEmail] = useState(data?.email || "");
  const [phone, setPhone] = useState(data?.phoneNumber || "");
  const [rank, setRank] = useState(data?.rank || "");

  const militaryRanks = [
    { name: "Seleziona un grado", icon: "/icons/default-rank.svg" },
    { name: "Soldato", icon: "/icons/soldato.svg" },
    { name: "Colonnello t.ST", icon: "/icons/soldato.svg" },
    { name: "Caporale", icon: "/icons/caporale.svg" },
    { name: "Sergente", icon: "/icons/sergente.svg" },
    { name: "Maresciallo", icon: "/icons/maresciallo.svg" },
    { name: "Tenente", icon: "/icons/tenente.svg" },
    { name: "Capitano", icon: "/icons/capitano.svg" },
    { name: "Maggiore", icon: "/icons/maggiore.svg" },
    { name: "Colonnello", icon: "/icons/colonnello.svg" },
    { name: "Generale", icon: "/icons/generale.svg" },
  ];

  useEffect(() => {
    if (data) {
      setFirstName(data.firstName || "");
      setLastName(data.lastName || "");
      setEmail(data.email || "");

      const foundRank = militaryRanks.find((r) => r.name === data.rank);
      if (foundRank) setRank(foundRank);

      setPhone(data.phoneNumber || "");

      setSelectedRank(militaryRanks.find((r) => r.name === data.rank) || militaryRanks[0]
    );

    }
  }, [data]);

  const [selectedRank, setSelectedRank] = useState(
    militaryRanks.find((r) => r.name === data?.rank) || militaryRanks[0]
  );

  const [isOpen2, setIsOpen2] = useState(false);

  async function handleSave() {
    const updatedData = {
      userId: data?.id,
      firstName,
      lastName,
      email,
      phoneNumber: phone,
      rank: selectedRank?.name || rank,
    };

    const response = await updateProfileData(updatedData);
    if (response) {
      console.log("Profilo aggiornato con successo", response);
    } else {
      console.error("Errore nell'aggiornamento del profilo");
    }
  }

  return (
    <div className="bg-[#022a52] p-2 rounded-lg shadow-md text-white w-full">
      <div className="flex items-center mb-4">
      <Image
        src={data?.profileImage || "/icons/profile-default.svg"}
        alt="Profile Picture"
        width={80}
        height={80}
        className="rounded-full object-cover w-[80px] h-[80px]"
      />

      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="rounded-md text-left">
            <h3 className="text-sm text-[#789FD6] font-semibold mb-2">Tipo</h3>
            <p className="text-lg">{data?.type}</p>
          </div>

          <div className="rounded-md text-left">
            <h3 className="text-sm text-[#789FD6] font-semibold mb-2">Responsabile</h3>
            <p className="text-lg">{data?.teamLeader?.firstName} {data?.teamLeader?.lastName}</p>
          </div>

          <div className="rounded-md text-left">
            <h3 className="text-sm text-[#789FD6] font-semibold mb-2">Squadra</h3>
            <p className="text-lg">{data?.team?.name}</p>
          </div>

          <div className="rounded-md text-left">
            <h3 className="text-sm text-[#789FD6] font-semibold mb-2">Data di iscrizione</h3>
            <p className="text-lg">
              {data?.registrationDate
                ? new Date(data.registrationDate).toLocaleDateString("it-IT")
                : "N/A"}
            </p>          
          </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
            <label className="text-[#789FD6] text-sm mb-2">Nome</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="px-4 py-2 bg-[#ffffff10] text-white focus:outline-none "
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#789FD6] text-sm mb-2">Cognome</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="px-4 py-2 bg-[#ffffff10] text-white focus:outline-none "
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#789FD6] text-sm mb-2">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 bg-[#ffffff10] text-white focus:outline-none "
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#789FD6] text-sm mb-2">Telefono</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-4 py-2 bg-[#ffffff10] text-white focus:outline-none "
            />
          </div>

          <div className="flex flex-col relative">
            <label className="text-[#789FD6] text-sm mb-2">Grado</label>
            
            <button
              onClick={() => setIsOpen2(!isOpen2)}
              className="flex items-center w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none rounded-md"
            >
              <img src={selectedRank.icon} alt={selectedRank.name} className="w-6 h-6 mr-2" />
              {selectedRank.name}
              <span className="ml-auto">▼</span>
            </button>

            {/* Dropdown visibile solo se isOpen è true */}
            {isOpen2 && (
              <ul 
                style={{overflowY: 'scroll'}}
                className="absolute w-[50%] top-[100%] bg-[#022a52] text-white mt-1 rounded-md shadow-md">
                {militaryRanks.map((rank, index) => (
                  <li
                    key={index}
                    className="flex items-center px-4 py-2 hover:bg-[#789FD6] cursor-pointer"
                    onClick={() => {
                      setSelectedRank(rank);
                      setIsOpen(false);
                    }}
                  >
                    <img src={rank.icon} alt={rank.name} className="w-6 h-6 mr-2" />
                    {rank.name}
                  </li>
                ))}
              </ul>
            )}
          </div>


        <div className="flex flex-col">
            <label className="text-[#789FD6] text-sm mb-4">Sicurezza</label>
            <button className="items-center flex cursor-pointer"onClick={() => setIsOpen(true)}>
              <p>Imposta password e pin di accesso</p>

              <svg 
              width="18px"
              height="18px" 
              className="ml-auto"
              fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </button>
            
          </div>
      </div>

      {/* Ultima riga: Bottone Save */}
      <button className="w-full bg-[#789fd6] mt-4 cursor-pointer p-3 rounded-md text-white font-semibold" onClick={handleSave}>
        Save
      </button>

      {isOpen && <PasswordModal userId={data?.id} onClose={() => setIsOpen(false)} />}
      
    </div>
  );
}
