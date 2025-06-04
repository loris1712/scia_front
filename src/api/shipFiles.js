const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;
//const BASE_URL = "http://52.59.162.108:4000";

export async function getFiles(shipId, userId) {
  try {
    const res = await fetch(`${BASE_URL}/api/shipFiles/getFiles?ship_id=${shipId}&user_id=${userId}`);

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare i task`);
    }

    const data = await res.json();
    return data.files || [];
  } catch (error) {
    console.error("Errore nel recupero dei task:", error.message);
    return [];
  }
}

export async function getAudios(failureId, type) {
  try {
    const response = await fetch(`${BASE_URL}/api/uploadFiles/getAudios/${failureId}/${type}`);
    if (!response.ok) throw new Error("Errore nel recupero delle note vocali");
    return await response.json();
  } catch (error) {
    console.error("Errore getAudios:", error);
    return { notes: [] };
  }
}

export async function getPhotos(failureId, type) {
  try {
    const response = await fetch(`${BASE_URL}/api/uploadFiles/getPhotos/${failureId}/${type}`);
    if (!response.ok) throw new Error("Errore nel recupero delle note vocali");
    return await response.json();
  } catch (error) {
    console.error("Errore getAudios:", error);
    return { notes: [] };
  }
}

export async function getTexts(failureId, type) {
  try {
    const response = await fetch(`${BASE_URL}/api/uploadFiles/getTextNotes/${failureId}/${type}`);
    if (!response.ok) throw new Error("Errore nel recupero delle note vocali");
    return await response.json();
  } catch (error) {
    console.error("Errore getAudios:", error);
    return { notes: [] };
  }
}
