const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export async function getUsers() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/users/getUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore nel recupero utenti");
    }

    return data;
  } catch (error) {
    console.error("Errore nel fetch utenti:", error.message);
    throw error;
  }
}

export async function createUsers(usersData) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/users/createUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usersData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore nella creazione utenti");
    }

    return data;
  } catch (error) {
    console.error("Errore creazione utenti:", error.message);
    throw error;
  }
}

/* 🔹 PUT - Aggiorna un utente esistente */
export async function updateUser(userId, updateData) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/users/updateUser/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore aggiornamento utente");
    }

    return data;
  } catch (error) {
    console.error("Errore aggiornamento utente:", error.message);
    throw error;
  }
}

/* 🔹 DELETE - Elimina un utente */
export async function deleteUser(userId) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/users/deleteUser/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore eliminazione utente");
    }

    return data;
  } catch (error) {
    console.error("Errore eliminazione utente:", error.message);
    throw error;
  }
}
