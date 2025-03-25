"use client";

import { useState } from "react";
import FacilitiesList from "./FacilitiesList";

export default function ImpiantiTree() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <h2 className="text-3xl text-white mb-4">Impianti</h2>
      <div className="p-4 bg-[#022a52] rounded-lg">
        <input
          type="text"
          placeholder="Cerca per nome impianto…"
          className="w-full px-4 py-2 pr-10 bg-[#ffffff10] text-white rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FacilitiesList search={search} />
      </div>
    </div>
  );
}
