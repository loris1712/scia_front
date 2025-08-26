const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;
//const BASE_URL = "http://52.59.162.108:4000";

export async function getProfileData() {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      console.log("Utente non autenticato");
    }

    const response = await fetch(`${BASE_URL}/api/profile/getProfile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Errore nel recupero del profilo");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore API getProfileData:", error);
    return null;
  }
}

export async function getProfileById(id) {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      throw new Error("Token mancante. Utente non autenticato.");
    }

    const response = await fetch(`${BASE_URL}/api/profile/getProfileById/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero del profilo");
    }

    return await response.json();
  } catch (error) {
    console.error(`Errore API getProfileById(${id}):`, error);
    return null;
  }
}

export async function updateProfileData(updatedData) {
  try {
    const response = await fetch(`${BASE_URL}/api/profile/updateProfile`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero del profilo");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore API getProfileData:", error);
    return null;
  }
}

export async function uploadProfileImage(formData) {
  try {
    const response = await fetch(`${BASE_URL}/api/profile/uploadProfileImage`, {
      method: "POST",
      credentials: "include",
      body: formData, 
    });

    if (!response.ok) {
      throw new Error("Errore nel caricamento dell'immagine del profilo");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore API uploadProfileImage:", error);
    return null;
  }
};

export const getRanks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/profile/getRanks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Errore nel recupero dei dati');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function getAPIbackend() {
  try {
    const response = await fetch(`${BASE_URL}/api/profile/getAPIbackend`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero del profilo");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore API getProfileData:", error);
    return null;
  }
}

export async function getLogs(logType) {
  try {
    const response = await fetch(`${BASE_URL}/api/profile/getLogs?type=${logType}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero del profilo");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore API getProfileData:", error);
    return null;
  }
}

export async function getTeamUsers(teamId) {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      throw new Error("Token mancante. Utente non autenticato.");
    }

    const response = await fetch(`${BASE_URL}/api/profile/getUsers/${teamId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero degli utenti del team");
    }

    return await response.json();
  } catch (error) {
    console.error(`Errore API getTeamUsers(${teamId}):`, error);
    return null;
  }
}

export async function updateUserElements(userId, elements) {
  const res = await fetch(`${BASE_URL}/api/profile/${userId}/elements`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ elements }),
  });

  if (!res.ok) {
    throw new Error("Errore nel salvataggio degli Impianti");
  }

  return res.json();
}