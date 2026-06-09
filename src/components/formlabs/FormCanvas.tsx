"use client";

import { useState, type DragEvent } from "react";
import type { FormField, FieldType } from "./types";
import FieldRenderer from "./FieldRenderer";

interface FormCanvasProps {
  fields: FormField[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onAddField: (type: FieldType) => void;
  onReorder: (fields: FormField[]) => void;
  onDelete: (id: string) => void;
}

const inputBase =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent/40 focus:bg-white/[0.06] transition-all duration-200";

const labelBase = "block text-xs font-medium text-gray-400 mb-1.5";

export default function FormCanvas({
  fields,
  selectedId,
  onSelect,
  onAddField,
  onReorder,
  onDelete,
}: FormCanvasProps) {
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const handleDragOver = (e: DragEvent, index?: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    if (index !== undefined) setDragOverIdx(index);
  };

  const handleDrop = (e: DragEvent, index?: number) => {
    e.preventDefault();
    setDragOverIdx(null);
    const type = e.dataTransfer.getData("text/plain") as FieldType;
    if (type) {
      onAddField(type);
    }
  };

  const handleFieldDragStart = (e: DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", `reorder:${index}`);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleFieldDragOver = (e: DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIdx(index);
  };

  const handleFieldDrop = (e: DragEvent, toIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverIdx(null);
    const data = e.dataTransfer.getData("text/plain");

    if (data.startsWith("reorder:")) {
      const fromIdx = parseInt(data.split(":")[1], 10);
      if (fromIdx !== toIndex) {
        const reordered = [...fields];
        const [moved] = reordered.splice(fromIdx, 1);
        reordered.splice(toIndex, 0, moved);
        onReorder(reordered);
      }
    }
  };

  const handleDragLeave = () => setDragOverIdx(null);

  return (
    <div
      className="h-full flex flex-col"
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, fields.length)}
      onDragLeave={handleDragLeave}
    >
      <div className="px-4 py-3 border-b border-white/[0.04]">
        <h3 className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
          Form Preview
        </h3>
        <p className="text-[10px] text-gray-600 mt-0.5">
          {fields.length} field{fields.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {fields.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-dashed border-white/[0.08] flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 font-medium">Drop fields here</p>
            <p className="text-xs text-gray-700 mt-1">
              Drag from the palette or click to add
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {fields.map((field, idx) => (
              <div
                key={field.id}
                draggable
                onDragStart={(e) => handleFieldDragStart(e, idx)}
                onDragOver={(e) => handleFieldDragOver(e, idx)}
                onDrop={(e) => handleFieldDrop(e, idx)}
                onDragLeave={handleDragLeave}
                onClick={() => onSelect(field.id)}
                className={`group relative rounded-xl border transition-all duration-200 cursor-pointer ${
                  selectedId === field.id
                    ? "border-accent/40 bg-accent/[0.03] shadow-[0_0_20px_-8px_rgba(59,130,246,0.15)]"
                    : dragOverIdx === idx
                    ? "border-accent/30 bg-white/[0.03]"
                    : "border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02]"
                }`}
              >
                {/* Drag handle */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                    <line x1="8" y1="6" x2="16" y2="6" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                    <line x1="8" y1="18" x2="16" y2="18" />
                  </svg>
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(field.id);
                  }}
                  className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400 text-gray-600 transition-all"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>

                <div className="p-3.5 pl-8">
                  <FieldRenderer field={field} inputBase={inputBase} labelBase={labelBase} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
