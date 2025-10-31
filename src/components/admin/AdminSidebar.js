"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Ship,
  ChevronDown,
  ChevronRight,
  Loader2,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react";
import { getShipModels } from "@/api/admin/projects";
import { getShipsByModel } from "@/api/admin/ships";
import { useUser } from "@/context/UserContext";

export default function AdminSidebar({ activeModelId = null }) {
  const [shipModels, setShipModels] = useState([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [errorModels, setErrorModels] = useState(null);

  const [openModelId, setOpenModelId] = useState(null);
  const [shipsByModel, setShipsByModel] = useState({});
  const [loadingShips, setLoadingShips] = useState({});
  const [errorShips, setErrorShips] = useState({});

  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

  // 🔹 Estrai projectId dall’URL
  const match = pathname.match(/\/admin\/projects\/(\d+)/);
  const projectId = match ? match[1] : null;

  // 🔹 Carica tutti i modelli nave
  useEffect(() => {
    if (!projectId) return;

    const fetchModels = async () => {
      setLoadingModels(true);
      setErrorModels(null);
      try {
        const data = await getShipModels(projectId);
        setShipModels(data || []);
      } catch (err) {
        console.error("Errore nel caricamento modelli nave:", err);
        setErrorModels("Errore nel caricamento modelli nave");
      } finally {
        setLoadingModels(false);
      }
    };

    fetchModels();
  }, [projectId]);

  // 🔹 Se arriva un activeModelId → aprilo automaticamente
  useEffect(() => {
    if (activeModelId && !openModelId) {
      setOpenModelId(activeModelId);
      loadShips(activeModelId);
    }
  }, [activeModelId]);

  // 🔹 Funzione per caricare le navi di un modello
  const loadShips = async (modelId) => {
    setLoadingShips((prev) => ({ ...prev, [modelId]: true }));
    setErrorShips((prev) => ({ ...prev, [modelId]: null }));

    try {
      const data = await getShipsByModel(user?.id, modelId);
      setShipsByModel((prev) => ({
        ...prev,
        [modelId]: data.ships || [],
      }));
    } catch (err) {
      console.error("Errore nel caricamento navi:", err);
      setErrorShips((prev) => ({
        ...prev,
        [modelId]: "Errore nel caricamento navi",
      }));
    } finally {
      setLoadingShips((prev) => ({ ...prev, [modelId]: false }));
    }
  };

  // 🔹 Gestione apertura/chiusura accordion
  const toggleModel = async (modelId) => {
    if (openModelId === modelId) {
      setOpenModelId(null);
      return;
    }

    setOpenModelId(modelId);
    if (!shipsByModel[modelId]) {
      await loadShips(modelId);
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            typeof window !== "undefined"
              ? `Bearer ${localStorage.getItem("token")}`
              : "",
        },
      });
      localStorage.removeItem("token");
      router.push("/adminLogin");
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  // 🔹 Stili base
  const menuItemStyle = (active = false) =>
    `relative flex items-center justify-between gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer select-none ${
      active
        ? "bg-gradient-to-r from-blue-800/30 to-transparent font-semibold text-blue-300"
        : "hover:bg-gray-800 text-gray-300"
    }`;

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between shadow-xl">
        {/* 🔹 Contenuto principale */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {projectId && (
            <div>
              <h3 className="text-sm uppercase tracking-wide text-gray-400 mb-2 flex items-center gap-2">
                <Ship size={16} /> Modelli Nave
              </h3>

              {/* Stato caricamento modelli */}
              {loadingModels && (
                <p className="text-gray-500 text-sm">Caricamento...</p>
              )}
              {errorModels && (
                <p className="text-red-400 text-sm">{errorModels}</p>
              )}

              {!loadingModels && shipModels.length === 0 && (
                <p className="text-gray-500 text-sm">Nessun modello disponibile</p>
              )}

              {/* 🔹 Lista modelli */}
              <ul className="space-y-1 mt-2">
                {shipModels.map((model) => {
                  const isOpen = openModelId === String(model.id);
                  return (
                    <li key={model.id} className="relative">
                      {/* 🔸 Intestazione modello */}
                      <div
                        className={menuItemStyle(isOpen)}
                        onClick={() => toggleModel(String(model.id))}
                      >
                        <span className="flex items-center gap-2">
                          🚢 {model.name || `Modello #${model.id}`}
                        </span>
                        {isOpen ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </div>

                      {/* 🔸 Accordion: lista navi */}
                      <div
                        className={`ml-4 mt-1 space-y-1 border-l border-gray-700 pl-3 transition-all overflow-hidden ${
                          isOpen
                            ? "max-h-[500px] opacity-100 duration-300"
                            : "max-h-0 opacity-0 duration-200"
                        }`}
                      >
                        {loadingShips[model.id] && (
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Loader2
                              size={16}
                              className="animate-spin text-blue-400"
                            />
                            Caricamento navi...
                          </div>
                        )}

                        {errorShips[model.id] && (
                          <p className="text-red-400 text-sm">
                            {errorShips[model.id]}
                          </p>
                        )}

                        {!loadingShips[model.id] &&
                          !errorShips[model.id] &&
                          (shipsByModel[model.id]?.length > 0 ? (
                            shipsByModel[model.id].map((ship) => {
                              const active = pathname.startsWith(
                                `/admin/projects/${projectId}/ship/${model.id}/vessel/${ship.id}`
                              );
                              return (
                                <Link
                                  key={ship.id}
                                  href={`/admin/projects/${projectId}/ship/${model.id}/vessel/${ship.id}`}
                                  className={`block text-sm rounded-md p-2 transition-all ${
                                    active
                                      ? "bg-blue-900/30 text-blue-300"
                                      : "hover:bg-gray-800 text-gray-300"
                                  }`}
                                >
                                  ⚓ {ship.name || `Nave #${ship.id}`}
                                </Link>
                              );
                            })
                          ) : (
                            <p className="text-gray-500 text-sm">
                              Nessuna nave associata
                            </p>
                          ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </nav>

        {/* 🔹 Footer */}
        <div className="p-4 border-t border-gray-700 space-y-2 text-gray-400 text-sm mb-8">
          <Link
            href="/admin/settings"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition"
          >
            <SettingsIcon size={18} /> Impostazioni
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition w-full text-left"
          >
            <LogOut size={18} /> Logout
          </button>

          <div className="mt-4 text-center text-xs opacity-70">
            &copy; {new Date().getFullYear()} Scia Services <br />
            Versione 1.0.0
          </div>
        </div>
      </aside>
    </div>
  );
}
