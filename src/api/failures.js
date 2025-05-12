const BASE_URL = "http://localhost:4000";
// const BASE_URL = "http://52.59.162.108:4000";

export async function addFailure(payload) {
  try {
    const res = await fetch(`${BASE_URL}/api/failures/addFailure`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile aggiungere l'avaria`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Errore nell'aggiunta dell'avaria:", error.message);
    throw error;
  }
}

export async function getFailures(filters = {}) {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const res = await fetch(`${BASE_URL}/api/failures/getFailures${queryParams ? "?" + queryParams : ""}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare le avarie`);
    }

    const data = await res.json();
    return data.failures;
  } catch (error) {
    console.error("Errore nel recupero delle avarie:", error.message);
    throw error;
  }
}