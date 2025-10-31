"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Estrai parametri dall’URL
  const projectMatch = pathname.match(/\/admin\/projects\/(\d+)/);
  const modelMatch = pathname.match(/\/admin\/projects\/\d+\/ship\/(\d+)/);

  const isProjectPage = !!projectMatch;
  const projectId = projectMatch ? projectMatch[1] : null;
  const shipModelId = modelMatch ? modelMatch[1] : null;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AdminNavbar />

      <div className="flex flex-1 overflow-hidden">
        {isProjectPage && (
          <div className="bg-gray-900">
            {/* ✅ Passiamo shipModelId alla sidebar */}
            <AdminSidebar activeModelId={shipModelId} />
          </div>
        )}

        <main className="flex-1 overflow-auto p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
