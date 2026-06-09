"use client";

import type { FormField } from "./types";

interface PropertiesPanelProps {
  field: FormField | null;
  onUpdate: (id: string, updates: Partial<FormField>) => void;
}

export default function PropertiesPanel({ field, onUpdate }: PropertiesPanelProps) {
  if (!field) {
    return (
      <div className="h-full flex flex-col">
        <div className="px-4 py-3 border-b border-white/[0.04]">
          <h3 className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
            Properties
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-xs text-gray-700 text-center">
            Select a field to edit its properties
          </p>
        </div>
      </div>
    );
  }

  const inputBase =
    "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-accent/40 transition-all duration-200";
  const labelBase = "block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5";

  const update = (updates: Partial<FormField>) => onUpdate(field.id, updates);

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-white/[0.04]">
        <h3 className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
          Properties
        </h3>
        <p className="text-[10px] text-gray-600 mt-0.5 capitalize">{field.type}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Label */}
        <div>
          <label className={labelBase}>Label</label>
          <input
            value={field.label}
            onChange={(e) => update({ label: e.target.value })}
            className={inputBase}
            placeholder="Field label"
          />
        </div>

        {/* Placeholder (not for checkbox/radio) */}
        {field.type !== "checkbox" && field.type !== "radio" && (
          <div>
            <label className={labelBase}>Placeholder</label>
            <input
              value={field.placeholder}
              onChange={(e) => update({ placeholder: e.target.value })}
              className={inputBase}
              placeholder="Placeholder text"
            />
          </div>
        )}

        {/* Default value */}
        <div>
          <label className={labelBase}>Default Value</label>
          <input
            value={field.defaultValue}
            onChange={(e) => update({ defaultValue: e.target.value })}
            className={inputBase}
            placeholder="Default value"
          />
        </div>

        {/* Required toggle */}
        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-400">Required</label>
          <button
            onClick={() => update({ required: !field.required })}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
              field.required ? "bg-accent" : "bg-white/[0.08]"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                field.required ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Options (for select, radio) */}
        {(field.type === "select" || field.type === "radio") && (
          <div>
            <label className={labelBase}>Options</label>
            <div className="space-y-1.5">
              {field.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <input
                    value={opt}
                    onChange={(e) => {
                      const newOptions = [...field.options];
                      newOptions[idx] = e.target.value;
                      update({ options: newOptions });
                    }}
                    className={`${inputBase} flex-1`}
                    placeholder="Option"
                  />
                  <button
                    onClick={() => {
                      const newOptions = field.options.filter((_, i) => i !== idx);
                      update({ options: newOptions });
                    }}
                    className="text-gray-600 hover:text-red-400 transition-colors shrink-0"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={() => update({ options: [...field.options, `Option ${field.options.length + 1}`] })}
                className="flex items-center gap-1.5 text-[10px] text-gray-600 hover:text-gray-400 transition-colors mt-1"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add option
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
