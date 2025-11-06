export default function MaintenanceList({ items, onEdit }) {
  if (!items || items.length === 0)
    return (
      <p className="text-gray-500 text-sm italic">
        Nessuna manutenzione trovata per questo filtro.
      </p>
    );

  return (
    <div className="space-y-2">
      {items.map((m) => (
        <div
          key={m.id}
          onClick={() => onEdit(m)}
          className="cursor-pointer p-3 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition"
        >
          <div className="flex justify-between">
            <div>
              <p className="font-semibold text-gray-800">{m.name || m.title}</p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              {m?.recurrency_type?.name || "N/A"}
            </span>
          </div>

          {m.System_ElementModel_ID && (
            <p className="text-[11px] text-gray-400 mt-1">
              ElementModel ID: {m?.element_model?.LCN_name}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
