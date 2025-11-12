const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

// 🔹 GET — Recupera tutti i gruppi di manutenzione
export async function getMaintenanceGroups() {
  const res = await fetch(`${BASE_URL}/api/admin/maintenanceGroup/getMaintenanceGroups`);
  if (!res.ok) throw new Error("Errore nel caricamento dei gruppi di manutenzione");
  return res.json();
}

// 🔹 POST — Aggiunge un nuovo gruppo di manutenzione
export async function addMaintenanceGroup(group) {
  const res = await fetch(`${BASE_URL}/api/admin/maintenanceGroup/addMaintenanceGroup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(group),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Errore nella creazione del gruppo");
  return data;
}

// 🔹 PUT — Aggiorna un gruppo di manutenzione
export async function updateMaintenanceGroup(id, group) {
  const res = await fetch(`${BASE_URL}/api/admin/maintenanceGroup/updateMaintenanceGroup/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(group),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Errore nell'aggiornamento del gruppo");
  return data;
}

// 🔹 DELETE — Elimina un gruppo di manutenzione
export async function deleteMaintenanceGroup(id) {
  const res = await fetch(`${BASE_URL}/api/admin/maintenanceGroup/deleteMaintenanceGroup/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Errore durante l'eliminazione del gruppo");
  return data;
}
