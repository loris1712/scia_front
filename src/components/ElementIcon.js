import Image from "next/image";

const elementIcons = {
  100: "/icons/facilities/ico1.svg",
  200: "/icons/facilities/ico2.svg",
  300: "/icons/facilities/ico3.svg",
  400: "/icons/facilities/ico4.svg",
  500: "/icons/facilities/ico5.svg",
  600: "/icons/facilities/ico6.svg",
  700: "/icons/facilities/ico7.svg",
  800: "/icons/facilities/ico8.svg",
  900: "/icons/facilities/ico9.svg",
};

const getElementIcon = (elementId) => {
  const range = Math.floor(elementId / 100) * 100;
  return elementIcons[range] || null;
};

const ElementIcon = ({ elementId }) => {
  const iconSrc = getElementIcon(elementId);
  return (
    <Image src={iconSrc} alt="Element Icon" width={20} height={20} className="inline-block mr-2 opacity-60" />
  );
};

export default ElementIcon;
