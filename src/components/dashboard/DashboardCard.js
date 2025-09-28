import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardCard({ id, title, imageSrc, tasks }) {
  const router = useRouter();
  
  return (
    <div
      className="relative bg-[#022a52] p-6 rounded-lg text-white flex flex-col justify-between w-full h-full cursor-pointer hover:bg-[#033366] transition"
      onClick={() => router.push(`/dashboard/${id.toLowerCase().replace(/\s+/g, "")}`)}
    >
      <div className="flex gap-3">
        <Image 
        src={imageSrc} 
        alt={title}
        width="0"
            height="0"
            sizes="100vw"
            style={{ width: '4rem', height: 'auto' }}/>
        
        {tasks.length > 0 && (
          <div style={{height: 'fit-content'}} className="ml-auto bg-[#ff0000] rounded-full px-2 py-1 text-white text-[12px]">
            {tasks.length}
          </div>
        )}
      </div>

      <div className="mt-auto">

      {tasks.length > 0 && (
        <p className="text-[14px] text-[#789fd6] font-semibold sm:mt-0 mt-4">
          {title}
        </p>
      )}

        {tasks.length > 0 && (
          <div>
            <p className="text-md text-[#ffffff60] mt-2">
              {tasks
                .map((task) => {
                  const text = task.title || task.task_name || task.Part_name || task.job.name;
                  if (!text) return null;
                  const lower = text.toLowerCase();
                  return lower.charAt(0).toUpperCase() + lower.slice(1);
                })
                .filter(Boolean)
                .slice(0, 2)
                .join(", ")
              }
            </p>
          </div>
        )}

        <h3 className="text-3xl font-semibold mt-4">{title}</h3>

      </div>
    </div>
  );
}
