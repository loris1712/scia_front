const BASE_URL = "http://localhost:4000";
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
