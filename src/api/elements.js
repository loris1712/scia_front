/*export async function fetchElementData(element) {
    const res = await fetch(`https://api.example.com/elements/${element}`);
    if (!res.ok) return null;
    return res.json();
  }*/
  

    const mockData = {
        "motore-centrale": {
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
        },
        "motore-secondario": {
          name: "Motore Secondario",
          component: "3.2.1 Propulsione Elettrica",
          manufacturer: "Oceanic Engines",
          usageHours: 800,
          maintenanceStatus: [
            { label: "Scadute", count: 1 },
            { label: "In scadenza", count: 2 },
            { label: "In pausa", count: 0 },
            { label: "Giornaliere", count: 3 },
          ],
          sparePartsStatus: [
            { label: "In giacenza", count: 2 },
            { label: "In carrello", count: 1 },
            { label: "In arrivo", count: 2 },
            { label: "Necessari prossimi 3 mesi", count: 5 },
          ],
          details: {
            description: "Motore elettrico secondario per supporto alla propulsione principale.",
          },
        }
      };
      
      export async function fetchElementData(element) {
        return mockData[element] || null;
      }
      