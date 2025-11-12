const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export async function getTeams() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/teams/getTeams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore nel recupero squadre");
    }

    return data;
  } catch (error) {
    console.error("Errore nel fetch squadre:", error.message);
    throw error;
  }
}

export async function updateTeam(teamId, updateData) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/teams/updateTeam/${teamId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore aggiornamento team");
    }

    return data;
  } catch (error) {
    console.error("Errore aggiornamento team:", error.message);
    throw error;
  }
}

export async function getTeamMembers(teamId) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/teams/getTeamMembers/${teamId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore nel recupero membri team");
    }

    return data; 
  } catch (error) {
    console.error("Errore nel recupero membri team:", error.message);
    throw error;
  }
}

export async function updateTeamMembers(teamId, members) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/teams/updateTeamMembers/${teamId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ members }), // ✅ ora il nome combacia con backend
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore aggiornamento membri del team");
    }

    return data;
  } catch (error) {
    console.error("Errore aggiornamento membri team:", error.message);
    throw error;
  }
}

