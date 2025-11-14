"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n";
import ProfileCard from "@/components/profile/ProfileCard";

export default function ProfilePage() {
  const router = useRouter();
  const { t, i18n } = useTranslation("profile");

  const [mounted, setMounted] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":
            typeof window !== "undefined"
              ? `Bearer ${localStorage.getItem("token")}`
              : "",
        },
      });

      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !i18n.isInitialized) return null;

  return (
    <div className="flex flex-col h-screen text-white p-6">

      {/* Header Profilo */}
      <div className="flex items-center border-b border-gray-300 pb-4 mb-6">
        <h2 className="text-3xl font-bold text-black">{t("profile")}</h2>

        <button
          onClick={handleLogout}
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-[#D0021B] hover:bg-red-700 transition rounded-md cursor-pointer text-white font-semibold"
        >
          <Image src="/icons/logout.svg" width={20} height={20} alt="Logout" />
          <span className="hidden sm:inline">{t("logout")}</span>
        </button>
      </div>

      {/* Contenuto Profilo */}
      <div className="flex flex-col items-center rounded-2xl shadow-lg border border-gray-200 overflow-y-auto">
        <div className="w-full w-full">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
}
