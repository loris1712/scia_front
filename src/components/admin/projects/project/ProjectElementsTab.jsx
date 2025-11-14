"use client";

import { useState, useEffect, useMemo } from "react";

import { getESWBSGlossary } from "@/api/admin/eswbs"; // se non ti serve più puoi rimuoverla del tutto
import {
  saveElementModels,
  getElementModels,
  getElements,
  saveElements, // <<--- DEVI CREARLA/ESPORTARLA NEL TUO API FILE
} from "@/api/admin/elementModel";
import { getMaintenancesModel } from "@/api/admin/maintenances";

// Component: barra superiore con pulsanti + ricerca
function ElementsToolbar({
  searchTerm,
  onSearchChange,
  savingModels,
  converting,
  onSaveModels,
  onConvertToElements,
  mode,
}) {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex justify-between items-center gap-3">
        <div className="flex gap-2">
          <button
            onClick={onSaveModels}
            disabled={savingModels}
            className={`cursor-pointer px-4 py-2 rounded-lg text-white ${
              savingModels
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {savingModels ? "Salvataggio..." : "Salva ElementModel"}
          </button>

          <button
            onClick={onConvertToElements}
            disabled={converting}
            className={`cursor-pointer px-4 py-2 rounded-lg text-white ${
              converting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {converting
              ? "Creazione Element..."
              : "Crea Element da ElementModel"}
          </button>
        </div>

        <span className="text-xs text-gray-500">
          Modalità:{" "}
          <strong>
            {mode === "elements" ? "Element" : "ElementModel (bozza)"}
          </strong>
        </span>
      </div>

      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cerca nell'albero per codice o nome..."
          className="text-[14px] w-full text-gray-700 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
        />
      </div>
    </div>
  );
}

// Component: popup per aggiungere figlio/fratello
function AddElementPopup({
  visible,
  onClose,
  onConfirm,
  elementType,
  newElementName,
  setNewElementName,
}) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[40vw]">
        <h4 className="font-semibold mb-3 text-gray-700">
          {elementType === "child"
            ? "Aggiungi elemento figlio"
            : "Aggiungi elemento fratello"}
        </h4>
        <input
          type="text"
          value={newElementName}
          onChange={(e) => setNewElementName(e.target.value)}
          placeholder="Nome nuovo elemento"
          className="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-300 mb-4 text-gray-700"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="cursor-pointer px-3 py-2 text-sm rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Annulla
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer px-3 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Aggiungi
          </button>
        </div>
      </div>
    </div>
  );
}

