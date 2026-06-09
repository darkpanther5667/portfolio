"use client";

import type { FormField, FieldType } from "./types";

interface FieldRendererProps {
  field: FormField;
  inputBase: string;
  labelBase: string;
}

export default function FieldRenderer({ field, inputBase, labelBase }: FieldRendererProps) {
  const { label, required, placeholder, options, type } = field;

  const renderSelect = () => (
    <select className={inputBase}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o, i) => (
        <option key={i} value={o}>{o}</option>
      ))}
    </select>
  );

  const renderCheckbox = () => (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div className="w-4 h-4 rounded border border-white/[0.15] bg-white/[0.03] flex items-center justify-center group-hover:border-white/[0.3] transition-colors">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="opacity-0 group-hover:opacity-30 text-gray-400">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span className="text-sm text-gray-400">
        {label}
        {required && <span className="text-red-400/60 ml-0.5">*</span>}
      </span>
    </label>
  );

  const renderRadio = () => (
    <div className="space-y-1.5">
      {options.map((o, i) => (
        <label key={i} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-4 h-4 rounded-full border border-white/[0.15] bg-white/[0.03] flex items-center justify-center group-hover:border-white/[0.3] transition-colors">
            <div className="w-2 h-2 rounded-full bg-white/[0.08] group-hover:bg-white/[0.2] transition-colors" />
          </div>
          <span className="text-sm text-gray-400">{o}</span>
        </label>
      ))}
    </div>
  );

  const renderTextarea = () => (
    <textarea
      className={`${inputBase} resize-none`}
      placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
      rows={3}
    />
  );

  const renderInput = (inputType: string = "text") => (
    <input
      type={inputType}
      className={inputBase}
      placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
    />
  );

  const renderDate = () => (
    <div className="relative">
      <input
        type="date"
        className={`${inputBase} appearance-none [&::-webkit-calendar-picker-indicator]:invert-[0.5]`}
      />
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </div>
  );

  const renderField = () => {
    switch (type) {
      case "select":
        return renderSelect();
      case "checkbox":
        return renderCheckbox();
      case "radio":
        return renderRadio();
      case "textarea":
        return renderTextarea();
      case "date":
        return renderDate();
      case "email":
        return renderInput("email");
      case "password":
        return renderInput("password");
      case "number":
        return renderInput("number");
      case "tel":
        return renderInput("tel");
      case "url":
        return renderInput("url");
      default:
        return renderInput("text");
    }
  };

  return (
    <div>
      {type !== "checkbox" && type !== "radio" && (
        <label className={labelBase}>
          {label}
          {required && <span className="text-red-400/60 ml-0.5">*</span>}
        </label>
      )}
      {renderField()}
    </div>
  );
}
