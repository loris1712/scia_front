const StatusBadgeDetail = ({ dueDate }) => {
  let bgColor = "bg-gray-400"; // Default color
  let textColor = "text-white";
  let symbol= "+" 
  
  const today = new Date();
  const dueDate2= new Date(dueDate);
  const dueDays = Math.ceil((dueDate2 - today) / (1000 * 60 * 60 * 24));
   
  if (dueDays < -15) {
    bgColor = "bg-[rgb(208,2,27)]";
    symbol = "+"
  } else if (dueDays < 0) {
    bgColor = "bg-[rgb(244,114,22)]";
    symbol = "+" 
  } else if (dueDays <= 15) {
    bgColor = "bg-[rgb(255,191,37)]";
    symbol = "-"
    textColor = "text-black";
  } else if (dueDays > 15) {
    symbol = "-"
    bgColor = "bg-[rgb(45,182,71)]"; 
  }

  return (
    <div className={`w-[fit-content] sm:text-[16px] text-[12px] rounded-full py-1 px-4 ${bgColor} ${textColor}`}>
            {dueDate !== "N/A"
                ? new Date(dueDate).toLocaleDateString("it-IT")
                : "N/A"}
          </div>
  );
};

export default StatusBadgeDetail;
  