"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import UserInfo from "@/components/header/UserInfo";
import QRCode from "@/components/icons/Qrcode";
import LastScan from "@/components/header/LastScan";
import MenuButton from "@/components/header/MenuButton";
import BackIcon from "@/components/icons/BackIcon";
import { useTranslation } from "@/app/i18n";

export default function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter(); 

  const isDashboard = pathname === "/dashboard"; 

  return (
    <div className="flex w-full h-[80px] items-center gap-4">
      {!isDashboard && (
        <div 
          className="flex-[1] h-full flex items-center justify-center bg-[#022a52] rounded-lg cursor-pointer"
          onClick={() => router.back()}
        >
          <BackIcon className="w-6 h-6 text-white" />
        </div>
      )}

      <div className="flex-[3] h-full flex items-center bg-[#022a52] rounded-lg p-3">
        <UserInfo />
      </div>

      <div className="flex-[1] h-full flex items-center justify-center bg-[#022a52] rounded-lg">
        <QRCode />
      </div>

      <div className="flex-[5] h-full flex items-center bg-[#022a52] rounded-lg p-3">
        <LastScan />
      </div>

      <div className="flex-[1] h-full flex items-center justify-center bg-[#022a52] rounded-lg">
        <MenuButton />
      </div>
    </div>
  );
}
