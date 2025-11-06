const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export async function saveElementModels(data) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/eswbs/saveElementModel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Errore API: ${errText || res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Errore in saveElementModels:", error);
    throw error;
  }
}

export async function getElementModels(projectId) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/eswbs/getElementModels?ship_model_id=${projectId}`);
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (error) {
    console.error("❌ Errore in getElementModels:", error);
    throw error;
  }
}
