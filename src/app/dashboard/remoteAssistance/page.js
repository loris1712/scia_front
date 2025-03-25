"use client";

import RemoteAssistance from "@/components/settings/RemoteAssistance";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DashboardHeader from "@/components/header/DashboardHeader";

export default function RemoteAssistancePage() {
  return (
    <div className="flex flex-col h-screen bg-[#001c38] text-white p-4">
      <DashboardHeader />

      <div className="flex w-full h-[50px] items-center mt-2">
        <Breadcrumbs />
      </div>

      <div className="flex-1">
        <h2 className="text-white font-bold text-2xl mb-4">Assistenza Remota</h2>
        <RemoteAssistance />
      </div>
    </div>
  );
}
