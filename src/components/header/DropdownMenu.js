"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { useTranslation } from "@/app/i18n";

export default function DropdownMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  const router = useRouter();
  const { t, i18n } = useTranslation("header");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted || !i18n.isInitialized) return null;

  return (
    <div
      ref={menuRef}
      className="absolute z-2 right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md py-2"
    >
      <ul className="text-sm">
        <li>
          <Link href="/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Image 
                                                    src="/icons/homeico.svg"
                                                    alt="back"
                                                    className="mr-2"
                                                    width={14} 
                                                    height={14}
                                                  />
              Dashboard
          </Link>
        </li>
        <li>
          <div onClick={() => router.push(`/dashboard/impianti`)} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Image 
                                                    src="/icons/facilitiesico.svg"
                                                    alt="back"
                                                    className="mr-2"
                                                    width={14} 
                                                    height={14}
                                                  />               {t("facilities")}
          </div>
        </li>
        <li>
          <Link href="/dashboard/cart" className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Image 
                                                    src="/icons/cartico.svg"
                                                    alt="back"
                                                    className="mr-2"
                                                    width={14} 
                                                    height={14}
                                                  />
                                                                {t("cart")}
          </Link>
        </li>
        {/*<li>
          <Link href="/warehouse_management" className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Image 
                                                    src="/icons/storageico.svg"
                                                    alt="back"
                                                    className="mr-2"
                                                    width={14} 
                                                    height={14}
                                                  />
               {t("manage_warehouse")}
          </Link>
        </li>*/}
        <li>
          <Link href="/dashboard/remoteAssistance" className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Image 
                                                    src="/icons/remoteassico.svg"
                                                    alt="back"
                                                    className="mr-2"
                                                    width={14} 
                                                    height={14}
                                                  />            {t("remote_assistance")}
          </Link>
        </li>
        <li>
          <Link href="/dashboard/settings" className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Image 
                                                    src="/icons/settingsico.svg"
                                                    alt="back"
                                                    className="mr-2"
                                                    width={14} 
                                                    height={14}
                                                  />              {t("settings")}
          </Link>
        </li>
      </ul>
    </div>
  );
}

