"use client";

import { useRef, useEffect, useState } from "react";
import ProfileCard from "@/components/profile/ProfileCard";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DashboardHeader from "@/components/header/DashboardHeader";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n";

export default function DashboardPage() {
  const router = useRouter();

  const { t, i18n } = useTranslation("profile");
  const [mounted, setMounted] = useState(false);

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;
  //const BASE_URL = "http://52.59.162.108:4000";

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

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
    <div className="flex flex-col h-screen bg-[#001c38] text-white p-4">
      <DashboardHeader />

      <div className="flex w-full items-center mt-4">
        <Breadcrumbs />
      </div>

      <div className="flex items-center pt-2 pb-4">
      <h2 className="text-2xl font-bold">{t("profile")}</h2>
      <button
                  type="submit"
                  onClick={handleLogout}
                  className={'flex items-center rounded-md ml-auto bg-[#D0021B] hover:bg-blue-500 text-white font-bold py-1 px-4 transition duration-200 cursor-pointer'}
                >
                  <Image 
                                                                      src="/icons/logout.svg"
                                                                      alt="Logout"
                                                                      width={15} 
                                                                      height={15}
                                                                      className=""
                                                                    />
                                                                    &nbsp;
                                                                    {t("logout")}
                </button>
    </div>

      <div className="flex-1">
        <ProfileCard />
      </div>
    </div>
  );
}
