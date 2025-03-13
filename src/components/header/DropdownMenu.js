"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

export default function DropdownMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute z-2 right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md py-2"
    >
      <ul className="text-sm">
        <li>
          <Link href="/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {/*<HomeIcon className="h-5 w-5 mr-2" />*/}
              Dashboard
          </Link>
        </li>
        <li>
          <Link href="/facilities" className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {/*<BuildingStorefrontIcon className="h-5 w-5 mr-2" />*/}
              Impianti
          </Link>
        </li>
        <li>
          <Link href="/cart" className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {/*<ShoppingCartIcon className="h-5 w-5 mr-2" />*/}
              Carrello
          </Link>
        </li>
        <li>
          <Link href="/warehouse_management" className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {/*<ArchiveBoxIcon className="h-5 w-5 mr-2" />*/}
              Gestisci magazzino
          </Link>
        </li>
        <li>
          <Link href="/remote_assistance" className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {/*<DevicePhoneIcon className="h-5 w-5 mr-2" />*/}
              Assistenza remota
          </Link>
        </li>
        <li>
          <Link href="/settings" className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {/*<CogIcon className="h-5 w-5 mr-2" />*/}
              Impostazioni
          </Link>
        </li>
      </ul>
    </div>
  );
}

