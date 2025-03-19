const StatusBadge = ({ dueDate, dueDays, status }) => {
    const statusColors = {
      red: "bg-red-600",
      orange: "bg-orange-500",
      yellow: "bg-yellow-500",
      green: "bg-green-500",
    };
  
    return (
      <div className={`px-2 py-1 rounded text-white ${statusColors[status]}`}>
        <p className="text-sm">{dueDate}</p>
        <p className="text-xs opacity-80">{dueDays}</p>
      </div>
    );
  };
  
  export default StatusBadge;
  