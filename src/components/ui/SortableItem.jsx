"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ id, name, dragging }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    userSelect: "none",
    backgroundColor: dragging ? "#FBBF24" : "#1E40AF",
    color: "#fff",
    padding: "0.75rem 1rem",
    marginBottom: "0.5rem",
    borderRadius: "0.75rem",
    boxShadow: dragging
      ? "0 5px 15px rgba(0,0,0,0.3)"
      : "0 1px 3px rgba(0,0,0,0.1)",
    cursor: "grab",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "background-color 0.2s, box-shadow 0.2s",
    width: "auto"
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {name}
    </div>
  );
}
