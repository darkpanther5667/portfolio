"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { FieldType } from "@/components/formlabs/types";
import { createField } from "@/components/formlabs/types";
import FieldPalette from "@/components/formlabs/FieldPalette";
import FormCanvas from "@/components/formlabs/FormCanvas";
import PropertiesPanel from "@/components/formlabs/PropertiesPanel";
import ExportModal from "@/components/formlabs/ExportModal";
import type { FormField } from "@/components/formlabs/types";

export default function FormLabsPage() {
  const [title, setTitle] = useState("Contact Form");
  const [fields, setFields] = useState<FormField[]>([
    {
      id: "name",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your name",
      required: true,
      options: [],
      defaultValue: "",
    },
    {
      id: "email_field",
      type: "email",
      label: "Email Address",
      placeholder: "you@example.com",
      required: true,
      options: [],
      defaultValue: "",
    },
    {
      id: "role",
      type: "select",
      label: "Role",
      placeholder: "Select your role",
      required: false,
      options: ["Designer", "Developer", "Product Manager", "Other"],
      defaultValue: "",
    },
    {
      id: "message",
      type: "textarea",
      label: "Message",
      placeholder: "Tell us about yourself...",
      required: false,
      options: [],
      defaultValue: "",
    },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showExport, setShowExport] = useState(false);

  const selectedField = fields.find((f) => f.id === selectedId) || null;

  const handleAddField = useCallback((type: FieldType) => {
    const newField = createField(type);
    setFields((prev) => [...prev, newField]);
    setSelectedId(newField.id);
  }, []);

  const handleUpdateField = useCallback((id: string, updates: Partial<FormField>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  }, []);

  const handleReorder = useCallback((reordered: FormField[]) => {
    setFields(reordered);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    setSelectedId((prev) => (prev === id ? null : prev));
  }, []);

  const handleClear = useCallback(() => {
    setFields([]);
    setSelectedId(null);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Top bar */}
      <header className="border-b border-white/[0.04] bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Portfolio</span>
            </a>
            <span className="text-gray-700/50">/</span>
            <span className="text-sm font-semibold text-white tracking-tight">
              FormLabs
            </span>
            <span className="hidden sm:inline text-[10px] font-mono text-accent/60 bg-accent/5 px-2 py-0.5 rounded-full border border-accent/10">
              Drag &amp; Drop
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowExport(true)}
              disabled={fields.length === 0}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-accent text-white rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export
            </button>
            <button
              onClick={handleClear}
              disabled={fields.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium glass text-gray-400 rounded-lg transition-all duration-200 hover:bg-white/[0.08] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left - Field Palette */}
        <div className="lg:w-48 xl:w-56 border-b lg:border-b-0 lg:border-r border-white/[0.04] bg-white/[0.01]">
          <FieldPalette onAddField={handleAddField} />
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Form title */}
          <div className="px-4 py-2.5 border-b border-white/[0.04] bg-white/[0.01]">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent text-sm font-semibold text-gray-300 placeholder-gray-600 focus:outline-none w-full"
              placeholder="Form Title"
            />
          </div>
          <FormCanvas
            fields={fields}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onAddField={handleAddField}
            onReorder={handleReorder}
            onDelete={handleDelete}
          />
        </div>

        {/* Right - Properties Panel */}
        <div className="lg:w-56 xl:w-64 border-t lg:border-t-0 lg:border-l border-white/[0.04] bg-white/[0.01]">
          <PropertiesPanel field={selectedField} onUpdate={handleUpdateField} />
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal
        open={showExport}
        onClose={() => setShowExport(false)}
        fields={fields}
        title={title}
      />
    </div>
  );
}
