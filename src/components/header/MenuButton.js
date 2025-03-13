"use client";

import { useState } from "react";
import MenuBtn from "@/components/icons/MenuBtn";
import DropdownMenu from "@/components/header/DropdownMenu";

export default function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="p-3 bg-[#022a52] rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuBtn className="text-xl" />
      </button>

      <DropdownMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
