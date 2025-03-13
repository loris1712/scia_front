"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardHeader from "@/components/header/DashboardHeader";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";

export default function CategoryPage({ params }) {
  const router = useRouter();
  const { category } = params;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data[category] || []);
      } catch (error) {
        console.error("Errore nel recupero dei task:", error);
      }
    }
    fetchTasks();
  }, [category]);

  return (
    <div className="flex flex-col h-screen bg-[#001c38] text-white p-4">
      <DashboardHeader />

      <div className="flex w-full h-[50px] items-center">
        <Breadcrumbs />
      </div>

      <div className="flex-1 bg-[#022a52] p-4 rounded-lg">
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="p-2 bg-[#033366] rounded-md">
                {task.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nessun task disponibile</p>
        )}
      </div>
    </div>
  );
}
