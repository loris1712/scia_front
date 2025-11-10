export default function ProjectGeneralTab({ project }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Dati Generali del Progetto
      </h1>

      <table className="min-w-full border border-gray-200 rounded-lg text-sm">
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="p-3 font-medium text-gray-700 w-1/3">ID Progetto</td>
            <td className="p-3 text-gray-600">{project.id}</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="p-3 font-medium text-gray-700">Nome Progetto</td>
            <td className="p-3 text-gray-600">{project.name || "—"}</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="p-3 font-medium text-gray-700">Cliente / Owner</td>
            <td className="p-3 text-gray-600">{project.owner?.name || "—"}</td>
          </tr>
          <tr>
            <td className="p-3 font-medium text-gray-700">Stato</td>
            <td className="p-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === "active"
                    ? "bg-green-100 text-green-700"
                    : project.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {project.status || "Sconosciuto"}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 🔹 Navi collegate */}
      {project.ships?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Navi Associate
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
                <tr>
                  <th className="px-6 py-3 text-left">Unit Name</th>
                  <th className="px-6 py-3 text-left">Unit Code</th>
                  <th className="px-6 py-3 text-left">Model Code</th>
                  <th className="px-6 py-3 text-left">Side Ship #</th>
                  <th className="px-6 py-3 text-left">Launch Date</th>
                  <th className="px-6 py-3 text-left">Delivery Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {project.ships.map((ship) => (
                  <tr key={ship.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-3 font-medium text-gray-800">
                      {ship.unit_name}
                    </td>
                    <td className="px-6 py-3">{ship.unit_code || "—"}</td>
                    <td className="px-6 py-3">{ship.model_code || "—"}</td>
                    <td className="px-6 py-3">{ship.Side_ship_number || "—"}</td>
                    <td className="px-6 py-3">
                      {ship.launch_date
                        ? new Date(ship.launch_date).toLocaleDateString("it-IT")
                        : "—"}
                    </td>
                    <td className="px-6 py-3">
                      {ship.delivery_date
                        ? new Date(ship.delivery_date).toLocaleDateString("it-IT")
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
