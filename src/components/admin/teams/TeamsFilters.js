"use client";

import { Search } from "lucide-react";

export default function TeamsFilters({ filters, setFilters }) {
  const inputClass =
    "px-3 py-2 rounded-full bg-gray-50 text-gray-900 border border-gray-300 placeholder-gray-400 text-sm transition-all duration-200 hover:bg-gray-100 focus:outline-none";

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 bg-white p-3 rounded-xl shadow-sm">
      {/* 🔍 Ricerca libera */}
      <div className="relative flex-1 min-w-[250px]">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Cerca per nome squadra o persona..."
          className={`${inputClass} pl-8 w-full`}
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value.toLowerCase() })
          }
        />
      </div>

    </div>
  );
}
