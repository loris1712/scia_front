"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const impiantiData = [
  {
    id: "100",
    name: "Scafo",
    icon: "/icons/facilities/ico1.svg",
    children: [
      {
        id: "1.1",
        name: "Secondo livello A",
        children: [
          { id: "1.1.1", name: "Motore centrale", code: "motore-centrale" },
          { id: "1.1.2", name: "Terzo livello B" },
        ],
      },
      { id: "1.2", name: "Secondo livello B" },
    ],
  },
  {
    id: "200",
    name: "Propulsioni/Motori",
    icon: "/icons/facilities/ico2.svg",
  },
  {
    id: "300",
    name: "Impianto elettrico",
    icon: "/icons/facilities/ico3.svg",
  },
  {
    id: "400",
    name: "Comando, controllo e sorveglianza",
    icon: "/icons/facilities/ico4.svg",
  },
  {
    id: "500",
    name: "Impianti ausiliari",
    icon: "/icons/facilities/ico5.svg",
  },
  {
    id: "600",
    name: "Allestimento e Arredamento",
    icon: "/icons/facilities/ico6.svg",
  },
  {
    id: "700",
    name: "Armamenti",
    icon: "/icons/facilities/ico7.svg",
  },
  {
    id: "800",
    name: "Integration / Engineering",
    icon: "/icons/facilities/ico8.svg",
  },
  {
    id: "900",
    name: "Ship Assembly / Support Services",
    icon: "/icons/facilities/ico9.svg",
  },
];

export default function ImpiantiList({ search, modal }) {
  const [openNodes, setOpenNodes] = useState({});
  const router = useRouter();

  const toggleNode = (id) => {
    setOpenNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filterNodes = (nodes) => {
    return nodes
      .map((node) => {
        const children = node.children ? filterNodes(node.children) : [];
        if (node.name.toLowerCase().includes(search.toLowerCase()) || children.length > 0) {
          return { ...node, children };
        }
        return null;
      })
      .filter(Boolean);
  };

  const renderTree = (nodes, level = 0) => {
    return nodes.map((node) => (
      <div key={node.id} className="flex flex-col">
        <div
          className="flex items-center justify-between px-2 py-4 cursor-pointer border-b border-[#ffffff20]"
          onClick={() => toggleNode(node.id)}
        >
          <div className="flex items-center space-x-4">
            {node.children && (
              <svg
                className="transition-transform"
                style={{ transform: openNodes[node.id] ? "rotate(90deg)" : "rotate(0deg)" }}
                width="16"
                height="16"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            )}
            {node.icon && <img src={node.icon} alt={node.name} className="w-6 h-6 opacity-60" />}
            <span>{node.id} - {node.name}</span>
          </div>

          <div className="flex items-center space-x-4">
            <input type="checkbox" className="mr-2 cursor-pointer w-[20px] h-[20px] appearance-none border-2 border-[#ffffff20] bg-transparent rounded-sm transition-all duration-200 checked:bg-[#789fd6] checked:border-[#789fd6] hover:opacity-80 focus:outline-none ml-auto" />
            <svg
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/dashboard/impianti/${node.code}`);
              }}
              className="cursor-pointer"
              width="16"
              height="16"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </div>
        </div>

        {node.children && openNodes[node.id] && (
          <div className="ml-4">{renderTree(node.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div style={modal === "yes" ? { overflowY: "scroll", height: "30vh" } : {}}>
      {renderTree(filterNodes(impiantiData))}
    </div>
  );
}
