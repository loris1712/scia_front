const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export async function getOwners() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/owners/getOwners`, {
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

export async function updateOwner(id, updatedData) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/owners/updateOwner/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Errore aggiornamento owner");

    return data;
  } catch (error) {
    console.error("Errore aggiornamento owner:", error.message);
    throw error;
  }
}

export async function createOwners(newOwners) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/owners/createOwner`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOwners),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Errore creazione owners");
    return data;
  } catch (error) {
    console.error("Errore creazione owners:", error.message);
    throw error;
  }
}