"use client";
import { useState } from "react";
import { X, Plus, Save } from "lucide-react";

export default function AddUsersModal({ onClose }) {
  const [newUsers, setNewUsers] = useState([
    { first_name: "", last_name: "", email: "", role: "", active: true },
  ]);
  const [activeTab, setActiveTab] = useState(0);

  const handleNewUserChange = (index, field, value) => {
    const updated = [...newUsers];
    updated[index][field] = value;
    setNewUsers(updated);
  };

  const addNewUserRow = () =>
    setNewUsers([...newUsers, { first_name: "", last_name: "", email: "", role: "", active: true }]);
  const removeNewUserRow = (index) => setNewUsers(newUsers.filter((_, i) => i !== index));
  const submitNewUsers = () => {
    console.log("Submit users", newUsers);
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

        <h3 className="text-xl font-semibold mb-6 text-gray-900">Aggiungi Nuovi Utenti</h3>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
            {newUsers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-2 text-sm font-medium rounded-full transition whitespace-nowrap cursor-pointer ${
                  activeTab === idx
                    ? "bg-blue-100 text-blue-600 shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Utente {idx + 1}
              </button>
            ))}
          </div>


        {/* Tab content */}
        <div className="space-y-4 max-h-[55vh] overflow-y-auto">
          {newUsers.map((u, idx) => (
            <div key={idx} className={activeTab === idx ? "block" : "hidden"}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome"
                  className={inputClass}
                  value={u.first_name}
                  onChange={(e) => handleNewUserChange(idx, "first_name", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Cognome"
                  className={inputClass}
                  value={u.last_name}
                  onChange={(e) => handleNewUserChange(idx, "last_name", e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={inputClass}
                  value={u.email}
                  onChange={(e) => handleNewUserChange(idx, "email", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Ruolo"
                  className={inputClass}
                  value={u.role}
                  onChange={(e) => handleNewUserChange(idx, "role", e.target.value)}
                />
              </div>
              <button
                onClick={() => removeNewUserRow(idx)}
                className="mt-3 text-red-500 hover:text-red-600 font-medium transition flex items-center gap-1 cursor-pointer"
              >
                <X size={16} /> Rimuovi Utente
              </button>
            </div>
          ))}
        </div>

        {/* Bottom action buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={addNewUserRow}
            className="flex items-center gap-2 px-5 py-3 bg-blue-200/30 hover:bg-blue-200 text-blue-600 font-semibold rounded-2xl cursor-pointer transition"
          >
            <Plus size={18} /> Aggiungi Utente
          </button>
          <button
            onClick={submitNewUsers}
            className="flex items-center gap-2 px-6 py-3 bg-green-200/30 hover:bg-green-200 text-green-600 font-semibold rounded-2xl cursor-pointer transition"
          >
            <Save size={18} /> Salva Tutti
          </button>
        </div>
      </div>
    </div>
  );
}
