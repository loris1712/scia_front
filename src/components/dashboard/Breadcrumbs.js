"use client";

import { usePathname } from "next/navigation";
import Image from 'next/image';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  // Mappa di sostituzioni personalizzate
  const customLabels = {
    cart: "Carrello",
    maintenance: "Manutenzione",
    settings: "Impostazioni",
    remoteassistance: "Assistenza Remota",
    spare: "Ricambi",
    locations: "Ubicazioni",
  };

  // Capitalizza la prima lettera
  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Restituisce l'etichetta corretta
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
                width={15} 
                height={15}
                className="mr-2"
              />
            )}
            <span className="text-white">
              {getLabel(decodeURIComponent(path))}
            </span>
            {index < paths.length - 1 && <span className="mx-2">›</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}