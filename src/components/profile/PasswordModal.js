"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getUserSecuritySettings, updateUserSecuritySettings } from "@/api/user";

export default function PasswordModal({ userId, onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [useQuickPin, setUseQuickPin] = useState(false);
  const [useBiometric, setUseBiometric] = useState(false);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showConfirmPinPopup, setShowConfirmPinPopup] = useState(false);
  const [passwordForPin, setPasswordForPin] = useState("");

  useEffect(() => {
    async function fetchSecuritySettings() {
      const settings = await getUserSecuritySettings(userId);
      if (settings) {
        setUseQuickPin(settings.pin_enabled || false);
        setUseBiometric(settings.biometric_enabled || false);
      }

    }
    fetchSecuritySettings();
  }, []);

  async function handleSave() {
    if (newPassword !== confirmPassword) {
      alert("Le password non coincidono!");
      return;
    }
    if (pin && pin !== confirmPin) {
      alert("Il PIN non coincide!");
      return;
    }

    if (useQuickPin && !pin) {
      setShowConfirmPinPopup(true);
      return;
    }

    await saveSettings();
  }

  async function saveSettings() {
    const updatedData = {
      oldPassword,
      userId,
      newPassword,
      pin: pin || null,
      useQuickPin,
      useBiometric,
      passwordForPin: passwordForPin || null,
    };

    const response = await updateUserSecuritySettings(updatedData);
    if (response) {
      onClose();
    } else {
      console.error("Errore nell'aggiornamento delle impostazioni");
    }
  }

  async function handleConfirmPin() {
    if (!passwordForPin) {
      alert("Inserisci la password per confermare il PIN!");
      return;
    }

    await saveSettings();
    setShowConfirmPinPopup(false);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000ab] bg-opacity-50 z-2">
      <div className="bg-[#022a52] w-[70%] p-5 rounded-md shadow-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[26px] font-semibold">Sicurezza</h2>
          <button className="text-white text-xl cursor-pointer" onClick={onClose}>
            <svg width="24px" height="24px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-[#789FD6] text-sm">Vecchia Password</label>
            <input type="password" placeholder="Vecchia Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none mt-2" />
          </div>
          <div>
            <label className="text-[#789FD6] text-sm">Nuova Password</label>
            <input type="password" placeholder="Nuova Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none mt-2" />
          </div>
        </div>

        <div>
          <label className="text-[#789FD6] text-sm">Conferma Password</label>
          <input type="password" placeholder="Conferma Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none mt-2" />
        </div>

        <div className="flex items-center space-x-4 mb-4 mt-4 w-full">
          <label className="flex items-center w-1/2">
            <input type="checkbox" checked={useQuickPin} onChange={() => setUseQuickPin(!useQuickPin)} className="mr-2 cursor-pointer w-[16px] h-[16px] appearance-none border-2 border-[#ffffff20] bg-transparent rounded-sm transition-all duration-200 
             checked:bg-[#789fd6] checked:border-[#789fd6] hover:opacity-80 focus:outline-none" />
            Utilizza PIN di accesso rapido
          </label>
          <label className="flex items-center w-1/2">
            <input type="checkbox" checked={useBiometric} onChange={() => setUseBiometric(!useBiometric)} className="mr-2 cursor-pointer w-[16px] h-[16px] appearance-none border-2 border-[#ffffff20] bg-transparent rounded-sm transition-all duration-200 
             checked:bg-[#789fd6] checked:border-[#789fd6] hover:opacity-80 focus:outline-none" />
            Attiva riconoscimento biometrico
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-[#789FD6] text-sm">Inserisci PIN</label>
            <input type="password" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none mt-2" />
          </div>
          <div>
            <label className="text-[#789FD6] text-sm">Conferma PIN</label>
            <input type="password" placeholder="Conferma PIN" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none mt-2" />
          </div>
        </div>

        <button className="w-full bg-[#789fd6] p-3 mt-4 text-white font-semibold cursor-pointer rounded-md" onClick={handleSave}>
          Salva
        </button>
      </div>

      {showConfirmPinPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000ab] bg-opacity-50 z-10">
          <div className="bg-[#022a52] p-5 rounded-md shadow-lg text-white w-[40%]">
            <h3 className="text-lg font-semibold mb-3">Conferma PIN</h3>
            <p className="text-sm mb-3">Inserisci la tua password per confermare l'uso del PIN</p>
            <input
              type="password"
              placeholder="Password"
              value={passwordForPin}
              onChange={(e) => setPasswordForPin(e.target.value)}
              className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none mt-2"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button className="bg-gray-500 px-4 py-2 rounded" onClick={() => setShowConfirmPinPopup(false)}>Annulla</button>
              <button className="bg-[#789fd6] px-4 py-2 rounded" onClick={handleConfirmPin}>Conferma</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}