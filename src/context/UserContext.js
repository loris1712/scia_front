"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfileData } from "../api/profile";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Stato per le note temporanee associate ai guasti
  // Struttura: { [failureId]: { text: [], photo: [], vocal: [] } }
  const [failureNotes, setFailureNotes] = useState({});

  // ✅ Aggiunge una nota (testo/foto/audio) a un guasto specifico
  const addNote = (failureId, type, content) => {
    setFailureNotes((prev) => {
      const prevFailure = prev[failureId] || { text: [], photo: [], vocal: [] };
      return {
        ...prev,
        [failureId]: {
          ...prevFailure,
          [type]: [...(prevFailure[type] || []), content],
        },
      };
    });
  };

  // ✅ Recupera tutte le note associate a un guasto
  const getNotes = (failureId) => {
    return failureNotes[failureId] || { text: [], photo: [], vocal: [] };
  };

  // ✅ Elimina tutte le note associate a un guasto
  const clearNotes = (failureId) => {
    setFailureNotes((prev) => {
      const updated = { ...prev };
      delete updated[failureId];
      return updated;
    });
  };

  useEffect(() => {
  if (typeof window === "undefined") return;

  const pathname = window.location.pathname;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/login-pin");

  const isAllowedDashboardPage =
    /^\/dashboard\/spare\/[^\/]+$/.test(pathname) ||
    /^\/dashboard\/impianti\/[^\/]+$/.test(pathname);

  if (isAuthPage || isAllowedDashboardPage) {
    setLoading(false);
    return;
  }

  const token = localStorage.getItem("token");

  if (!token || token === "undefined") {
    setLoading(false);
    router.replace("/login");
    return;
  }

  async function loadData() {
    const result = await getProfileData();

    if (!result) {
      localStorage.removeItem("token");
      router.replace("/login");
      setLoading(false);
      return;
    }

    setUser(result);
    setLoading(false);
  }

    loadData();
  }, [router]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        addNote,
        getNotes,
        clearNotes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve essere usato all'interno di un UserProvider");
  }
  return context;
}