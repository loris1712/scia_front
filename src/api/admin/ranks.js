const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

/* 🔹 POST — Aggiunge un nuovo livello */
export async function addRank(level) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/rank/addRank`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(level),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore durante la creazione del rango");
    }

    return data;
  } catch (error) {
    console.error("Errore addRank:", error.message);
    throw error;
  }
}

/* 🔹 PUT — Aggiorna un livello esistente */
export async function updateRank(id, level) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/rank/updateRank/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(level),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore durante l'aggiornamento del rango");
    }

    return data;
  } catch (error) {
    console.error("Errore updateRank:", error.message);
    throw error;
  }
}

export async function deleteRank(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/rank/deleteRank/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore durante l'eliminazione del rango");
    }

    return data;
  } catch (error) {
    console.error("Errore deleteRank:", error.message);
    throw error;
  }
}

