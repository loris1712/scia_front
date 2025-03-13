"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ToolsIcon from "@/components/icons/ToolsIcon";
import ChecklistIcon from "@/components/icons/ChecklistIcon";
import TachometerIcon from "@/components/icons/TachometerIcon";
import PlugIcon from "@/components/icons/PlugIcon";
import BookIcon from "@/components/icons/BookIcon";
import WarningIcon from "@/components/icons/WarningIcon";

const categories = [
  { id: "manutenzioni", title: "Manutenzioni", Icon: ToolsIcon },
  { id: "checklist", title: "Checklist", Icon: ChecklistIcon },
  { id: "letture", title: "Letture", Icon: TachometerIcon },
  { id: "catalogo", title: "Catalogo ricambi", Icon: PlugIcon },
  { id: "manuale", title: "Manuale integrato", Icon: BookIcon },
  { id: "avarie", title: "Avarie", Icon: WarningIcon },
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
    fetchTasks();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full">
      {categories.map((category) => (
        <DashboardCard
          key={category.id}
          title={category.title}
          Icon={category.Icon}
          tasks={tasks[category.id] || []}
        />
      ))}
    </div>
  );
}
