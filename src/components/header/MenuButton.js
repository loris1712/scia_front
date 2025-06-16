"use client";

import { useState } from "react";
import MenuBtn from "@/components/icons/MenuBtn";
import DropdownMenu from "@/components/header/DropdownMenu";

export default function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="p-3 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuBtn className="w-12 h-12 sm:w-12 sm:h-12 text-white" />
      </button>

      <DropdownMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
