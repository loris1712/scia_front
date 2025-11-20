export default function SparesList({ items, onEdit }) {
  if (!items || items.length === 0)
    return (
      <p className="text-gray-500 text-sm italic">
        Nessun ricambio presente.
      </p>
    );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
          <tr>
            <th className="px-6 py-3 text-left">Nome</th>
            <th className="px-6 py-3 text-left">Part Number</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 bg-white">
          {items.map((spare) => (
            <tr
              key={spare.ID}
              onClick={() => onEdit(spare)}
              className="hover:bg-blue-50/60 cursor-pointer transition rounded-lg"
            >
              <td className="px-6 py-3 font-medium text-gray-800">
                {spare.Part_name || "—"}
              </td>

              <td className="px-6 py-3 text-gray-600">
                {spare.Serial_number || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
