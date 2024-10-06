import React, { useEffect, useState } from "react";
import ApiManager from "../ApiManager/ApiManager";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const NewServerModal = ({ triggerModal: isOpen, setState: setIsOpen, server, setServer }) => {
  const [formData, setFormData] = useState({
    server_name: "",
    ip_address: "",
    status: 0,
    is_monitored: 0,
  });
  console.log(formData)
  useEffect(() => {
    if (server) {
      setFormData({
        server_name: server.name,
        ip_address: server.ip,
        status: server.status,
        is_monitored: server.is_monitored,
      });
    }
  }, [server]);

  const toggleModal = () => {
    setFormData({
      server_name: "",
      ip_address: "",
      status: 0,
      is_monitored: 0,
    });
    console.log(formData);
    setIsOpen((state) => !state);
  };

  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (serverData) => {
      if (server) {
        return ApiManager.updateServer(server.serverId, serverData);
      }
      return ApiManager.createServer(serverData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("ServerAll");
      toast.success(server ? "Server updated successfully!" : "Server created successfully!");
      toast.remove("Loading");
      setIsOpen(false);
      setFormData({
        server_name: "",
        ip_address: "",
        status: 0,
        is_monitored: 0,
      });
      setServer(false);
    },
    onError: (error) => {
      toast.error(`Failed to ${server ? "update" : "create"} server: ${error}`);
      toast.remove("Loading");
      setServer(false);
      
    },
    onMutate: () => {
      toast.loading("Loading...", {
        id: "Loading",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.server_name.value,
      ip_address: e.target.ip_address.value,
      status: e.target.status.checked ? 1 : 0,
      is_monitored: e.target.is_monitored.checked ? 1 : 0,
    };
    mutate(formData);
  };

  return (
    <div>
      <Toaster />
      {isOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-[calc(100%-1rem)] max-h-full flex overflow-y-auto overflow-x-hidden inset-0"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {server ? "Edit Server" : "Create New Server"}
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="server_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="server_name"
                      id="server_name"
                      value={formData.server_name}
                      onChange={(e) => setFormData({ ...formData, server_name: e.target.value })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type server name"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="ip_address"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      IP Address
                    </label>
                    <input
                      type="text"
                      name="ip_address"
                      id="ip_address"
                      value={formData.ip_address}
                      onChange={(e) => setFormData({ ...formData, ip_address: e.target.value })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type server IP address"
                      required
                    />
                  </div>

                  <div className="col-span-2 flex items-center">
                    <input
                      id="is_monitored"
                      name="is_monitored"
                      type="checkbox"
                      checked={formData.is_monitored}
                      onChange={(e) => setFormData({ ...formData, is_monitored: e.target.checked })}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="is_monitored"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Monitor Server
                    </label>
                  </div>

                  <div className="col-span-2 flex items-center">
                    <input
                      id="status"
                      name="status"
                      type="checkbox"
                      checked={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="status"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Server Connected
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-auto"
                  >
                    {isLoading ? "Saving..." : server ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewServerModal;
