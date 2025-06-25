const BASE_URL = 'https://us-central1-carear-development.cloudfunctions.net/apiV2';

export async function loginCareAr({ email, password }) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({ email, password })
    });

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: login fallito`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Errore nel login CareAr:", error.message);
    throw error;
  }
}


