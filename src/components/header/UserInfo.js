"use client";

import { useRouter } from "next/navigation";

export default function UserInfo() {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-2 p-3 rounded-lg cursor-pointer transition"
      onClick={() => router.push("/profile")}
    >
      <img
        src="/avatar.png"
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      />

      <div className="overflow-hidden">
        <p className="text-sm text-[#789fd6]">Colonnello t.ST</p>
        <p className="text-lg font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[150px] sm:max-w-[200px]">
          Alessandro Coscarelli
        </p>
        <p className="text-sm text-[#ffffffa6]">Operatore</p>
      </div>
    </div>
  );
}

  