// utils/maintenanceDates.js

const MS_IN_DAY = 1000 * 60 * 60 * 24;

const addDuration = (date, dur) => {
  const d = new Date(date);
  if (dur.years) d.setUTCFullYear(d.getUTCFullYear() + dur.years);
  if (dur.months) d.setUTCMonth(d.getUTCMonth() + dur.months);
  if (dur.days) d.setUTCDate(d.getUTCDate() + dur.days);
  return d;
};

// Prova a convertire il nome della ricorrenza in una durata
// utils/maintenanceDates.js (estratto)

const durationFromRecurrencyName = (name) => {
  if (!name) return null;
  const n = name.toLowerCase().trim();

  // sinonimi fissi
  if (n === "daily") return { days: 1 };
  if (n === "weekly") return { days: 7 };
  if (n === "biweekly" || n === "every 2 weeks") return { days: 14 };
  if (n === "monthly") return { months: 1 };
  if (n === "quarterly") return { months: 3 };
  if (n === "semiannual" || n === "every 6 months") return { months: 6 };
  if (n === "yearly" || n === "annually") return { years: 1 };

  // casi speciali senza durata → return null
  if (n.includes("on condition") || n.includes("on fault") || n.includes("troubleshooting")) {
    return null;
  }
  if (n.includes("first 3 months")) {
    return { months: 3 }; // ⚠️ se vuoi considerarlo come 3 mesi dalla prima exec
  }

  // numeri con separatori tipo 1.000 o 25.000
  const normalized = n.replace(/\./g, "").replace(/,/g, ".");

  // pattern generico: "every X unit"
  const m = normalized.match(/every\s+([\d.,]+)\s*(day|days|week|weeks|month|months|year|years|hour|hours|cycle|cycles)/i);
  if (m) {
    let qty = parseFloat(m[1].replace(",", "."));
    const unit = m[2];

    if (/day/.test(unit)) return { days: qty };
    if (/week/.test(unit)) return { days: qty * 7 };
    if (/month/.test(unit)) return { months: qty };
    if (/year/.test(unit)) return { years: qty };

    // ⚠️ ore e cicli → ritorno come "custom", non traducibile in giorni
    if (/hour/.test(unit)) return { hours: qty };
    if (/cycle/.test(unit)) return { cycles: qty };
  }

  return null;
};


// Fallback: se abbiamo to_days, usiamolo; altrimenti prova a inferire
const durationFromRecurrency = (recurrency) => {
  if (!recurrency) return null;
  if (typeof recurrency.to_days === "number" && recurrency.to_days > 0) {
    return { days: recurrency.to_days };
  }
  const byName = durationFromRecurrencyName(recurrency.name);
  if (byName) return byName;

  // Heuristics: Weekly con frequency 52 ≈ 7 giorni
  if (
    recurrency.name?.toLowerCase() === "weekly" &&
    typeof recurrency.RecurrencyType_Frequency === "number" &&
    recurrency.RecurrencyType_Frequency >= 50
  ) {
    return { days: 7 };
  }
  return null;
};

const computeExpiryDate = ({ executionDate, endingDate, recurrency }) => {
  // 1) se ho exec_date + ricorrenza → calcolo
  if (executionDate && recurrency) {
    const exec = new Date(executionDate);
    if (!isNaN(exec.getTime())) {
      const dur = durationFromRecurrency(recurrency);
      if (dur) return addDuration(exec, dur);
    }
  }

  // 2) fallback: usa ending_date se c'è
  if (endingDate) {
    const due = new Date(endingDate);
    if (!isNaN(due.getTime())) return due;
  }

  // 3) nessuna data calcolabile
  return null;
};

const diffInDaysFromToday = (date) => {
  if (!date) return null;
  const today = new Date();
  return Math.ceil((date.getTime() - today.getTime()) / MS_IN_DAY);
};

// stesso schema colore che avevi, con lo "spento" su status_id == 3
const getStatusColor = (dueDays, statusId) => {
  if (statusId === 3) return "rgba(255,255,255,0.2)";
  if (dueDays === null) return "#CCCCCC";
  if (dueDays < 0) return "#d0021b";               // scaduta
  if (dueDays <= 5) return "rgb(244,114,22)";      // urgente
  if (dueDays <= 15) return "#ffbf25";             // medio
  return "rgb(45,182,71)";                         // ok
};

export { computeExpiryDate, diffInDaysFromToday, getStatusColor };

