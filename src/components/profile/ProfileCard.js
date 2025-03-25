"use client"; // Indica che è un Client Component
import { useEffect, useState } from "react";
import { getProfileData } from "@/api/profile";
import InfoCard from "@/components/profile/InfoCard";

export default function ProfileCard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const result = await getProfileData();
      setData(result);
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col text-white">
      <div className="flex gap-4">
        <div className="w-full space-y-4 bg-[#022A52] p-4 rounded-md">
          {data ? <InfoCard data={data} /> : <InfoCard data={data} />}
        </div>
      </div>
    </div>
  );
}

