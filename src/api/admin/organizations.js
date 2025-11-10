const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export async function getOrganizations() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/organization/getOrganizations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore nel recupero cantieri");
    }

    return data;
  } catch (error) {
    console.error("Errore nel recupero cantieri:", error.message);
    throw error;
  }
}
