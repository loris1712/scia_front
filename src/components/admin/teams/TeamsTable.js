"use client";

export default function TeamsTable({ teams }) {
  return (
    <div className="overflow-x-auto bg-gray-50 shadow-xl rounded-xl relative">
      <table className="min-w-full rounded-xl divide-y divide-gray-200">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold tracking-wide">
          <tr>
            <th className="px-6 py-4 text-left rounded-tl-xl">ID</th>
            <th className="px-6 py-4 text-left">Nome Squadra</th>
            <th className="px-6 py-4 text-left">Ruolo</th>
            <th className="px-6 py-4 text-left">Responsabile</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left rounded-tr-xl">Stato</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {teams.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-400">
                Nessuna squadra trovata
              </td>
            </tr>
          ) : (
            teams.map((team, idx) => (
              <tr
                key={team.id}
                className={`transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg cursor-pointer ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4">{team.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{team.name}</td>
                <td className="px-6 py-4">{team.role}</td>
                <td className="px-6 py-4">{team.manager}</td>
                <td className="px-6 py-4">{team.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                      team.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {team.active ? "Attiva" : "Disattiva"}
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
