export default function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Metodo non consentito" });
    }
  
    const tasks = {
      manutenzioni: [
        { id: 1, title: "Controllo impianto frenante" },
        { id: 2, title: "Verifica impianto elettrico" },
      ],
      checklist: [
        { id: 1, title: "Daily Maintenance" },
        { id: 2, title: "Controlli Prepartenza" },
      ],
      letture: [],
      catalogo: [],
      manuale: [],
      avarie: [],
    };
  
    res.status(200).json(tasks);
  }
  