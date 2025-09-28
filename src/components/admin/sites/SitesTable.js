"use client";

export default function SitesTable({ sites }) {
  return (
    <div className="overflow-x-auto bg-gray-50 shadow-xl rounded-xl relative">
      <table className="min-w-full rounded-xl divide-y divide-gray-200">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold tracking-wide">
          <tr>
            <th className="px-6 py-4 text-left rounded-tl-xl">ID</th>
            <th className="px-6 py-4 text-left">Nome Cantiere</th>
            <th className="px-6 py-4 text-left">Responsabile</th>
            <th className="px-6 py-4 text-left">Località</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left rounded-tr-xl">Stato</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {sites.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-400">
                Nessun cantiere trovato
              </td>
            </tr>
          ) : (
            sites.map((site, idx) => (
              <tr
                key={site.id}
                className={`transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg cursor-pointer ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4">{site.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{site.name}</td>
                <td className="px-6 py-4">{site.manager}</td>
                <td className="px-6 py-4">{site.location}</td>
                <td className="px-6 py-4">{site.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                      site.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {site.active ? "Attivo" : "Disattivo"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
