const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;
//const BASE_URL = "http://52.59.162.108:4000";

export async function fetchTasks(shipId, userId) {
  try {
    const res = await fetch(`${BASE_URL}/api/checklist/getTasks?ship_id=${shipId}&userId=${userId}`);

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare i task`);
    }

    const data = await res.json();
    return data.tasks || [];
  } catch (error) {
    console.error("Errore nel recupero dei task:", error.message);
    return [];
  }
}
