"use client";
import { useState } from "react";
import { X, Plus, Save } from "lucide-react";
import { createUsers } from "@/api/admin/users";

export default function AddUsersModal({ onClose, onAdded }) {
  const [newUsers, setNewUsers] = useState([
    { first_name: "", last_name: "", email: "", password: "", role_name: "User" },
  ]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (index, field, value) => {
    const updated = [...newUsers];
    updated[index][field] = value;
    setNewUsers(updated);
  };

  const addUser = () =>
    setNewUsers([...newUsers, { first_name: "", last_name: "", email: "", password: "", role_name: "User" }]);

  const removeUser = (index) =>
    setNewUsers(newUsers.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await createUsers(newUsers);
      if (onAdded) onAdded();
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("Errore creazione utenti:", err);
      alert("Errore durante la creazione utenti");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-900";

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-semibold mb-6 text-gray-900">Aggiungi Nuovi Utenti</h3>

        <div className="flex gap-2 mb-4 overflow-x-auto">
          {newUsers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTab === idx
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Utente {idx + 1}
            </button>
          ))}
        </div>

        {newUsers.map((u, idx) => (
          <div key={idx} className={activeTab === idx ? "block" : "hidden"}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome"
                className={inputClass}
                value={u.first_name}
                onChange={(e) => handleChange(idx, "first_name", e.target.value)}
              />
              <input
                type="text"
                placeholder="Cognome"
                className={inputClass}
                value={u.last_name}
                onChange={(e) => handleChange(idx, "last_name", e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className={inputClass}
                value={u.email}
                onChange={(e) => handleChange(idx, "email", e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className={inputClass}
                value={u.password}
                onChange={(e) => handleChange(idx, "password", e.target.value)}
              />
              <input
                type="text"
                placeholder="Ruolo"
                className={inputClass}
                value={u.role_name}
                onChange={(e) => handleChange(idx, "role_name", e.target.value)}
              />
            </div>
            <button
              onClick={() => removeUser(idx)}
              className="mt-3 text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
            >
              <X size={16} /> Rimuovi Utente
            </button>
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            onClick={addUser}
            className="flex items-center gap-2 px-5 py-3 bg-blue-200/30 hover:bg-blue-200 text-blue-600 font-semibold rounded-2xl"
          >
            <Plus size={18} /> Aggiungi Utente
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold ${
              loading
                ? "bg-gray-300 text-gray-500"
                : "bg-green-200/30 hover:bg-green-200 text-green-600"
            }`}
          >
            <Save size={18} /> {loading ? "Salvataggio..." : "Salva Tutti"}
          </button>
        </div>
      </div>
    </div>
  );
}
