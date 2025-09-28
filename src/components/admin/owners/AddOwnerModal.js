"use client";
import { useState } from "react";
import { X, Plus, Save } from "lucide-react";

export default function AddOwnersModal({ onClose }) {
  const [newOwners, setNewOwners] = useState([
    { name: "", email: "", phone: "", company: "", active: true },
  ]);
  const [activeTab, setActiveTab] = useState(0);

  const handleOwnerChange = (index, field, value) => {
    const updated = [...newOwners];
    updated[index][field] = value;
    setNewOwners(updated);
  };

  const addOwnerRow = () =>
    setNewOwners([...newOwners, { name: "", email: "", phone: "", company: "", active: true }]);

  const removeOwnerRow = (index) =>
    setNewOwners(newOwners.filter((_, i) => i !== index));

  const submitOwners = () => {
    console.log("Submit owners", newOwners);
    onClose();
  };

  const inputClass =
    "px-4 py-2 rounded-xl bg-gray-50 text-gray-900 border border-gray-200 placeholder-gray-400 focus:outline-none transition";

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-3xl relative text-gray-900">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition cursor-pointer"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-semibold mb-6 text-gray-900">Aggiungi Nuovi Owners</h3>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {newOwners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition whitespace-nowrap cursor-pointer ${
                activeTab === idx
                  ? "bg-blue-100 text-blue-600 shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Owner {idx + 1}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="space-y-4 max-h-[55vh] overflow-y-auto">
          {newOwners.map((owner, idx) => (
            <div key={idx} className={activeTab === idx ? "block" : "hidden"}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome Owner"
                  className={inputClass}
                  value={owner.name}
                  onChange={(e) => handleOwnerChange(idx, "name", e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={inputClass}
                  value={owner.email}
                  onChange={(e) => handleOwnerChange(idx, "email", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Telefono"
                  className={inputClass}
                  value={owner.phone}
                  onChange={(e) => handleOwnerChange(idx, "phone", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Azienda"
                  className={inputClass}
                  value={owner.company}
                  onChange={(e) => handleOwnerChange(idx, "company", e.target.value)}
                />
              </div>
              <button
                onClick={() => removeOwnerRow(idx)}
                className="mt-3 text-red-500 hover:text-red-600 font-medium transition flex items-center gap-1 cursor-pointer"
              >
                <X size={16} /> Rimuovi Owner
              </button>
            </div>
          ))}
        </div>

        {/* Bottom action buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={addOwnerRow}
            className="flex items-center gap-2 px-5 py-3 bg-blue-200/30 hover:bg-blue-200 text-blue-600 font-semibold rounded-2xl cursor-pointer transition"
          >
            <Plus size={18} /> Aggiungi Owner
          </button>
          <button
            onClick={submitOwners}
            className="flex items-center gap-2 px-6 py-3 bg-green-200/30 hover:bg-green-200 text-green-600 font-semibold rounded-2xl cursor-pointer transition"
          >
            <Save size={18} /> Salva Tutti
          </button>
        </div>
      </div>
    </div>
  );
}
