const StatusBadge = ({ date, gravity }) => {
  let bgColor = "bg-gray-400"; // Default color
  let textColor = "text-white"; // Default text color

  switch (gravity?.toLowerCase()) {
    case "critica":
      bgColor = "bg-red-600";
      break;
    case "alta":
      bgColor = "bg-orange-500";
      break;
    case "media":
      bgColor = "bg-yellow-400";
      textColor = "text-black";
      break;
    case "bassa":
      bgColor = "bg-green-500";
      break;
    default:
      bgColor = "bg-gray-400";
  }

  return (
    <div className={`px-2 py-1 ${bgColor} ${textColor} text-center`} style={{ padding: "1rem" }}>
      <p className="text-xl font-bold capitalize">{date}</p>
    </div>
  );
};

export default StatusBadge;
