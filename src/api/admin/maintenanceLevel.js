const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

/* 🔹 GET — Recupera tutti i livelli di manutenzione */
export async function getMaintenanceLevels() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/maintenanceLevel/getMaintenanceLevels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore nel recupero livelli di manutenzione");
    }

    return data;
  } catch (error) {
    console.error("❌ Errore getMaintenanceLevels:", error.message);
    throw error;
  }
}

/* 🔹 POST — Aggiunge un nuovo livello */
export async function addMaintenanceLevel(level) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/maintenanceLevel/addMaintenanceLevel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(level),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore durante la creazione del livello");
    }

    return data;
  } catch (error) {
    console.error("❌ Errore addMaintenanceLevel:", error.message);
    throw error;
  }
}

/* 🔹 PUT — Aggiorna un livello esistente */
export async function updateMaintenanceLevel(id, level) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/maintenanceLevel/updateMaintenanceLevel/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(level),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore durante l'aggiornamento del livello");
    }

    return data;
  } catch (error) {
    console.error("❌ Errore updateMaintenanceLevel:", error.message);
    throw error;
  }
}

export async function deleteMaintenanceLevel(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/maintenanceLevel/deleteMaintenanceLevel/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore durante l'eliminazione del livello");
    }

    return data;
  } catch (error) {
    console.error("❌ Errore deleteMaintenanceLevel:", error.message);
    throw error;
  }
}

