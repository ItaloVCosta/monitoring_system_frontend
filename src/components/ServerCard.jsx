import React from "react";

const ServerCard = ({ name, ip, status, cpuUsage, memoryUsage }) => {
  return (
    <div className="bg-slate-800 text-white rounded-lg p-4 flex items-center justify-between shadow-lg flex-col sm:flex-row border-2 border-slate-700 mt-2">
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
        <span className="text-sm text-gray-400">CPU: {cpuUsage ?? '- '}%</span>
        <span className="text-sm text-gray-400">Memory: {memoryUsage ?? '- '}%</span>
      </div>

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
    </div>
  );
};

export default ServerCard;
