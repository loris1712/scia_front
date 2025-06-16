const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;
//const BASE_URL = "http://52.59.162.108:4000";

export async function fetchMaintenanceTypes(shipId, userId) {
  try {
    const res = await fetch(`${BASE_URL}/api/maintenance/type?ship_id=${shipId}&user_id=${userId}`);

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare i tipi di manutenzione`);
    }

    const data = await res.json();
    return data.maintenanceTypes || [];
  } catch (error) {
    console.error("Errore nel recupero dei tipi di manutenzione:", error.message);
    return [];
  }
}

export async function fetchMaintenanceJobs(typeId, shipId, userId) {
  try {
    const res = await fetch(`${BASE_URL}/api/maintenance/jobs?type_id=${typeId}&ship_id=${shipId}&user_id=${userId}`);

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare i job di manutenzione`);
    }

    const data = await res.json();
    return data.jobs || [];
  } catch (error) {
    console.error("Errore nel recupero dei job di manutenzione:", error.message);
    return [];
  }
}

export async function updateMaintenanceJobStatus(taskId, status_id) {
  try {
      const res = await fetch(`${BASE_URL}/api/maintenance/updateStatus/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status_id }),
      });

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare i job di manutenzione`);
    }

    const data = await res.json();
    return data.jobs || [];
  } catch (error) {
    console.error("Errore nel recupero dei job di manutenzione:", error.message);
    return [];
  }
}

export async function handleSaveStatusComment(taskId, commentData) {
  try {
      const res = await fetch(`${BASE_URL}/api/maintenance/saveStatusComment/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare i job di manutenzione`);
    }

    const data = await res.json();
    return data.jobs || [];
  } catch (error) {
    console.error("Errore nel recupero dei job di manutenzione:", error.message);
    return [];
  }
}

export async function fetchMaintenanceJob(taskId) {
  try {
    const res = await fetch(`${BASE_URL}/api/maintenance/job?taskId=${taskId}`);

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare i job di manutenzione`);
    }

    const data = await res.json();
    return data.jobs || [];
  } catch (error) {
    console.error("Errore nel recupero dei job di manutenzione:", error.message);
    return [];
  }
}

export async function markAs(taskId, mark) {
  try {
      const res = await fetch(`${BASE_URL}/api/maintenance/reportAnomaly/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mark }),
      });

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare i job di manutenzione`);
    }

    const data = await res.json();
    return data.jobs || [];
  } catch (error) {
    console.error("Errore nel recupero dei job di manutenzione:", error.message);
    return [];
  }
}

export async function markAsOk(maintenanceListId, spareData, imageFiles = []) {
  try {
    const formData = new FormData();

    Object.entries(spareData).forEach(([key, value]) => {
      if (Array.isArray(value) || typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    imageFiles.forEach((file, idx) => {
      formData.append("images", file); 
    });

    const res = await fetch(`${BASE_URL}/api/maintenance/markAsOk/${maintenanceListId}`, {
      method: "PATCH",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile aggiornare la manutenzione`);
    }

    const data = await res.json();
    return data.jobs || [];
  } catch (error) {
    console.error("Errore durante l'aggiornamento della manutenzione:", error.message);
    return [];
  }
}