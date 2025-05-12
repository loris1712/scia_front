import { useEffect, useState } from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Image from "next/image";

import { useUser } from "@/context/UserContext";
import { fetchTasks } from "@/api/checklist";
import { fetchMaintenanceJobs } from "@/api/maintenance";

const categories = [
  { id: "Maintenance", title: "Manutenzioni", imageSrc: "/icons/ico_dashboard_maintenance.png" },
  { id: "Checklist", title: "Checklist", imageSrc: "/icons/dash_checklist.png" },
  { id: "Readings", title: "Letture", imageSrc: "/icons/time.png" },
  { id: "Spare", title: "Catalogo ricambi", imageSrc: "/icons/dash_corr.png" },
  { id: "manual", title: "Manuale integrato", imageSrc: "/icons/ico_dashboard_manual.png" },
  { id: "failures", title: "Avarie", imageSrc: "/icons/dash_warning.png" },
];

const fetchByCategory = {
  Checklist: fetchTasks,
  Maintenance: fetchMaintenanceJobs,
};

export default function DashboardGrid() {
  const [tasks, setTasks] = useState({});

  const shipId = 1;
    const { user } = useUser();
    const [checklist, setChecklist] = useState([]);

    const loadDataForCategory = async (categoryId) => {
      const fetchFunction = fetchByCategory[categoryId];
      if (!fetchFunction) return null;
    
      try {
        const data = await fetchFunction(shipId, user?.id);
        return data;
      } catch (err) {
        console.error(`Errore nel fetch di ${categoryId}:`, err);
        return null;
      }
    };
  
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
    }, [shipId, user]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full">
      {categories.map((category) => (
        <DashboardCard
          key={category.id}
          id={category.id}
          title={category.title}
          imageSrc={category.imageSrc} 
          tasks={tasks[category.id] || []}
          data={checklist}
        >
        </DashboardCard>
      ))}
    </div>
  );
}

