const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export async function getProjects() {
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

export async function createProject(projectData) {
  const res = await fetch(`${BASE_URL}/api/admin/projects/createProject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });

  if (!res.ok) throw new Error("Errore creando la commessa");
  return res.json();
};

export async function getProjectById(id) {
  const res = await fetch(`${BASE_URL}/api/admin/projects/getProjectById/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Errore creando la commessa");
  return res.json();
};

export async function getShipModels(id) {
  const res = await fetch(`${BASE_URL}/api/admin/projects/getShipModelsByProject/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Errore creando la commessa");
  return res.json();
};

export async function updateProjectById(id, payload) {
  const response = await fetch(`${BASE_URL}/api/admin/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Errore durante l'aggiornamento del progetto");
  }

  return await response.json();
}

export async function createShipModel(projectId, model_name) {
  const res = await fetch(`${BASE_URL}/api/admin/projects/${projectId}/ship-models`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model_name }),
  });

  if (!res.ok) throw new Error("Errore creando la commessa");
  return res.json();
};

export async function createShip(modelId, unit_name, teamId) {
  const res = await fetch(`${BASE_URL}/api/admin/projects/ships/${modelId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ unit_name, team_id: teamId }),
  });

  if (!res.ok) throw new Error("Errore creando nave");
  return res.json();
}




