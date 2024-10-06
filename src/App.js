import "./App.css";
import Dropdown from "./components/DropDown";
import SearchInput from "./components/SearchInput";
import ServerCard from "./components/ServerCard";
import React, { useState } from "react";
import { CiServer } from "react-icons/ci";

function App() {
  const [selectedOption, setSelectedOption] = useState("All Servers");
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (value) => {
    setSearchText(value);
  };
  const handleDropdownChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center p-4 flex-col ">
      <div className="w-4/5">
        <h1 className="text-gray-400 font-bold self-start">Servers</h1>
        <div className="flex flex-col md:flex-row items-center justify-between pb-4 w-full space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-1/2">
            <Dropdown
              options={["All Servers", "Active Servers", "Inactive Servers"]}
              selected={selectedOption}
              onChange={handleDropdownChange}
            />
            <SearchInput
              placeholder="Filter servers..."
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex justify-end w-full md:w-auto">
            <button className="bg-slate-700 text-gray-300 rounded-md p-2 flex items-center space-x-2 hover:bg-slate-600 ml-auto">
              <CiServer />
              <span>Create Server</span>
            </button>
          </div>
        </div>

        <ServerCard
          name="fathomless-silence"
          version="PHP 8.3, MySQL 8"
          ip="142.93.62.191"
          status={true} 
        />
        <ServerCard
          name="lonely-peak"
          version="Node.js 14, MongoDB"
          ip="192.168.1.25"
          status={false} 
        />
      </div>
    </div>
  );
}

export default App;
