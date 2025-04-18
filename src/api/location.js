const BASE_URL = "http://localhost:4000";
//const BASE_URL = "http://52.59.162.108:4000";

export async function fetchLocations(shipId, userId) {
  try {
    const res = await fetch(`${BASE_URL}/api/locations/getLocations?ship_id=${shipId}&user_id=${userId}`);

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare i task`);
    }

    const data = await res.json();
    return data.locations || [];
  } catch (error) {
    console.error("Errore nel recupero dei task:", error.message);
    return [];
  }
}

export const addLocation = async ({ warehouse, shipId, userId, location }) => {
  const res = await fetch(`${BASE_URL}/api/locations/addLocation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      warehouse,
      ship_id: shipId,
      user_id: userId,
      location,
    }),
  });

  if (!res.ok) {
    throw new Error("Errore nella creazione dell'ubicazione");
  }

  return await res.json();
};

