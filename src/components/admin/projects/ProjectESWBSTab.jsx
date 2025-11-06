"use client";
import { useState, useEffect } from "react";
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
} from "@dnd-kit/sortable";
import SortableItem from "@/components/ui/SortableItem";
import { Virtuoso } from "react-virtuoso";

import { getESWBSGlossary } from "@/api/admin/eswbs";
import { saveElementModels, getElementModels } from "@/api/admin/elementModel";
import { getMaintenancesModel } from "@/api/admin/maintenances";

export default function ProjectESWBSTab({ projectId }) {
  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Calcola livello gerarchico da codice
  const getLevelFromCode = (code) => {
    if (!code) return 0;
    const clean = code.toString().trim();
    if (/0000$/.test(clean)) return 0;
    if (/00$/.test(clean)) return 1;
    return 2;
  };

  // 🔹 Carica glossario
  useEffect(() => {
    const fetchGlossary = async () => {
      try {
        const data = await getESWBSGlossary();
        const mapped = data.map((item, index) => ({
          id:
            item.id?.toString() ||
            item.eswbs_glossary_id?.toString() ||
            `temp-${index}`,
          code: item.eswbs_glossary_code || "",
          name: item.short_description_ita || "(senza descrizione)",
          level: getLevelFromCode(item.eswbs_glossary_code),
        }));

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

  // 🔹 Carica elementi già salvati (colonna sinistra)
  useEffect(() => {
    const fetchSelected = async () => {
      try {
        const data = await getElementModels(projectId);

        const mapped = data.map((item, index) => ({
          id:
            item.eswbs_glossary_id?.toString() ||
            item.id?.toString() ||
            `selected-${index}`,
          code: item.ESWBS_code || "",
          name: item.LCN_name || "(senza nome)",
          level: getLevelFromCode(item.ESWBS_code),
        }));

        mapped.sort((a, b) => Number(a.code) - Number(b.code));
        setSelectedItems(mapped);

        setAvailableItems((prev) =>
          prev.filter((g) => !mapped.find((s) => s.id === g.id))
        );
      } catch (err) {
        console.error("Errore caricando ElementModel:", err);
      }
    };

    if (projectId) fetchSelected();
  }, [projectId]);

  useEffect(() => {
    const fetchLinkedMaintenances = async () => {
      try {
        const data = await getMaintenancesModel(projectId);
        setMaintenances(data);

        // aggiorna gli elementi selezionati marcando quelli con manutenzioni
        setSelectedItems((prev) =>
          prev.map((item) => ({
            ...item,
            hasMaintenance: data.some(
              (m) => m.System_ElementModel_ID === parseInt(item.id)
            ),
          }))
        );
      } catch (err) {
        console.error("Errore caricando manutenzioni collegate:", err);
      }
    };

    if (projectId) fetchLinkedMaintenances();
  }, [projectId]);

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
    const { active } = event;
    if (!active) return;

    if (availableItems.find((i) => i.id === active.id)) {
      const item = availableItems.find((i) => i.id === active.id);
      setAvailableItems((prev) => prev.filter((i) => i.id !== active.id));
      setSelectedItems((prev) => [...prev, item]);
    } else if (selectedItems.find((i) => i.id === active.id)) {
      const item = selectedItems.find((i) => i.id === active.id);
      setSelectedItems((prev) => prev.filter((i) => i.id !== active.id));
      setAvailableItems((prev) => {
        const updated = [...prev, item];
        return updated.sort((a, b) => Number(a.code) - Number(b.code));
      });
    }

    setActiveId(null);
  };

  const handleSave = async () => {
    if (selectedItems.length === 0) {
      alert("Nessun elemento selezionato da salvare.");
      return;
    }

    try {
      setSaving(true);
      const payload = selectedItems.map((item) => ({
        ship_model_id: projectId,
        ESWBS_code: item.code,
        LCN_name: item.name,
        eswbs_glossary_id: parseInt(item.id),
        parent_element_model_id: 0,
        Installed_quantity_on_End_Item: 1,
        Installed_Quantity_on_Ship: 1,
      }));

      await saveElementModels(payload);
      alert("✅ Elementi salvati correttamente!");
    } catch (err) {
      console.error("Errore durante il salvataggio:", err);
      alert("❌ Errore durante il salvataggio degli elementi");
    } finally {
      setSaving(false);
    }
  };

  const handleFilterByElement = (elementModelId) => {
    window.dispatchEvent(
      new CustomEvent("filterMaintenanceByElement", { detail: elementModelId })
    );

    window.postMessage(
      { type: "openMaintenanceTab", elementModelId },
      "*"
    );
  };


  if (loading)
    return (
      <p className="text-gray-500 text-center mt-6">
        Caricamento glossario ESWBS...
      </p>
    );

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex justify-end mb-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`cursor-pointer px-4 py-2 rounded-lg text-white ${
              saving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? "Salvataggio..." : "Salva ESWBS Elementi"}
          </button>
        </div>

        <div className="flex gap-6">
          {/* SELEZIONATI */}
          <div className="flex-1 p-4 border rounded-xl h-[60vh] overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 shadow-inner">
            <h3 className="font-semibold mb-4 text-gray-700">
              ESWBS Selezionati
            </h3>
            <SortableContext
              items={selectedItems}
              strategy={verticalListSortingStrategy}
            >
              {selectedItems.map((item, index) => (
                <div
                  key={item.id || `selected-${index}`}
                  style={{ paddingLeft: `${item.level * 20}px` }}
                  className={`flex items-center justify-between group ${
                    item.hasMaintenance
                      ? "bg-green-50 border-l-4 border-green-500"
                      : ""
                  }`}
                >
                  <SortableItem
                    key={`sortable-${item.id || index}`}
                    id={item.id}
                    name={`${item.code} - ${item.name}`}
                    dragging={activeId === item.id}
                  />

                    <button
                      onClick={() => handleFilterByElement(item.id)}
                      className="ml-2 text-sm text-[#1e40af] hover:underline cursor-pointer"
                    >
                      Vedi manutenzioni
                    </button>
                </div>
              ))}
            </SortableContext>
          </div>

          {/* GLOSSARIO */}
          <div className="flex-1 p-4 border rounded-xl h-[60vh] overflow-y-auto bg-gradient-to-b from-gray-100 to-gray-200 shadow-inner">
            <h3 className="font-semibold mb-4 text-gray-700">Glossario ESWBS</h3>
            <SortableContext
              items={availableItems}
              strategy={verticalListSortingStrategy}
            >
              <Virtuoso
                style={{ height: 480 }}
                totalCount={availableItems.length}
                itemContent={(index) => {
                  const item = availableItems[index];
                  return (
                    <div
                      key={item.id || `available-${index}`}
                      style={{ paddingLeft: `${item.level * 20}px` }}
                    >
                      <SortableItem
                        key={`sortable-${item.id || index}`}
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
