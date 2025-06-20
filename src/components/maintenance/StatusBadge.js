const StatusBadge = ({ dueDate, dueDays }) => {
  let bgColor = "bg-gray-400";
  let textColor = "text-white";
  let symbol = "+";

  if (dueDays < -15) {
    bgColor = "bg-[rgb(208,2,27)]";
    symbol = "+";
  } else if (dueDays < 0) {
    bgColor = "bg-[rgb(244,114,22)]";
    symbol = "+";
  } else if (dueDays <= 15) {
    bgColor = "bg-[rgb(255,191,37)]";
    textColor = "text-black";
    symbol = "-";
  } else if (dueDays > 15) {
    bgColor = "bg-[rgb(45,182,71)]";
    symbol = "-";
  }

  const formattedDate = dueDate !== "N/A"
    ? new Date(dueDate).toLocaleDateString("it-IT")
    : "N/A";

  return (
    <div className={`text-center sm:p-4`}>
      <div className="flex sm:hidden items-center justify-center gap-2 text-xs">
        <span className={`px-2 py-1 rounded-full ${bgColor} flex items-center gap-1 ${textColor}`}>
          {formattedDate}
        </span>
        <span className="opacity-60 text-white">
          {symbol} {dueDays}gg
        </span>
      </div>

      <div className="hidden sm:block">
        <p className="text-xl">{formattedDate}</p>
        <p className="text-[16px] opacity-60">
          {symbol} {dueDays}gg
        </p>
      </div>
    </div>
  );
};

export default StatusBadge;

  