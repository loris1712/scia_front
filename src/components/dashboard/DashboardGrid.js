import { useEffect, useState } from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Image from "next/image";

const categories = [
  { id: "Maintenance", title: "Manutenzioni", imageSrc: "/icons/ico_dashboard_maintenance.png" },
  { id: "Checklist", title: "Checklist", imageSrc: "/icons/dash_checklist.png" },
  { id: "Letture", title: "Letture", imageSrc: "/icons/time.png" },
  { id: "Spare", title: "Catalogo ricambi", imageSrc: "/icons/dash_corr.png" },
  { id: "manual", title: "Manuale integrato", imageSrc: "/icons/ico_dashboard_manual.png" },
  { id: "avarie", title: "Avarie", imageSrc: "/icons/dash_warning.png" },
];

export default function DashboardGrid() {
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Errore nel recupero dei task:", error);
      }
    }
    //fetchTasks();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full">
      {categories.map((category) => (
        <DashboardCard
          key={category.id}
          id={category.id}
          title={category.title}
          imageSrc={category.imageSrc} 
          tasks={tasks[category.id] || []}
        >
        </DashboardCard>
      ))}
    </div>
  );
}

