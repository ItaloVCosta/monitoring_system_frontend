import ApiManager from "./ApiManager/ApiManager";
import "./App.css";
import Dropdown from "./components/DropDown";
import SearchInput from "./components/SearchInput";
import ServerCard from "./components/ServerCard";
import React, { useState, useMemo } from "react";
import { CiServer } from "react-icons/ci";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingSpinner from "./components/LoadingSpinner";
import NewServerModal from "./components/NewServerModal";

function App() {
  const [selectedOption, setSelectedOption] = useState("All Servers");
  const [searchText, setSearchText] = useState("");
  const [openNewServerModal, setOpenNewServerModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { data: servers, isLoading, error } = useQuery({
    queryKey: ["ServerAll"],
    queryFn: ApiManager.getServers,
  });


  const handleSearchChange = (value) => {
    setSearchText(value);
  };

  const handleDropdownChange = (value) => {
    setSelectedOption(value);
  };

  const filteredServers = useMemo(() => {
    return servers?.filter((server) => {
      const matchesSearchText = server.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus =
        selectedOption === "All Servers" ||
        (selectedOption === "Active Servers" && server.status === 1) ||
        (selectedOption === "Inactive Servers" && server.status === 0);

      return matchesSearchText && matchesStatus;
    });
  }, [servers, searchText, selectedOption]);

  return (
    <div className="bg-gray-900 min-h-screen flex items-center p-4 flex-col">
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
            <button className="bg-slate-700 text-gray-300 rounded-md p-2 flex items-center space-x-2 hover:bg-slate-600 ml-auto"
            onClick={ () => setOpenNewServerModal((state) => !state)}>
              <CiServer />
              <span>Create Server</span>
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-full w-full">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <p className="text-red-500">
            Failed to load servers: {error.message}
          </p>
        ) : (
          <div>
            {filteredServers?.map((server) => (
              <ServerCard
                key={server.id}
                serverId={server.id}
                name={server.name}
                ip={server.ip_address}
                status={server.status}
                memoryUsage={server.memory_usage}
                is_monitored={server.is_monitored}
                cpuUsage={server.cpu_usage}
                setNewServerModalState={setOpenNewServerModal}
                onEdit ={setIsEditing}
              />
            ))}
          </div>
        )}
      </div>
      <NewServerModal
        triggerModal={openNewServerModal}
        setState={setOpenNewServerModal}
        server={isEditing}
      />
    </div>

  );
}

export default App;
