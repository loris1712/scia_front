"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfileData } from "../api/profile";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isAuthPage =
      typeof window !== "undefined" &&
      (window.location.pathname.startsWith("/login") ||
        window.location.pathname.startsWith("/login-pin"));

    if (isAuthPage) {
      setLoading(false);
      return;
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token || token === "undefined") {
      router.replace("/login"); // redirect pulito, no reload
      return;
    }

    async function loadData() {
      const result = await getProfileData();

      if (!result) {
        localStorage.removeItem("token"); // cleanup
        router.replace("/login");
        return;
      }

      setUser(result);
      setLoading(false);
    }

    loadData();
  }, []);

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