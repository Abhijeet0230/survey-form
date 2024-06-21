import React from "react";

const InputField = ({ label, type, name, value, onChange, error }) => (
  <div>
    <label className="block font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 p-2 border rounded w-full"
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default InputField;
