import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ApiManager from "../ApiManager/ApiManager";

const ServerCard = ({
  serverId,
  name,
  ip,
  status,
  cpuUsage,
  memoryUsage,
  is_monitored,
  setNewServerModalState,
  onEdit,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions( (showOptions) => !showOptions);
  };

  const queryClient = useQueryClient();
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (serverid) => ApiManager.deleteServer(serverid),
    onSuccess: () => {
      queryClient.invalidateQueries("ServerAll");
      toast.success("Server deleted successfully!");
      toast.remove("Loading");
      setShowOptions(false);
    },
    onError: (error) => {
      toast.error(`Failed to delete server: ${error}`);
      toast.remove("Loading");
      setShowOptions(false);
    },
    onMutate: () => {
      toast.loading("Loading...", {
        id: "Loading",
      });
    },
  });

  const handleEdit = () => {
    setNewServerModalState(true);
    onEdit({ serverId, name, ip, status, is_monitored });
    setShowOptions(false);
  };

  const handleDelete = () => {
    mutateDelete(serverId);
  };

  return (
    <div className="bg-slate-800 text-white rounded-lg p-4 flex items-center justify-between shadow-lg flex-col sm:flex-row border-2 border-slate-700 mt-2 relative">
      <div className="flex items-center space-x-4">
        <div>
          <p
            className={`font-semibold text-lg ${
              status ? "text-emerald-400" : "text-red-400"
            } `}
          >
            {name}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
        <span className="text-sm text-gray-400">IP: {ip}</span>
        <span className="text-sm text-gray-400">CPU: {cpuUsage ?? "- "} %</span>
        <span className="text-sm text-gray-400">
          Memory: {memoryUsage ?? "- "} %
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <div
          className={`flex items-center space-x-2 rounded-full p-2 ${
            status ? "bg-emerald-600" : "bg-red-500"
          }`}
        >
          <span
            className={`w-3 h-3 rounded-full ${
              status ? "bg-green-500" : "bg-red-400"
            }`}
          ></span>
          <span className="text-xs text-white">
            {status ? "Connected" : "Disconnected"}
          </span>
        </div>

        <div className="relative">
          <button
            onClick={toggleOptions}
            className="text-gray-400 focus:outline-none"
          >
            <FiMoreVertical size={24} />
          </button>

          {showOptions && (
            <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-50">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServerCard;
