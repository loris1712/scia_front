"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfileData } from "../api/profile";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getToken = localStorage.getItem("token")

  useEffect(() => {
    const isAuthPage =
      typeof window !== "undefined" &&
      (window.location.pathname.startsWith("/login") ||
        window.location.pathname.startsWith("/login-pin"));

    if (isAuthPage) {
      setLoading(false);
      return;
    }

    async function loadData() {
      try {
        const result = await getProfileData();
        setUser(result);
      } catch (error) {
        console.error("Errore nel caricamento dei dati utente:", error);
        router.push("/login"); // assicurati di resettare user se fallisce
      } finally {
        setLoading(false);
      }
    }

    if(!getToken && getToken != "undefined"){
        router.push("/login"); 
    }else{
        loadData();
    }

    
  }, []);

  // Redirect a login se non autenticato e caricamento finito e non siamo in pagina auth
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
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
