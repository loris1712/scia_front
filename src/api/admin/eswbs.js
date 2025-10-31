const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export const getESWBSGlossary = async () => {
  const res = await fetch(`${BASE_URL}/api/admin/eswbs/glossary`);
  if (!res.ok) throw new Error("Errore nel recupero glossario ESWBS");
  return res.json();
};
