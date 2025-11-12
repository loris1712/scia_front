const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export async function getThresholds() {
  const res = await fetch(`${BASE_URL}/api/admin/threshold/getThresholds`);
  if (!res.ok) throw new Error("Errore nel caricamento delle soglie");
  return res.json();
}

export async function addThreshold(threshold) {
  const res = await fetch(`${BASE_URL}/api/admin/threshold/addThreshold`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(threshold),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Errore nella creazione");
  return data;
}

export async function updateThreshold(id, threshold) {
  const res = await fetch(`${BASE_URL}/api/admin/threshold/updateThreshold/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(threshold),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Errore nell'aggiornamento");
  return data;
}

export async function deleteThreshold(id) {
  const res = await fetch(`${BASE_URL}/api/admin/threshold/deleteThreshold/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Errore durante l'eliminazione");
  return data;
}
