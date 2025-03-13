"use client";

import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-300">
      <ul className="flex gap-2">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            {index === 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v5.379l3.618-3.618a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 8.379V3a1 1 0 011-1zM5 10a1 1 0 011-1h8a1 1 0 011 1v7a1 1 0 01-1 1H6a1 1 0 01-1-1v-7z"
                  clipRule="evenodd"
                />
              </svg>
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
