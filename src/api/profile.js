export async function getProfileData() {
  try {
    const response = await fetch("http://localhost:4000/api/profile/getProfile", {
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

export async function updateProfileData(updatedData) {
  try {
    const response = await fetch("http://localhost:4000/api/profile/updateProfile", {
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