"use client";
import { useState } from "react";
import { X } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id, name, dragging }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    userSelect: "none",
    backgroundColor: dragging ? "#FBBF24" : "#1E40AF", // giallo soft per drag, blu intenso per default
    color: "#fff",
    padding: "0.75rem 1rem",
    marginBottom: "0.5rem",
    borderRadius: "0.75rem",
    boxShadow: dragging ? "0 5px 15px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.1)",
    cursor: "grab",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "background-color 0.2s, box-shadow 0.2s",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {name}
    </div>
  );
}

export default function ESWBSModal({ onClose }) {
  const [availableItems, setAvailableItems] = useState([
    { id: '1', name: 'Hull' },
    { id: '2', name: 'Deck' },
    { id: '3', name: 'Engine' },
    { id: '4', name: 'Bridge' },
    { id: '5', name: 'Propeller' }
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragStart = (event) => setActiveId(event.active.id);
  const handleDragEnd = (event) => {
    const { active } = event;
    if (!active) return;

    if (availableItems.find(i => i.id === active.id)) {
      const item = availableItems.find(i => i.id === active.id);
      setAvailableItems(prev => prev.filter(i => i.id !== active.id));
      setSelectedItems(prev => [...prev, item]);
    } else if (selectedItems.find(i => i.id === active.id)) {
      const item = selectedItems.find(i => i.id === active.id);
      setSelectedItems(prev => prev.filter(i => i.id !== active.id));
      setAvailableItems(prev => [...prev, item]);
    }

    setActiveId(null);
  };

  return (
    //fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-x-hidden
    <div className="">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-6xl relative flex gap-6 overflow-x-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          <X size={24} />
        </button>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {/* Colonna sinistra */}
          <div className="flex-1 p-4 border rounded-xl h-[60vh] overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 shadow-inner">
            <h3 className="font-semibold mb-4 text-gray-700">EWSBS Nave</h3>
            <SortableContext items={selectedItems} strategy={verticalListSortingStrategy}>
              {selectedItems.map(item => (
                <SortableItem key={item.id} id={item.id} name={item.name} dragging={activeId === item.id} />
              ))}
            </SortableContext>
          </div>

          {/* Colonna destra */}
          <div className="flex-1 p-4 border rounded-xl h-[60vh] overflow-y-auto bg-gradient-to-b from-gray-100 to-gray-200 shadow-inner">
            <h3 className="font-semibold mb-4 text-gray-700">Glossario ESWBS</h3>
            <SortableContext items={availableItems} strategy={verticalListSortingStrategy}>
              {availableItems.map(item => (
                <SortableItem key={item.id} id={item.id} name={item.name} dragging={activeId === item.id} />
              ))}
            </SortableContext>
          </div>

          <DragOverlay>
            {activeId ? (
              <div className="p-3 border rounded-lg bg-yellow-400 text-white shadow-lg font-semibold">
                {availableItems.find(i => i.id === activeId)?.name ||
                 selectedItems.find(i => i.id === activeId)?.name}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
