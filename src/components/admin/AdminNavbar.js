"use client";

import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useState, useRef, useEffect } from "react";
import { LogOut, Settings as SettingsIcon, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/users": "Utenti",
    "/admin/teams": "Squadre",
    "/admin/projects": "Commesse",
    "/admin/sites": "Cantieri",
    "/admin/owners": "Owners",
    "/admin/maintenance/overview": "Panoramica Manutenzioni",
    "/admin/maintenance/settings": "Impostazioni Manutenzioni",
    "/admin/settings": "Impostazioni",
  };

  const title = pageTitles[pathname] || "Pannello di Controllo";

  // Chiudi dropdown cliccando fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItemStyle =
    "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200";

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
    <header className="h-20 bg-gray-900 shadow-md flex items-center justify-between px-6">
      <h1 className="text-2xl font-semibold text-gray-50">{title}</h1>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 focus:outline-none group cursor-pointer"
        >
          <div className="flex flex-col items-end">
            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-gray-400 text-xs">{user?.email}</span>
          </div>
          <img
            src={user?.profileImage || "/icons/profile-default.svg"}
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-700 hover:border-blue-500 transition-all duration-300"
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-3 w-52 bg-gray-800 rounded-xl shadow-lg py-2 border border-gray-700 z-50 animate-fadeIn overflow-hidden">
            <Link href="/admin/profile" className={menuItemStyle}>
              <UserIcon size={18} /> Profilo
            </Link>
            <Link href="/admin/settings" className={menuItemStyle}>
              <SettingsIcon size={18} /> Impostazioni
            </Link>
            <Link href="#" onClick={() => handleLogout()} className={menuItemStyle}>
              <LogOut size={18} /> Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
