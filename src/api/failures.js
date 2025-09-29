const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;
// const BASE_URL = "http://52.59.162.108:4000";

export async function addFailure(payload) {
  try {
    const res = await fetch(`${BASE_URL}/api/failures/addFailure`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile aggiungere l'avaria`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Errore nell'aggiunta dell'avaria:", error.message);
    throw error;
  }
}

export async function getFailures(filters = {}, ship_id, userId) {
  try {
    const query = {
      ...filters,
      ...(ship_id && { ship_id }),
      ...(userId && { userId })
    };

    const queryParams = new URLSearchParams(query).toString();

    const res = await fetch(
      `${BASE_URL}/api/failures/getFailures${queryParams ? "?" + queryParams : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare le avarie`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Errore nel recupero delle avarie:", error.message);
    throw error;
  }
}


export async function addPhotographicNote(formData) {

  return await fetch(`${BASE_URL}/api/uploadFiles/uploadPhoto`, {
    method: "POST",
    body: formData,
  });
}

export async function addVocalNote(formData) {
  return await fetch(`${BASE_URL}/api/uploadFiles/uploadAudio`, {
    method: "POST",
    body: formData,
  });
}

export async function addTextNote(payload) {
  return await fetch(`${BASE_URL}/api/uploadFiles/uploadText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function addPhotographicNoteGeneral(formData) {

  return await fetch(`${BASE_URL}/api/uploadFiles/uploadPhotoGeneral`, {
    method: "POST",
    body: formData,
  });
}

export async function addVocalNoteGeneral(formData) {
  return await fetch(`${BASE_URL}/api/uploadFiles/uploadAudioGeneral`, {
    method: "POST",
    body: formData,
  });
}

export async function addTextNoteGeneral(payload) {
  return await fetch(`${BASE_URL}/api/uploadFiles/uploadTextGeneral`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
