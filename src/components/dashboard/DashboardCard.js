import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardCard({ id, title, imageSrc, tasks = [] }) {
  const router = useRouter();

  // Format text extraction
  const formatTaskName = (task) => {
    const text = task.title || task.task_name || task.Part_name || task?.maintenance_list?.name;
    if (!text) return null;

    const cleaned = text.trim();
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
  };

  // Create formatted list
  const formattedTasks = tasks.map(formatTaskName).filter(Boolean);

  const visibleTasks = formattedTasks.slice(0, 2);
  const remainingCount = formattedTasks.length - 2;

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
          style={{ width: '4rem', height: 'auto' }}
        />

        {tasks.length > 0 && (
          <div className="ml-auto flex items-start">
            <div
              className="
                bg-[#ff0000]
                rounded-full
                w-7 h-7
                flex items-center justify-center
                text-[11px]
                font-semibold
                leading-none
              "
            >
              {tasks.length > 999 ? "999+" : tasks.length}
            </div>
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
          <div className="mt-1 text-[#ffffff60] text-[14px]">
            {visibleTasks.map((t, index) => (
              <p key={index} className="truncate">{t}</p>
            ))}

            {remainingCount > 0 && (
              <p className="text-[#ffffffa5] font-medium">
                + altri {remainingCount}
              </p>
            )}
          </div>
        )}

        <h3 className="text-3xl font-semibold mt-1">{title}</h3>

      </div>
    </div>
  );
}
