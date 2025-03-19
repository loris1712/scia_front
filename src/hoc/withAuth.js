"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(Component) {
  return function ProtectedPage(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch("http://localhost:4000/api/auth/profile", {
            method: "GET",
            credentials: "include", // ✅ Importante per inviare il cookie
          });

          if (!response.ok) {
            throw new Error("Sessione non valida");
          }

          const data = await response.json();
          setUser(data.user);
        } catch (error) {
          console.error("Errore autenticazione:", error);
          router.push("/login"); // 🔄 Reindirizza al login se non è autenticato
        } finally {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, []);

    if (isLoading) return <p className="text-white text-center mt-10">Caricamento...</p>;

    return <Component {...props} user={user} />;
  };
}
