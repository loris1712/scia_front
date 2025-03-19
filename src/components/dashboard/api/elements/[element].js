export default function handler(req, res) {
    const { element } = req.query;
  
    const mockData = {
      name: "Motore Centrale",
      component: "2.1.4 Propulsione Diesel",
      manufacturer: "New Wave Ltd",
      usageHours: 1200,
      maintenanceStatus: [
        { label: "Scadute", count: 3 },
        { label: "In scadenza", count: 4 },
        { label: "In pausa", count: 1 },
        { label: "Giornaliere", count: 4 },
      ],
      sparePartsStatus: [
        { label: "In giacenza", count: 5 },
        { label: "In carrello", count: 2 },
        { label: "In arrivo", count: 3 },
        { label: "Necessari prossimi 3 mesi", count: 10 },
      ],
      details: {
        description: "Buon sostituto per guarnizione vecchia o danneggiata.",
      },
    };
  
    res.status(200).json(mockData);
  }
  