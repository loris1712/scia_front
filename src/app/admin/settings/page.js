"use client";

import SettingsContainer from "@/components/settings/SettingsContainer";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DashboardHeader from "@/components/header/DashboardHeader";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-screen text-white p-4">

      <div className="flex-1">
        <SettingsContainer />
      </div>
    </div>
  );
}
