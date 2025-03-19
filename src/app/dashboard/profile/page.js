"use client";

import ProfileCard from "@/components/profile/ProfileCard";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DashboardHeader from "@/components/header/DashboardHeader";
import Image from 'next/image';
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include", // ✅ Invia i cookie per il logout
      });

      router.push("/login"); // 🔄 Dopo il logout, vai alla pagina di login
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#001c38] text-white p-4">
      <DashboardHeader />

      <div className="flex w-full h-[50px] items-center pt-4">
        <Breadcrumbs />
      </div>

      <div className="flex items-center pt-2 pb-4">
      <h2 className="text-2xl font-bold">Profile</h2>
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
                  Logout
                </button>
    </div>

      <div className="flex-1">
        <ProfileCard />
      </div>
    </div>
  );
}
