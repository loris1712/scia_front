"use client";

import { useRef, useEffect, useState } from "react";
import RemoteAssistance from "@/components/settings/RemoteAssistance";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DashboardHeader from "@/components/header/DashboardHeader";
import { useTranslation } from "@/app/i18n";

export default function RemoteAssistancePage() {

  const { t, i18n } = useTranslation("remote_assistance");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted || !i18n.isInitialized) return null;

  return (
    <div className="flex flex-col h-screen bg-[#001c38] text-white p-4">
      <DashboardHeader />

      <div className="flex w-full items-center mt-4 mb-4">
        <Breadcrumbs />
      </div>

      <div className="flex-1">
        <h2 className="text-white font-bold text-2xl mb-4">{t("remote_assistance")}</h2>
        <RemoteAssistance />
      </div>
    </div>
  );
}
