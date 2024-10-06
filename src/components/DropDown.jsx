import React from 'react';

const Dropdown = ({ options = [], selected, onChange }) => {
  return (
    <div className="relative w-full max-w-xs">
      <select 
        className="bg-slate-700 text-gray-300 rounded-md p-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
        &#x25BC;
      </span>
    </div>
  );
};

export default Dropdown;
