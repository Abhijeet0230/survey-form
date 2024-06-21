import React from "react";

const DropdownField = ({ label, name, value, options, onChange, error }) => (
  <div className="dropdown-field mb-4 relative">
    <label className="block text-gray-700 font-bold mb-2">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="form-select mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 relative z-10 p-2"
    >
      <option value="">Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 italic">{error}</p>}
  </div>
);

export default DropdownField;
