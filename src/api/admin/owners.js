const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export async function getOwners() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/ships/getOwners`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore login");
    }

    return data; // contiene token e eventuali info dell'admin
  } catch (error) {
    console.error("Errore nel login admin:", error.message);
    throw error;
  }
}