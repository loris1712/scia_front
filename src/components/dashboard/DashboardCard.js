import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardCard({ id, title, imageSrc, tasks }) {
  const router = useRouter();
  
  return (
    <div
      className="relative bg-[#022a52] p-6 rounded-lg text-white flex flex-col justify-between w-full h-full cursor-pointer hover:bg-[#033366] transition"
      onClick={() => router.push(`/dashboard/${id.toLowerCase().replace(/\s+/g, "")}`)}
    >
      {/* Sezione immagine */}
      <div className="flex items-center gap-3">
        <Image src={imageSrc} alt={title} width={80} height={80} className="" />
      </div>

      {/* Sezione contenuto */}
      <div className="mt-auto">

        {/* Sezione tasks */}
        {tasks.length > 0 ? (
          <div>
            <p className="text-md text-[#789fd6] opacity-80 mt-2">Task</p>
            <p className="text-md text-[#ffffff60] mt-2">
              {tasks.map((task) => task.title).join(", ")}
            </p>
          </div>
        ) : (
          <p className="text-md text-[#ffffff60] mt-2">Nessun task</p>
        )}

        <h3 className="text-3xl font-semibold">{title}</h3>

        
      </div>
    </div>
  );
}
