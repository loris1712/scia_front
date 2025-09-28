"use client";

export default function TeamsFilters({ filters, setFilters }) {
const inputClass =
    "px-3 py-2 rounded-full bg-gray-50 text-gray-900 border border-gray-300 placeholder-gray-400 text-sm transition-all duration-200 hover:bg-gray-100 focus:outline-none cursor-pointer";

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input
        type="text"
        placeholder="Nome Squadra"
        className={inputClass}
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email Responsabile"
        className={inputClass}
        value={filters.email}
        onChange={(e) => setFilters({ ...filters, email: e.target.value })}
      />
      <select
        value={filters.role}
        onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        className={inputClass}
      >
        <option value="">Tutti i ruoli</option>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
        <option value="Manager">Manager</option>
      </select>
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className={inputClass}
      >
        <option value="">Tutti gli stati</option>
        <option value="attivo">Attivo</option>
        <option value="disattivo">Disattivo</option>
      </select>
    </div>
  );
}
