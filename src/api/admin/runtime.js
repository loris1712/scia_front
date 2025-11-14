const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export async function getProjectRuntime(projectId) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/projects/${projectId}/runtime`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          typeof window !== "undefined"
            ? `Bearer ${localStorage.getItem("token")}`
            : "",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Errore nel caricamento runtime");
    }

    return data;
  } catch (error) {
    console.error("Errore nel caricamento runtime:", error.message);
    throw error;
  }
}
