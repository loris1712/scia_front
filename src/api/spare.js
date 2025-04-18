const BASE_URL = "http://localhost:4000";
//const BASE_URL = "http://52.59.162.108:4000";

export async function fetchSpare(serial_number, name) {
  try {
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (serial_number) params.append("serial_number", serial_number);

    const res = await fetch(`${BASE_URL}/api/spare/getSpare?${params.toString()}`);

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare i ricambi`);
    }

    const data = await res.json();
    return data.spares || [];
  } catch (error) {
    console.error("Errore nel recupero dei ricambi:", error.message);
    return [];
  }
}

export async function fetchSpares(ship_id) {
    try {
      const params = new URLSearchParams();
      if (ship_id) params.append("ship_id", ship_id);
  
      const res = await fetch(`${BASE_URL}/api/spare/getSpares?${params.toString()}`);
  
      if (!res.ok) {
        throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare i ricambi`);
      }
  
      const data = await res.json();
      return data.spares || [];
    } catch (error) {
      console.error("Errore nel recupero dei ricambi:", error.message);
      return [];
    }
  }

export async function updateSpare(id, updateData) {
  try {
    const res = await fetch(`${BASE_URL}/api/spare/updateSpare/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    });

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile aggiornare il ricambio`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Errore durante l'aggiornamento del ricambio:", error.message);
    return null;
  }
}