"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Users2,
  Briefcase,
  Construction,
  Building2,
  Settings as SettingsIcon,
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const [maintenanceOpen, setMaintenanceOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItemStyle = (active = false) =>
    `relative flex items-center gap-3 p-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
      active
        ? "bg-gradient-to-r from-blue-800/30 to-transparent font-semibold"
        : "hover:bg-gray-800"
    }`;

  const activeIndicator = active => (
    <span
      className={`absolute left-0 top-0 h-full w-1 rounded-r-full bg-blue-500 transition-all duration-300 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": typeof window !== "undefined" ? `Bearer ${localStorage.getItem("token")}` : "",
        },
      });

      localStorage.removeItem("token");
      router.push("/adminLogin");
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between h-screen shadow-xl">
      {/* Logo */}
      <div className="p-5 border-b border-gray-700 flex items-center justify-center">
        <Link href="/admin">
          <img
            src="https://www.sciaservices.com/wp-content/uploads/logo-chiaro.svg"
            alt="Scia Services"
            className="h-10 object-contain"
          />
        </Link>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-3">
          <li className="relative">
            {activeIndicator(pathname === "/admin")}
            <Link href="/admin" className={menuItemStyle(pathname === "/admin")}>
              <Home size={20} /> Dashboard
            </Link>
          </li>
          <li className="relative">
            {activeIndicator(pathname === "/admin/users")}
            <Link
              href="/admin/users"
              className={menuItemStyle(pathname === "/admin/users")}
            >
              <Users size={20} /> Utenti
            </Link>
          </li>
          <li className="relative">
            {activeIndicator(pathname === "/admin/teams")}
            <Link
              href="/admin/teams"
              className={menuItemStyle(pathname === "/admin/teams")}
            >
              <Users2 size={20} /> Squadre
            </Link>
          </li>
          <li className="relative">
            {activeIndicator(pathname === "/admin/projects")}
            <Link
              href="/admin/projects"
              className={menuItemStyle(pathname === "/admin/projects")}
            >
              <Briefcase size={20} /> Commesse
            </Link>
          </li>
          <li className="relative">
            {activeIndicator(pathname === "/admin/sites")}
            <Link
              href="/admin/sites"
              className={menuItemStyle(pathname === "/admin/sites")}
            >
              <Construction size={20} /> Cantieri
            </Link>
          </li>
          <li className="relative">
            {activeIndicator(pathname === "/admin/owners")}
            <Link
              href="/admin/owners"
              className={menuItemStyle(pathname === "/admin/owners")}
            >
              <Building2 size={20} /> Owners
            </Link>
          </li>

          {/* Manutenzioni con sottomenu */}
          <li className="relative">
            <button
              className={`${menuItemStyle(false)} justify-between w-full cursor-pointer`}
              onClick={() => setMaintenanceOpen(!maintenanceOpen)}
            >
              <span className="flex items-center gap-3">
                <Building2 size={20} /> Manutenzioni
              </span>
              {maintenanceOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {maintenanceOpen && (
              <ul className="ml-6 mt-2 space-y-2">
                <li className="relative">
                  {activeIndicator(pathname === "/admin/maintenance/overview")}
                  <Link
                    href="/admin/maintenance/overview"
                    className={menuItemStyle(
                      pathname === "/admin/maintenance/overview"
                    )}
                  >
                    Panoramica
                  </Link>
                </li>
                <li className="relative">
                  {activeIndicator(pathname === "/admin/maintenance/settings")}
                  <Link
                    href="/admin/maintenance/settings"
                    className={menuItemStyle(
                      pathname === "/admin/maintenance/settings"
                    )}
                  >
                    Impostazioni
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 space-y-2 text-gray-400 text-sm">
        <Link href="/admin/settings" className={menuItemStyle(false)}>
          <SettingsIcon size={20} /> Impostazioni
        </Link>

        <Link href="#" onClick={() => handleLogout()} className={menuItemStyle(false)}>
          <LogOut size={20} /> Logout
        </Link>

        {/* Footer info */}
        <div className="mt-4 text-center text-xs opacity-70">
          &copy; {new Date().getFullYear()} Scia Services <br />
          Versione 1.0.0
        </div>
      </div>
    </aside>
  );
}
