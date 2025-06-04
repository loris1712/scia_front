const StatusBadge = ({ dueDate, dueDays }) => {
  let bgColor = "bg-gray-400"; // Default color
  let textColor = "text-white";
  let symbol= "+" // Default text color

  if (dueDays < -15) {
    bgColor = "bg-[rgb(208,2,27)]";
    symbol = "+" // Scaduto da più di 15gg
  } else if (dueDays < 0) {
    bgColor = "bg-[rgb(244,114,22)]";
    symbol = "+" // Scaduto da meno di 15gg
  } else if (dueDays <= 3) {
    bgColor = "bg-[rgb(255,191,37)]";
    symbol = "-"
    textColor = "text-black"; // Manca meno di 3gg
  } else if (dueDays > 15) {
    symbol = "-"
    bgColor = "bg-[rgb(45,182,71)]"; // Mancano più di 15gg
  }

  return (
    <div className={`px-2 py-1 ${bgColor} ${textColor} text-center`} style={{ padding: "1rem" }}>
      <p className="text-xl">{dueDate !== "N/A"
                ? new Date(dueDate).toLocaleDateString("it-IT")
                : "N/A"}</p>
      <p className="text-[16px] opacity-60">{symbol} {dueDays}gg</p>
    </div>
  );
};

export default StatusBadge;
  