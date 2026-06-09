export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  required: boolean;
  options: string[];
  defaultValue: string;
}

export function createField(type: FieldType): FormField {
  const id = `${type}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const base = {
    id,
    type,
    required: false,
    placeholder: "",
    defaultValue: "",
  };

  switch (type) {
    case "text":
      return { ...base, label: "Text Input", options: [] };
    case "email":
      return { ...base, label: "Email", options: [] };
    case "password":
      return { ...base, label: "Password", options: [] };
    case "number":
      return { ...base, label: "Number", options: [] };
    case "tel":
      return { ...base, label: "Phone", options: [] };
    case "url":
      return { ...base, label: "Website", options: [] };
    case "textarea":
      return { ...base, label: "Message", options: [] };
    case "select":
      return { ...base, label: "Choose an option", placeholder: "Select...", options: ["Option 1", "Option 2", "Option 3"] };
    case "checkbox":
      return { ...base, label: "I agree", options: [] };
    case "radio":
      return { ...base, label: "Select one", options: ["Option 1", "Option 2", "Option 3"] };
    case "date":
      return { ...base, label: "Date", options: [] };
  }
}
