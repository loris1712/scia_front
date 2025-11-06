const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export async function getMaintenances() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/projects/getProjects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore login");
    }

    return data;
  } catch (error) {
    console.error("Errore nel login admin:", error.message);
    throw error;
  }
}

export async function getMaintenancesModel(projectId) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/maintenance?projectId=${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore login");
    }

    return data;
  } catch (error) {
    console.error("Errore nel login admin:", error.message);
    throw error;
  }
}

export async function saveMaintenance(data) {
  const res = await fetch("/api/admin/maintenance", {
    method: data.id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Errore salvataggio manutenzione");
  return await res.json();
}

export async function createProject(projectData) {
  const res = await fetch(`${BASE_URL}/api/admin/projects/createProject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });

  if (!res.ok) throw new Error("Errore creando la commessa");
  return res.json();
};

