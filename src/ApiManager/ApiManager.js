import ApiMethods from './ApiMethods';
import ENDPOINTS from './EndPoints';

class ApiManager {
  static getServers() {
    const url = ENDPOINTS.GET_SERVERS();
    return ApiMethods.get(url);
  }

  static getServerById(serverId) {
    const url = ENDPOINTS.GET_SERVER(serverId);
    return ApiMethods.get(url);
  }

  static createServer(data) {
    const url = ENDPOINTS.CREATE_SERVER();
    return ApiMethods.post(url, data);
  }

  static updateServer(serverId, data) {
    const url = ENDPOINTS.UPDATE_SERVER(serverId);
    return ApiMethods.put(url, data);
  }

  static deleteServer(serverId) {
    const url = ENDPOINTS.DELETE_SERVER(serverId);
    return ApiMethods.delete(url);
  }
}

export default ApiManager;
