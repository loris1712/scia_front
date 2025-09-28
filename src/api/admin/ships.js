const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export async function getShipModels() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/ships/getShipModels`, {
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

export async function getShips() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/ships/getShips`, {
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

export async function updateShipSettings() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/ships/updateShipSettings`, {
      method: "POST",
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

export async function getShipsByModel() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/ships/getShipsByModel`, {
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

export async function assignShipToProject() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/ships/assignShipToProject`, {
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

export async function createShipModel() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/ships/createShipModel`, {
      method: "POST",
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

export async function createShip() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/ships/createShip`, {
      method: "POST",
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
