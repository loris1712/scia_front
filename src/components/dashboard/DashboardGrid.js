"use client";

import useSWR from "swr";
import { useEffect } from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

import { fetchTasks } from "@/api/checklist";
import { fetchMaintenanceJobs } from "@/api/maintenance";
import { getReadings } from "@/api/readings";
import { fetchSpares } from "@/api/spare";
import { getFailures } from "@/api/failures";
import { useTranslation } from "@/app/i18n";

const categories = [
  { id: "Maintenance", titleKey: "maintenance", imageSrc: "/icons/ico_dashboard_maintenance.png" },
  { id: "Checklist", titleKey: "checklist", imageSrc: "/icons/dash_checklist.png" },
  { id: "Readings", titleKey: "readings", imageSrc: "/icons/time.png" },
  { id: "Spare", titleKey: "spare_parts", imageSrc: "/icons/dash_corr.png" },
  { id: "manual", titleKey: "manual", imageSrc: "/icons/ico_dashboard_manual.png" },
  { id: "failures", titleKey: "failures", imageSrc: "/icons/dash_warning.png" },
];

const fetchByCategory = {
  Checklist: (shipId, userId) => fetchTasks(shipId, userId),
  Maintenance: (shipId, userId) => fetchMaintenanceJobs(undefined, shipId, userId),
  Readings: (shipId, userId) => getReadings(shipId, userId),
  Spare: (shipId) => fetchSpares(shipId),
  failures: (shipId) => getFailures("", shipId),
};

// 🔹 Componente figlio per gestire SWR
function DashboardGridItem({ cat, shipId, userId, t }) {
  const { data, error } = useSWR(
    shipId ? [cat.id, shipId, userId] : null,
    ([id, sId, uId]) => fetchByCategory[id]?.(sId, uId)
  );

  return (
    <DashboardCard
      id={cat.id}
      title={t(cat.titleKey)}
      imageSrc={cat.imageSrc}
      tasks={data || []}
      loading={!data && !error}
    />
  );
}

export default function DashboardGrid() {
  const { user, loading } = useUser();
  const router = useRouter();
  const { t, i18n } = useTranslation("dashboard");

  if (loading) return <div>Loading...</div>;
  if (!user) return null;
  if (!i18n?.isInitialized) return null;

  const shipId = user?.teamInfo?.assignedShip?.id;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full pb-8">
      {categories.map((cat) => (
        <DashboardGridItem
          key={cat.id}
          cat={cat}
          shipId={shipId}
          userId={user.id}
          t={t}
        />
      ))}
    </div>
  );
}
