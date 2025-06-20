"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "@/app/i18n";

export default function Breadcrumbs({ title, position }) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const { t } = useTranslation("breadcrumbs");

  const capitalizeFirstLetter = (string) =>
    string
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const getLabel = (segment) => {
    const lower = segment.toLowerCase();
    // prova a tradurre la chiave
    const translated = t(lower);
    if (translated === lower) {
      // fallback: capitalizza se non c'è la traduzione
      return capitalizeFirstLetter(segment.replace(/%20/g, " "));
    }
    return translated;
  };

  return (
    <nav className="text-sm text-gray-300">
      <ul className="flex gap-2">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            {index === 0 && (
              <Image 
                src="/icons/breadcrumbHome.svg"
                alt={t("home")}
                width={16}
                height={16}
                className="mr-2"
              />
            )}
            <span className="text-white">
              {index === paths.length - 1 && position === "last" 
                ? title 
                : getLabel(decodeURIComponent(path))}
            </span>
            {index < paths.length - 1 && <span className="mx-2">›</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
