const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export async function getSpares(shipModelId) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/spares?shipModelId=${shipModelId}`, {
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

export async function saveSpare(data) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/spares`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse.error || "Errore salvataggio");
    }

    return await res.json();
  } catch (error) {
    console.error("Errore saveSpare:", error.message);
    throw error;
  }
}

export async function deleteSpare(id) {
  const res = await fetch(`${BASE_URL}/api/admin/spares/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Errore eliminazione ricambio");

  return res.json();
}
