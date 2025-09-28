const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export async function login(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
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

export async function loginPin(pin) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/auth/login-pin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore login PIN");
    }

    return data; // contiene token e info admin
  } catch (error) {
    console.error("Errore login PIN:", error.message);
    throw error;
  }
}
