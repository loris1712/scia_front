const StatusBadge = ({ dueDate, dueDays }) => {
  let bgColor = "bg-gray-400"; // Default color
  let textColor = "text-white"; // Default text color

  if (dueDays < -15) {
    bgColor = "bg-[rgb(208,2,27)]"; // Scaduto da più di 15gg
  } else if (dueDays < 0) {
    bgColor = "bg-[rgb(244,114,22)]"; // Scaduto da meno di 15gg
  } else if (dueDays <= 3) {
    bgColor = "bg-[rgb(255,191,37)]";
    textColor = "text-black"; // Manca meno di 3gg
  } else if (dueDays > 15) {
    bgColor = "bg-[rgb(45,182,71)]"; // Mancano più di 15gg
  }

  return (
    <div className={`px-2 py-1 ${bgColor} ${textColor} text-center`} style={{ padding: "1rem" }}>
      <p className="text-xl">{dueDate}</p>
      <p className="text-[16px] opacity-60">{dueDays} + 31gg 23hh</p>
    </div>
  );
};

export default StatusBadge;
  