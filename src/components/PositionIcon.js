import Image from "next/image";

const locationIcons = {
  A: "/icons/shape.png",   // Icona per "A bordo"
  B: "/icons/Shape-10.png",      // Icona per "In banchina"
  C: "/icons/Shape-11.png",     // Icona per "In bacino"
};

const getPositionIcon = (locationBasin) => {
  const prefix = locationBasin.charAt(0).toUpperCase();

  if (locationIcons[prefix]) {
    return locationIcons[prefix];
  }
};

const PositionIcon = ({ locationBasin }) => {
  const iconSrc = getPositionIcon(locationBasin);
  let positionText = "";

  if (locationBasin.charAt(0).toUpperCase() === "A") {
    positionText = "A bordo";
  } else if (locationBasin.charAt(0).toUpperCase() === "B") {
    positionText = "In banchina";
  } else if (locationBasin.charAt(0).toUpperCase() === "C") {
    positionText = "In bacino";
  }

  return (
    <div className="flex items-center">
      <Image
        src={iconSrc || "/icons/default-icon.svg"}
        alt="Position Icon"
        width={20}
        height={20}
        className="inline-block mr-2 opacity-60"
      />
      <span>{positionText}</span>
    </div>
  );
};

export default PositionIcon;
