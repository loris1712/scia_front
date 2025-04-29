const BASE_URL = "http://localhost:4000";
//const BASE_URL = "http://52.59.162.108:4000";

export async function getReadings(shipId, userId) {
  try {
    const res = await fetch(`${BASE_URL}/api/readings/getReadings?ship_id=${shipId}&user_id=${userId}`);

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare i task`);
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Errore nel recupero dei task:", error.message);
    return [];
  }
}

export async function getReading(readingId, userId) {
  try {
    const res = await fetch(`${BASE_URL}/api/readings/getReading?id=${readingId}&user_id=${userId}`);

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare i task`);
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Errore nel recupero dei task:", error.message);
    return [];
  }
}

export async function updateReading(id, updatedData) {
  try {
    const res = await fetch(`${BASE_URL}/api/readings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: impossibile aggiornare la lettura`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Errore nell'aggiornamento della lettura:", error.message);
    throw error;
  }
}
