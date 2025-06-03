const BASE_URL = "http://localhost:4000";
//const BASE_URL = "http://52.59.162.108:4000";

export const getFacilities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/facilities`);
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero delle facilities:", error);
    return [];
  }
};
