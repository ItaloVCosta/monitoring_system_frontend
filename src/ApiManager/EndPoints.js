const ENDPOINTS = {
    GET_SERVERS: () => '/api/servers',
    GET_SERVER: (id) => `/api/servers/${id}`,
    CREATE_SERVER: () => '/api/servers',
    UPDATE_SERVER: (id) => `/api/servers/${id}`,
    DELETE_SERVER: (id) => `/api/servers/${id}`,
  };
  
  export default ENDPOINTS;