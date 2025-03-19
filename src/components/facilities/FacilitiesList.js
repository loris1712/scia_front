"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const impiantiData = [
  {
    id: "100",
    name: "Scafo",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" opacity="0.6">
        <path d="M2 16L12 21L22 16V14L12 19L2 14V16Z" />
        <path d="M2 12L12 17L22 12V10L12 15L2 10V12Z" />
        <path d="M12 3L2 8L12 13L22 8L12 3Z" />
      </svg>
    ),
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
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" opacity="0.6">
        <path d="M12 2L3 7V17L12 22L21 17V7L12 2ZM5 8.3L12 4L19 8.3V15.7L12 20L5 15.7V8.3Z" />
      </svg>
    ),
  },
  {
    id: "300",
    name: "Impianto elettrico",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" opacity="0.6">
        <path d="M12 2L6 13H10L8 22L18 9H12L14 2H12Z" />
      </svg>
    ),
  },
  {
    id: "400",
    name: "Comando, controllo e sorveglianza",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" opacity="0.6">
        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="4" fill="white" />
      </svg>
    ),
  },
  {
    id: "500",
    name: "Impianti ausiliari",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" opacity="0.6">
        <path d="M3 3V21H21V3H3ZM5 5H19V19H5V5Z" />
      </svg>
    ),
  },
];

export default function ImpiantiTree() {
  const [openNodes, setOpenNodes] = useState({});
  const [search, setSearch] = useState("");
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
          {/* Nodo con icona e chevron */}
          <div className="flex items-center space-x-4">
          {node.children && (
                <svg className="transition-transform"
                style={{ transform: openNodes[node.id] ? "rotate(90deg)" : "rotate(0deg)" }}
                width="16"
                height="16"
                fill="white"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            )}

            {node.icon && <span>{node.icon}</span>}
            
            <span>{node.id} - {node.name}</span>
          </div>

          {/* Icone a destra */}
          <div className="flex items-center space-x-4">
            {/* Campanella */}
            <svg width="24" height="24" viewBox="0 0 16 16" fill="#ffffff20" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1.5C5.52 1.5 3.5 3.52 3.5 6V9.5L2 11V12H14V11L12.5 9.5V6C12.5 3.52 10.48 1.5 8 1.5ZM8 14C7.17 14 6.5 13.33 6.5 12.5H9.5C9.5 13.33 8.83 14 8 14Z" />
            </svg>

            {/* Checkbox */}
            <input
  type="checkbox"
  className="cursor-pointer w-[16px] h-[16px] appearance-none border-2 border-[#ffffff20] bg-transparent rounded-sm transition-all duration-200 
             checked:bg-[#789fd6] checked:border-[#789fd6] hover:opacity-80 focus:outline-none"
/>

            <svg onClick={(e) => {
                e.stopPropagation();
                router.push(`/dashboard/impianti/${node.code}`);
              }}
              className="cursor-pointer"
                width="16"
                height="16"
                fill="white"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            
          </div>
        </div>

        {/* Sottolivelli */}
        {node.children && openNodes[node.id] && (
          <div className="ml-4">{renderTree(node.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div>
     <h2 className="text-3xl text-white mb-4">Impianti</h2>
     <div className="p-4 bg-[#022a52] rounded-lg">
     <div className="relative w-full mb-4">
        <input
        type="text"
        placeholder="Cerca per nome impianto…"
        className="w-full px-4 py-2 pr-10 bg-[#ffffff10] text-white rounded-md 
                    focus:outline-none focus:ring-0 focus:border-transparent"
                    value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
  <svg
    className="absolute right-3 top-1/2 transform -translate-y-1/2"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="white"
  >
    <path d="M10 2C14.42 2 18 5.58 18 10C18 11.95 17.32 13.72 16.22 15.06L22 20.84L20.84 22L15.06 16.22C13.72 17.32 11.95 18 10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2ZM10 4C6.69 4 4 6.69 4 10C4 13.31 6.69 16 10 16C13.31 16 16 13.31 16 10C16 6.69 13.31 4 10 4Z" />
  </svg>
</div>

      {renderTree(filterNodes(impiantiData))}
    </div>
    </div>
    
  );
}
