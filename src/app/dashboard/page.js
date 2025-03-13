"use client";

import DashboardGrid from "@/components/dashboard/DashboardGrid";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DashboardHeader from "@/components/header/DashboardHeader";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen bg-[#001c38] text-white p-4">
      <DashboardHeader />

      <div className="flex w-full h-[50px] items-center">
        <Breadcrumbs />
      </div>

      <div className="flex-1">
        <DashboardGrid />
      </div>
    </div>
  );
}
