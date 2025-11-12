"use client";

export default function ProjectsFilters({ filters, setFilters }) {
  const inputClass =
    "px-3 py-2 rounded-full bg-gray-50 text-gray-900 border border-gray-300 placeholder-gray-400 text-sm transition-all duration-200 hover:bg-gray-100 focus:outline-none";

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {/* 🔍 Nome commessa */}
      <input
        type="text"
        placeholder="Nome commessa"
        className={inputClass}
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />

      {/* 👤 Responsabile */}
      <input
        type="text"
        placeholder="Responsabile"
        className={inputClass}
        value={filters.manager}
        onChange={(e) => setFilters({ ...filters, manager: e.target.value })}
      />

      {/* ⚙️ Stato */}
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className={inputClass}
      >
        <option value="">Tutti gli stati</option>
        <option value="active">Attiva</option>
        <option value="inactive">Inattiva</option>
      </select>
    </div>
  );
}
