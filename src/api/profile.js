const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;
//const BASE_URL = "http://52.59.162.108:4000";

export async function getProfileData() {
  try {
    const response = await fetch(`${BASE_URL}/api/profile/getProfile`, {
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

export async function getProfileById(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/profile/getProfileById/${id}`, {
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
