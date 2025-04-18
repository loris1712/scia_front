"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfileData, getRanks } from "@/api/profile";

export default function UserInfo() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [militaryRanks, setMilitaryRanks] = useState([]);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
      async function loadData() {
        const result = await getProfileData();
        setUser(result);
      }
      loadData();
    }, []);

    const [profileImage, setProfileImage] = useState("/icons/profile-default.svg");

    useEffect(() => {
      if (user?.profileImage) {
        setProfileImage(user.profileImage);
      }
    }, [user]);

    useEffect(() => {
      async function fetchRanks() {
        const ranks = await getRanks();
        setMilitaryRanks(ranks);
      }
      fetchRanks();
    }, []);
  
    useEffect(() => {
      if (user && militaryRanks.length > 0) {
        const foundRank = militaryRanks.find((r) => r.id === Number(user.rank));
        setUserRank(foundRank);
      }
    }, [user, militaryRanks]);

  return (
    <div
      className="flex items-center gap-2 p-3 rounded-lg cursor-pointer transition"
      onClick={() => router.push("/dashboard/profile")}
    >
      <img src={profileImage} alt="User Avatar" className="w-14 h-14 rounded-full object-cover" />

      <div className="overflow-hidden">
        {user ? (
          <>
           <p className="text-sm text-[#789fd6]">
            {userRank ? (userRank.grado.length > 25 ? userRank.grado.substring(0, 25) + '...' : userRank.grado) : "Rank not found"}
          </p>
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


  