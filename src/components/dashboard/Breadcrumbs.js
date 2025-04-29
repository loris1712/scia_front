"use client";

import { usePathname } from "next/navigation";
import Image from 'next/image';

export default function Breadcrumbs({ title, position }) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const customLabels = {
    cart: "Carrello",
    maintenance: "Manutenzione",
    settings: "Impostazioni",
    remoteassistance: "Assistenza Remota",
    spare: "Ricambi",
    locations: "Ubicazioni",
    readings: "Letture",
  };

  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getLabel = (segment) => {
    const lower = segment.toLowerCase();
    return customLabels[lower] || capitalizeFirstLetter(segment.replace(/%20/g, " "));
  };

  return (
    <nav className="text-sm text-gray-300">
      <ul className="flex gap-2">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            {index === 0 && (
              <Image 
                src="/icons/breadcrumbHome.svg"
                alt="Home"
                width="0"
            height="0"
            sizes="100vw"
            style={{ width: '1rem', height: 'auto' }}
                className="mr-2"
              />
            )}
            <span className="text-white">
              {index === paths.length - 1 && position === "last" 
                ? title // Se la posizione è "last", mostra il title
                : getLabel(decodeURIComponent(path))}
            </span>
            {index < paths.length - 1 && <span className="mx-2">›</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
