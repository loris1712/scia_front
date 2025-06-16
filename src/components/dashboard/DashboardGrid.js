import { useEffect, useState } from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Image from "next/image";

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
  const router = useRouter(); 

    const shipId = 1;
    const { user, loading } = useUser();
    const [checklist, setChecklist] = useState([]);

    const { t, i18n } = useTranslation("dashboard");
    const [mounted, setMounted] = useState(false);

    const loadDataForCategory = async (categoryId) => {
    const fetchFunction = fetchByCategory[categoryId];
    if (!fetchFunction) return null;

    try {
      switch (categoryId) {
        case "Checklist":
          return await fetchFunction(shipId, user?.id);

        case "Maintenance":
          return await fetchFunction("undefined",shipId, user?.id);

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
      if (!loading && user === null) {
        console.log("User è null, faccio refresh");
        window.location.reload();
      }
    }, [user, loading]);
  
    useEffect(() => {
      const loadAllData = async () => {
        const updatedTasks = {};
    
        for (const category of categories) {
          const data = await loadDataForCategory(category.id);
          if (data) {
            updatedTasks[category.id] = data;
          }
        }
    
        setTasks(updatedTasks);
      };
    
      if (user) loadAllData();
    }, [user]);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted || !i18n.isInitialized) return null;


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full sm:pb-0 pb-8">
      {categories.map((category) => (
        <DashboardCard
          key={category.id}
          id={category.id}
          title={t(category.titleKey)}
          imageSrc={category.imageSrc} 
          tasks={tasks[category.id] || []}
          data={checklist}
        />
      ))}
    </div>
  );
}