"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, Ship, Loader2 } from "lucide-react";
import { getShipsByModel } from "@/api/admin/ships"; // 👈 nuova API
import { useUser } from "@/context/UserContext";

export default function ShipSidebar({ projectId, shipId, onClose }) {
  const pathname = usePathname();
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (!shipId) return;

    const fetchShips = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getShipsByModel(user?.id, shipId);
        setShips(data.ships || []);
      } catch (err) {
        console.error("Errore nel caricamento navi:", err);
        setError("Errore nel caricamento navi associate");
      } finally {
        setLoading(false);
      }
    };

    fetchShips();
  }, [shipId]);

  const menuItemStyle = (active = false) =>
    `relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300 
     cursor-pointer select-none
     ${
       active
         ? "bg-blue-900/40 text-blue-300 font-semibold shadow-inner"
         : "hover:bg-blue-900/20 text-gray-300 hover:text-blue-200"
     }`;

  return (
    <aside
      className="w-80 bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 
                 text-white h-full p-4 border-l border-blue-900/50 shadow-2xl"
    >
      <nav className="space-y-2">
        {/* 🔹 Torna indietro */}
        <button
          onClick={onClose}
          className="cursor-pointer flex items-center gap-2 text-gray-400 hover:text-blue-300 mb-6 transition-colors duration-200"
        >
          <ChevronLeft size={18} /> Torna ai modelli
        </button>

        {/* 🔹 Stato caricamento / errore */}
        {loading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm animate-pulse">
            <Loader2 size={18} className="animate-spin" /> Caricamento navi...
          </div>
        )}

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* 🔹 Lista navi associate */}
        {!loading && !error && ships.length === 0 && (
          <p className="text-gray-500 text-sm">Nessuna nave associata</p>
        )}

        {!loading && ships.length > 0 && (
          <ul className="space-y-1 mt-2">
            {ships.map((ship) => {
              const active =
                pathname ===
                `/admin/projects/${projectId}/ship/${shipId}/vessel/${ship.id}`;
              return (
                <Link
                  key={ship.id}
                  href={`/admin/projects/${projectId}/ship/${shipId}/vessel/${ship.id}`}
                  className={menuItemStyle(active)}
                >
                  <Ship size={18} /> {ship.name || `Nave #${ship.id}`}
                </Link>
              );
            })}
          </ul>
        )}
      </nav>
    </aside>
  );
}