// Component: albero elementi
function ElementsTree({
  items,
  activeId,
  onOpenMaintenance,
  onOpenAddSibling,
  onOpenAddChild,
  onDeleteElement,
}) {
  return (
    <div className="flex-1 p-4 border rounded-xl h-[60vh] overflow-y-auto bg-gradient-to-b from-green-50 to-emerald-100 shadow-inner">
      <h3 className="font-semibold mb-4 text-gray-700">Albero Elementi</h3>

      {items.length === 0 && (
        <p className="text-sm text-gray-500">
          Nessun elemento presente per questo progetto.
        </p>
      )}

      {items.map((item, index) => (
        <div
          key={item.id || `item-${index}`}
          style={{ paddingLeft: `${item.level * 20}px` }}
          className={`flex flex-col gap-1 mb-1 ${
            item.hasMaintenance
              ? "bg-emerald-50 border-l-4 border-emerald-500"
              : ""
          } rounded-md p-1`}
        >
          <div className="flex items-center justify-between group">
            <div
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                activeId === item.id ? "bg-emerald-500 text-white" : "bg-white"
              } border border-emerald-200 shadow-sm`}
            >
              {item.code ? `${item.code} - ${item.name}` : item.name}
            </div>

            <div className="flex items-center gap-2 ml-2 text-sm">
              {/* Vedi manutenzioni collegate */}
              <button
                onClick={() => onOpenMaintenance(item.id)}
                title="Vedi le manutenzioni di questo elemento"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                  width="22px"
                  height="22px"
                  fill="black"
                  viewBox="0 0 640 640"
                >
                  <path d="M541.4 162.6C549 155 561.7 156.9 565.5 166.9C572.3 184.6 576 203.9 576 224C576 312.4 504.4 384 416 384C398.5 384 381.6 381.2 365.8 376L178.9 562.9C150.8 591 105.2 591 77.1 562.9C49 534.8 49 489.2 77.1 461.1L264 274.2C258.8 258.4 256 241.6 256 224C256 135.6 327.6 64 416 64C436.1 64 455.4 67.7 473.1 74.5C483.1 78.3 484.9 91 477.4 98.6L388.7 187.3C385.7 190.3 384 194.4 384 198.6L384 240C384 248.8 391.2 256 400 256L441.4 256C445.6 256 449.7 254.3 452.7 251.3L541.4 162.6z" />
                </svg>
              </button>

              {/* Fratello */}
              <button
                onClick={() => onOpenAddSibling(item.id)}
                title="Crea un elemento fratello"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                  width="22px"
                  height="22px"
                  fill="black"
                  viewBox="0 0 640 640"
                >
                  <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
                </svg>
              </button>

              {/* Delete solo custom */}
              {item.isCustom && (
                <button
                  onClick={() => onDeleteElement(item.id)}
                  title="Elimina elemento"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer"
                    width="22px"
                    height="22px"
                    fill="black"
                    viewBox="0 0 640 640"
                  >
                    <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="ml-8">
            {/* Figlio */}
            <button
              onClick={() => onOpenAddChild(item.id)}
              title="Crea un elemento figlio"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                width="22px"
                height="22px"
                fill="black"
                viewBox="0 0 640 640"
              >
                <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProjectElementsTab({ projectId }) {
  const [items, setItems] = useState([]);
  const [mode, setMode] = useState("elementModels"); // "elementModels" | "elements"
  const [maintenances, setMaintenances] = useState([]);

  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingModels, setSavingModels] = useState(false);
  const [converting, setConverting] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupTarget, setPopupTarget] = useState(null);
  const [newElementName, setNewElementName] = useState("");
  const [newElementType, setNewElementType] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const getLevelFromCode = (code) => {
    if (!code) return 0;
    const clean = code.toString().trim();
    if (/0000$/.test(clean)) return 0;
    if (/00$/.test(clean)) return 1;
    return 2;
  };

  // Carica iniziale: prima Element, se vuoti passa a ElementModel
  useEffect(() => {
    const load = async () => {
      if (!projectId) return;
      setLoading(true);
      try {
        // 1) provo a prendere gli Element (tabella finale)
        const elements = await getElements(projectId);

        if (elements && elements.length > 0) {
          const mapped = elements.map((item, idx) => ({
            id: item.id?.toString() || `element-${idx}`,
            code: item.ESWBS_code || "",
            name: item.LCN_name || "(senza nome)",
            level: getLevelFromCode(item.ESWBS_code),
            isCustom: item.isCustom || false,
          }));
          setItems(mapped);
          setMode("elements");
        } else {
          const models = await getElementModels(projectId);
          const mapped = models.map((item, idx) => ({
            id:
              item.eswbs_glossary_id?.toString() ||
              item.id?.toString() ||
              `model-${idx}`,
            code: item.ESWBS_code || "",
            name: item.LCN_name || "(senza nome)",
            level: getLevelFromCode(item.ESWBS_code),
            isCustom: item.isCustom || false,
          }));
          mapped.sort((a, b) => Number(a.code) - Number(b.code));
          setItems(mapped);
          setMode("elementModels");
        }
      } catch (e) {
        console.error("Errore caricando Element/ElementModel:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [projectId]);

  useEffect(() => {
    const fetchLinkedMaintenances = async () => {
      if (!projectId) return;
      try {
        const data = await getMaintenancesModel(projectId);
        setMaintenances(data);

        setItems((prev) =>
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

    fetchLinkedMaintenances();
  }, [projectId]);

  // Salva ElementModels (bozza)
  const handleSaveModels = async () => {
    if (items.length === 0) {
      alert("Nessun elemento da salvare.");
      return;
    }

    try {
      setSavingModels(true);

      const payload = items.map((item) => ({
        ship_model_id: projectId,
        ESWBS_code: item.code,
        LCN_name: item.name,
        eswbs_glossary_id: parseInt(item.id) || null,
        parent_element_model_id: 0,
        Installed_quantity_on_End_Item: 1,
        Installed_Quantity_on_Ship: 1,
      }));

      await saveElementModels(payload);
      alert("ElementModel salvati correttamente!");
    } catch (err) {
      console.error("Errore durante il salvataggio ElementModel:", err);
      alert("Errore durante il salvataggio degli ElementModel");
    } finally {
      setSavingModels(false);
    }
  };

  // Converte ElementModels -> Element
  const handleConvertToElements = async () => {
    if (!projectId) return;

    try {
      setConverting(true);

      // 1) ricarico i Model dal DB per essere sicuro di avere la versione salvata
      const models = await getElementModels(projectId);

      if (!models || models.length === 0) {
        alert(
          "Non ci sono ElementModel salvati per questo progetto. Salva prima gli ElementModel."
        );
        return;
      }

      // 2) preparo payload per tabella Element
      const payload = models.map((m) => ({
        project_id: projectId,
        ESWBS_code: m.ESWBS_code,
        LCN_name: m.LCN_name,
        element_model_id: m.id, // riferimento al model, se ti serve
        parent_element_id: null, // gestisci tu la gerarchia lato backend se necessario
        Installed_quantity_on_End_Item: m.Installed_quantity_on_End_Item ?? 1,
        Installed_Quantity_on_Ship: m.Installed_Quantity_on_Ship ?? 1,
      }));

      // 3) salvataggio Elements (DEVI implementare questa API)
      await saveElements(payload);

      // 4) ricarico l'albero da getElements
      const elements = await getElements(projectId);
      const mapped = elements.map((item, idx) => ({
        id: item.id?.toString() || `element-${idx}`,
        code: item.ESWBS_code || "",
        name: item.LCN_name || "(senza nome)",
        level: getLevelFromCode(item.ESWBS_code),
        isCustom: item.isCustom || false,
      }));
      setItems(mapped);
      setMode("elements");

      alert("Element creati correttamente a partire dagli ElementModel!");
    } catch (err) {
      console.error("Errore durante la creazione degli Element:", err);
      alert("Errore durante la creazione degli Element");
    } finally {
      setConverting(false);
    }
  };

  const handleFilterByElement = (elementId) => {
    window.dispatchEvent(
      new CustomEvent("filterMaintenanceByElement", { detail: elementId })
    );
    window.postMessage({ type: "openMaintenanceTab", elementId }, "*");
  };

  // Popup handlers
  const openPopup = (targetId, type) => {
    setPopupTarget(targetId);
    setNewElementType(type);
    setShowPopup(true);
  };

  const handleAddElement = () => {
    if (!newElementName.trim()) return alert("Inserisci un nome valido");

    setItems((prev) => {
      const target = prev.find((i) => i.id === popupTarget);
      if (!target) return prev;

      const newItem = {
        id: `custom-${Date.now()}`,
        code: "",
        name: newElementName,
        level: newElementType === "child" ? target.level + 1 : target.level,
        isCustom: true,
      };

      const index = prev.findIndex((i) => i.id === popupTarget);
      const updated = [...prev];
      updated.splice(index + 1, 0, newItem);
      return updated;
    });

    setShowPopup(false);
    setNewElementName("");
    setPopupTarget(null);
  };

  const handleDeleteElement = (targetId) => {
    setItems((prev) => {
      const index = prev.findIndex((i) => i.id === targetId);
      if (index === -1) return prev;

      const target = prev[index];
      if (!target.isCustom) {
        alert("⚠️ Non puoi eliminare un elemento ufficiale.");
        return prev;
      }

      const targetLevel = target.level;
      let endIndex = index + 1;
      while (
        endIndex < prev.length &&
        prev[endIndex].level > targetLevel &&
        prev[endIndex].isCustom
      ) {
        endIndex++;
      }

      const updated = [...prev];
      updated.splice(index, endIndex - index);
      return updated;
    });
  };

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        (item.code || "").toLowerCase().includes(term)
    );
  }, [items, searchTerm]);

  if (loading) {
    return (
      <p className="text-gray-500 text-center mt-6">
        Caricamento alberatura elementi...
      </p>
    );
  }

  return (
    <div>
      <ElementsToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        savingModels={savingModels}
        converting={converting}
        onSaveModels={handleSaveModels}
        onConvertToElements={handleConvertToElements}
        mode={mode}
      />

      <div className="flex gap-6">
        <ElementsTree
          items={filteredItems}
          activeId={activeId}
          onOpenMaintenance={handleFilterByElement}
          onOpenAddSibling={(id) => openPopup(id, "sibling")}
          onOpenAddChild={(id) => openPopup(id, "child")}
          onDeleteElement={handleDeleteElement}
        />
      </div>

      <AddElementPopup
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        onConfirm={handleAddElement}
        elementType={newElementType}
        newElementName={newElementName}
        setNewElementName={setNewElementName}
      />
    </div>
  );
}
