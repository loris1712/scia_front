"use client";

import SettingsContainer from "@/components/settings/SettingsContainer";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DashboardHeader from "@/components/header/DashboardHeader";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-screen bg-[#001c38] text-white p-4">
      <DashboardHeader />

      <div className="flex w-full h-[50px] items-center my-2">
        <Breadcrumbs />
      </div>

      <div className="flex-1">
        <SettingsContainer />
      </div>
    </div>
  );
}
