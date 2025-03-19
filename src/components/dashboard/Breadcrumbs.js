"use client";

import { usePathname } from "next/navigation";
import Image from 'next/image';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

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
            <span className={index === paths.length - 1 ? "text-white" : "text-white"}>
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </span>
            {index < paths.length - 1 && <span className="mx-2">›</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
