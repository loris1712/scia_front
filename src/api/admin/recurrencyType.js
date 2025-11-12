const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

// GET
export async function getRecurrencyTypes() {
  const res = await fetch(`${BASE_URL}/api/admin/recurrencyType/getRecurrencyTypes`);
  if (!res.ok) throw new Error("Errore nel caricamento dei tipi di ricorrenza");
  return res.json();
}

// POST
export async function addRecurrencyType(recurrency) {
  const res = await fetch(`${BASE_URL}/api/admin/recurrencyType/addRecurrencyType`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recurrency),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Errore nella creazione");
  return data;
}

// PUT
export async function updateRecurrencyType(id, recurrency) {
  const res = await fetch(`${BASE_URL}/api/admin/recurrencyType/updateRecurrencyType/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recurrency),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Errore nell'aggiornamento");
  return data;
}

// DELETE
export async function deleteRecurrencyType(id) {
  const res = await fetch(`${BASE_URL}/api/admin/recurrencyType/deleteRecurrencyType/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Errore durante l'eliminazione");
  return data;
}
