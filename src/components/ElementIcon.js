import Image from "next/image";

const elementIcons = {
  1: "/icons/facilities/ico1.svg",
  2: "/icons/facilities/ico2.svg",
  3: "/icons/facilities/ico3.svg",
  4: "/icons/facilities/ico4.svg",
  5: "/icons/facilities/ico5.svg",
  6: "/icons/facilities/ico6.svg",
  7: "/icons/facilities/ico7.svg",
  8: "/icons/facilities/ico8.svg",
  9: "/icons/facilities/ico9.svg",
};

const getElementIcon = (elementId) => {
  if (!elementId) return null;

  // prende la prima cifra convertendo in stringa
  const firstDigit = parseInt(String(elementId)[0], 10);

  return elementIcons[firstDigit] || null;
};

const ElementIcon = ({ elementId }) => {
  const iconSrc = getElementIcon(elementId);
  if (!iconSrc) return null;

  return (
    <Image
      src={iconSrc}
      alt="Element Icon"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "1.5rem", height: "auto" }}
      className="inline-block mr-2 opacity-60"
    />
  );
};

export default ElementIcon;

