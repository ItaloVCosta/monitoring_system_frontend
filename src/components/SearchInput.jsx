import React from 'react';

const SearchInput = ({ placeholder = "Filter...", onChange }) => {
  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-slate-700 text-gray-300 rounded-md p-2 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
        &#128269;
      </span>
    </div>
  );
};

export default SearchInput;
