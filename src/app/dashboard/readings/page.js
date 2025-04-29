"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardHeader from "@/components/header/DashboardHeader";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import ReadingsTable from "@/components/readings/ReadingsTable";

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category;

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
    /*fetchTasks();*/
  }, [category]);

  return (
    <div className="flex flex-col h-screen bg-[#001c38] text-white p-4">
      <DashboardHeader />

      <div className="flex w-full mt-4 items-center">
        <Breadcrumbs />
      </div>

      <div className="flex-1 rounded-lg">
        <ReadingsTable />
      </div>
    </div>
  );
}
