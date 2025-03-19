  export async function getUserSecuritySettings(userId) {
    try {
      const response = await fetch("http://localhost:4000/api/auth/getSecuritySettings", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
  
      if (!response.ok) {
        throw new Error("Errore nel recupero delle impostazioni di sicurezza");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Errore API getUserSecuritySettings:", error);
      return null;
    }
  }

export async function updateUserSecuritySettings(updatedData) {
    try {
      const response = await fetch("http://localhost:4000/api/auth/updateSecuritySettings", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error("Errore nell'aggiornamento delle impostazioni di sicurezza");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Errore API updateUserSecuritySettings:", error);
      return null;
    }
  }
  