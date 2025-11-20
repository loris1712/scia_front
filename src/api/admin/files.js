const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

// 🔹 Upload file a un progetto
export async function uploadFile(shipId, userId, formData) {
  formData.append("userId", userId);

  const res = await fetch(`${BASE_URL}/api/admin/files/${shipId}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Errore upload file");
  return res.json();
}

// 🔹 Ottieni file associati a un progetto
export async function getProjectFiles(shipModelId) {
  const res = await fetch(`${BASE_URL}/api/admin/files/${shipModelId}`);

  if (!res.ok) throw new Error("Errore caricamento file progetto");
  return res.json();
}

// 🔹 Elimina file
export async function deleteFile(fileId) {
  const res = await fetch(`${BASE_URL}/api/admin/files/${fileId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Errore eliminazione file");
  return res.json();
}

// (Opzionale) Ottieni URL firmato se aggiungi la route
export async function getFileDownloadUrl(fileId) {
  const res = await fetch(`${BASE_URL}/api/admin/files/download/${fileId}`);

  if (!res.ok) throw new Error("Errore download file");
  return res.json();
}
