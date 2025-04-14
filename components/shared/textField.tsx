import React from "react";

interface TextFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "textarea" | "email" | "password" | "number";
  rows?: number;
  required?: boolean;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  autoComplete?: string;
  maxLength?: number;
}

export function TextField({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  rows = 4,
  required = false,
  placeholder = "",
  error,
  disabled = false,
  className = "",
  autoComplete,
  maxLength,
}: TextFieldProps) {
  const baseInputClasses = `block w-full rounded-md bg-white/5 backdrop-blur-sm px-3.5 py-2 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 ${
    error ? "outline-red-500 focus:outline-red-500" : ""
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  return (
    <div className={type === "textarea" ? "sm:col-span-2" : ""}>
      <label
        htmlFor={id}
        className="block text-sm/6 font-semibold text-gray-200"
      >
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
      <div className="mt-2.5">
        {type === "textarea" ? (
          <textarea
            id={id}
            name={name}
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseInputClasses}
            required={required}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseInputClasses}
            required={required}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            maxLength={maxLength}
          />
        )}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
