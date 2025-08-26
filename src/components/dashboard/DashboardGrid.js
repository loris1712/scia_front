import { useEffect, useState } from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";

import { useUser } from "@/context/UserContext";
import { fetchTasks } from "@/api/checklist";
import { fetchMaintenanceJobs } from "@/api/maintenance";
import { getReadings } from "@/api/readings";
import { fetchSpares } from "@/api/spare";
import { getFailures } from "@/api/failures";

import { useTranslation } from "@/app/i18n";
import { useRouter } from "next/navigation";

const categories = [
  { id: "Maintenance", titleKey: "maintenance", imageSrc: "/icons/ico_dashboard_maintenance.png" },
  { id: "Checklist", titleKey: "checklist", imageSrc: "/icons/dash_checklist.png" },
  { id: "Readings", titleKey: "readings", imageSrc: "/icons/time.png" },
  { id: "Spare", titleKey: "spare_parts", imageSrc: "/icons/dash_corr.png" },
  { id: "manual", titleKey: "manual", imageSrc: "/icons/ico_dashboard_manual.png" },
  { id: "failures", titleKey: "failures", imageSrc: "/icons/dash_warning.png" },
];

const fetchByCategory = {
  Checklist: fetchTasks,
  Maintenance: fetchMaintenanceJobs,
  Readings: getReadings,
  Spare: fetchSpares,
  failures: getFailures,
};

export default function DashboardGrid() {
  const [tasks, setTasks] = useState({});
  const [mounted, setMounted] = useState(false);

  const { user, loading } = useUser();
  const { t, i18n } = useTranslation("dashboard");
  const shipId = user?.ships[0].id;

  const router = useRouter();
  
  const loadDataForCategory = async (categoryId) => {
    const fetchFunction = fetchByCategory[categoryId];
    if (!fetchFunction) return null;

    try {
      switch (categoryId) {
        case "Checklist":
          return await fetchFunction(shipId, user?.id);
        case "Maintenance":
          return await fetchFunction(undefined, shipId, user?.id);
        case "Readings":
          return await fetchFunction(shipId, user?.id);
        case "Spare":
          return await fetchFunction(shipId);
        case "failures":
          return await fetchFunction("", shipId);
        default:
          return null;
      }
    } catch (err) {
      console.error(`Errore nel fetch di ${categoryId}:`, err);
      return null;
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (loading) return;

    const timeoutId = setTimeout(() => {
      if (!user) {
        //console.warn("Utente non autenticato, ricarico la pagina tra 2 secondi...");
        const alreadyReloaded = sessionStorage.getItem("dashboard_reloaded");

        if (!alreadyReloaded) {
          sessionStorage.setItem("dashboard_reloaded", "true");
          window.location.reload();
        } else {
          //console.warn("Reload già effettuato, evito loop infinito.");
        }

        setTasks({});
        return;
      }

      const loadAllData = async () => {
        try {
          const results = await Promise.all(
            categories.map(async (category) => {
              const data = await loadDataForCategory(category.id);
              return { id: category.id, data };
            })
          );

          const updatedTasks = {};
          results.forEach(({ id, data }) => {
            if (data) updatedTasks[id] = data;
          });

          setTasks(updatedTasks);
          sessionStorage.removeItem("dashboard_reloaded");

        } catch (error) {
          console.error("Errore caricamento dati dashboard:", error);
        }
      };

      loadAllData();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [user, loading]);


  if (!mounted || !i18n?.isInitialized) return null;

  if (loading) return <div>Loading...</div>;
  if (!user) return <div className="w-full text-center">Loading</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full sm:pb-0 pb-8">
      {categories.map((category) => (
        <DashboardCard
          key={category.id}
          id={category.id}
          title={t(category.titleKey)}
          imageSrc={category.imageSrc}
          tasks={tasks[category.id] || []}
          data={[]}
        />
      ))}
    </div>
  );
}
