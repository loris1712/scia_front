"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfileData } from "@/api/profile";

export default function UserInfo() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
      async function loadData() {
        const result = await getProfileData();
        console.log(result)
        setUser(result);
      }
      loadData();
    }, []);

  return (
    <div
      className="flex items-center gap-2 p-3 rounded-lg cursor-pointer transition"
      onClick={() => router.push("/dashboard/profile")}
    >
      <img src={user?.profileImage} alt="User Avatar" className="w-14 h-14 rounded-full object-cover" />

      <div className="overflow-hidden">
        {user ? (
          <>
            <p className="text-sm text-[#789fd6]">{user.rank}</p>
            <p className="text-lg font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[150px] sm:max-w-[200px]">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-[#ffffffa6]">{user.type}</p>
          </>
        ) : (
          <p className="text-white text-sm">Caricamento...</p>
        )}
      </div>
    </div>
  );
}


  