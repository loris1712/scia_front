'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getProfileData } from "@/api/profile";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const result = await getProfileData();
                setUser(result);
            } catch (error) {
                console.error("Errore nel caricamento dei dati utente:", error);
            } finally {
                setLoading(false);
            }
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

