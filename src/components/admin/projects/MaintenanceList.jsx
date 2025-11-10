import { useState } from "react";

export default function MaintenanceList({ items, onEdit }) {
  const [filters, setFilters] = useState({
    search: "",
    recurrency: "",
  });

  if (!items || items.length === 0)
    return (
      <p className="text-gray-500 text-sm italic">
        Nessuna manutenzione trovata per questo filtro.
      </p>
    );

  const filteredItems = items.filter((m) => {
    const matchSearch =
      m.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      m.title?.toLowerCase().includes(filters.search.toLowerCase());
    const matchRecurrency =
      !filters.recurrency ||
      (m.recurrency_type?.name || "").toLowerCase() ===
        filters.recurrency.toLowerCase();
    return matchSearch && matchRecurrency;
  });

  const recurrencyOptions = [
    ...new Set(items.map((m) => m.recurrency_type?.name).filter(Boolean)),
  ];

  return (
    <div className="space-y-6">
      {/* FILTRI */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <input
          type="text"
          placeholder="🔍 Cerca per nome..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none w-full sm:w-64 transition"
        />
        <select
          value={filters.recurrency}
          onChange={(e) =>
            setFilters({ ...filters, recurrency: e.target.value })
          }
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none w-full sm:w-56 transition"
        >
          <option value="">Tutti i tipi di ricorrenza</option>
          {recurrencyOptions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* TABELLA */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left">Nome</th>
              <th className="px-6 py-3 text-left">Ricorrenza</th>
              <th className="px-6 py-3 text-left">Elemento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredItems.map((m) => (
              <tr
                key={m.id}
                onClick={() => onEdit(m)}
                className="hover:bg-blue-50/60 cursor-pointer transition rounded-lg"
              >
                <td className="px-6 py-3 font-medium text-gray-800">
                  {m.name || m.title}
                </td>
                <td className="px-6 py-3">
                  <span className="inline-flex items-center text-xs font-medium bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {m?.recurrency_type?.name || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-500 text-[12px]">
                  {m.System_ElementModel_ID
                    ? m?.element_model?.LCN_name || "—"
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredItems.length === 0 && (
        <p className="text-gray-400 text-sm italic text-center">
          Nessun risultato corrisponde ai filtri applicati.
        </p>
      )}
    </div>
  );
}
