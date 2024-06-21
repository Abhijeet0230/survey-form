import React from "react";

const TextareaField = ({ label, name, value, onChange, error }) => (
  <div>
    <label className="block font-medium">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 p-2 border rounded w-full h-32 max-h-64 overflow-auto resize-y"
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default TextareaField;
