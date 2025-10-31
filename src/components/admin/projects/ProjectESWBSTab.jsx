"use client";
import { useState, useEffect } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "@/components/ui/SortableItem";
import { getESWBSGlossary } from "@/api/admin/eswbs";
import { Virtuoso } from "react-virtuoso";

export default function ProjectESWBSTab({ projectId }) {
  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // 🔹 Calcola livello da codice (basato sugli zeri finali)
  const getLevelFromCode = (code) => {
    if (!code) return 0;
    const clean = code.toString().trim();

    // Esempio: 10000 → liv 0, 10010 → liv 1, 10011 → liv 2
    if (/0000$/.test(clean)) return 0;
    if (/00$/.test(clean)) return 1;
    return 2;
  };

  // 🔹 Carica glossario ESWBS
  useEffect(() => {
    const fetchGlossary = async () => {
      try {
        const data = await getESWBSGlossary();

        const mapped = data.map((item) => ({
          id: item.id.toString(),
          code: item.eswbs_glossary_code || "",
          name: item.short_description_ita || "(senza descrizione)",
          level: getLevelFromCode(item.eswbs_glossary_code),
        }));

        // Ordina numericamente per codice
        mapped.sort((a, b) => Number(a.code) - Number(b.code));

        setAvailableItems(mapped);
      } catch (err) {
        console.error("Errore caricando il glossario:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGlossary();
  }, []);

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
  const { active } = event;
  if (!active) return;

  if (availableItems.find((i) => i.id === active.id)) {
    // 🔹 Sposta dal glossario ai selezionati
    const item = availableItems.find((i) => i.id === active.id);
    setAvailableItems((prev) => prev.filter((i) => i.id !== active.id));
    setSelectedItems((prev) => [...prev, item]);
  } else if (selectedItems.find((i) => i.id === active.id)) {
    // 🔹 Sposta dai selezionati al glossario
    const item = selectedItems.find((i) => i.id === active.id);
    setSelectedItems((prev) => prev.filter((i) => i.id !== active.id));
    setAvailableItems((prev) => {
      const updated = [...prev, item];
      // 👇 Riordina subito dopo aver reinserito
      return updated.sort((a, b) => Number(a.code) - Number(b.code));
    });
  }

  setActiveId(null);
};


  if (loading)
    return <p className="text-gray-500 text-center mt-6">Caricamento glossario ESWBS...</p>;

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6">
          {/* SELEZIONATI */}
          <div className="flex-1 p-4 border rounded-xl h-[60vh] overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 shadow-inner">
            <h3 className="font-semibold mb-4 text-gray-700">ESWBS Selezionati</h3>
            <SortableContext items={selectedItems} strategy={verticalListSortingStrategy}>
              {selectedItems.map((item) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  name={`${item.code} - ${item.name}`}
                  dragging={activeId === item.id}
                />
              ))}
            </SortableContext>
          </div>

          {/* GLOSSARIO */}
          <div className="flex-1 p-4 border rounded-xl h-[60vh] overflow-y-auto bg-gradient-to-b from-gray-100 to-gray-200 shadow-inner">
            <h3 className="font-semibold mb-4 text-gray-700">Glossario ESWBS</h3>
            <SortableContext items={availableItems} strategy={verticalListSortingStrategy}>
              <Virtuoso
  style={{ height: 480 }}
  totalCount={availableItems.length}
  itemContent={(index) => {
    const item = availableItems[index];
    return (
      <div
        key={item.id}
        style={{ paddingLeft: `${item.level * 20}px` }}
      >
        <SortableItem
          id={item.id}
          name={`${item.code} - ${item.name}`}
          dragging={activeId === item.id}
        />
      </div>
    );
  }}
/>

            </SortableContext>
          </div>
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="p-3 border rounded-lg bg-yellow-400 text-white shadow-lg font-semibold">
              {availableItems.find((i) => i.id === activeId)?.name ||
                selectedItems.find((i) => i.id === activeId)?.name}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
