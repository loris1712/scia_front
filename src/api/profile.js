const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;
//const BASE_URL = "http://52.59.162.108:4000";

export async function getProfileData() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Utente non autenticato");
    }

    const response = await fetch(`${BASE_URL}/api/profile/getProfile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // token nell'header
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

export async function getProfileById(id) {
  try {
    const token = localStorage.getItem("token");
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
      credentials: "include",
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