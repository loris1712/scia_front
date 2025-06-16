"use client";

import DashboardGrid from "@/components/dashboard/DashboardGrid";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DashboardHeader from "@/components/header/DashboardHeader";
import AlghoWidget from "@/components/AlghoWidget";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen bg-[#001c38] text-white p-4">
      <DashboardHeader />
      <AlghoWidget />

      <div className="flex w-full items-center mb-4 mt-4">
        <Breadcrumbs />
      </div>

      <div className="flex-1">
        <DashboardGrid />
      </div>
    </div>
  );
}
