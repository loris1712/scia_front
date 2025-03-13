import { useRouter } from "next/navigation";

export default function DashboardCard({ title, Icon, tasks }) {
  const router = useRouter();

  return (
    <div
    className="relative bg-[#022a52] p-6 rounded-lg text-white flex flex-col justify-between w-full h-full cursor-pointer hover:bg-[#033366] transition"
      onClick={() => router.push(`/dashboard/${title.toLowerCase().replace(/\s+/g, "")}`)}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-20 h-20 text-white" />
      </div>

      <div className="mt-auto">
        <div>
        {tasks.length > 0 ? (
              <div>
                  <p className="text-sm text-[#789fd6] opacity-80 mt-2">Task</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {tasks.map((task) => task.title).join(", ")}
                    </p>
                </div>
              ) : (
                <p className="text-sm text-gray-400 mt-2">Nessun task</p>
              )}
              </div>
        <h3 className="text-2xl font-semibold">{title}</h3>
      </div>

    </div>
  );
}
