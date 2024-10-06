import axios from 'axios';

const BASE_URL = "http://localhost:8000";

class ApiMethods {
  static async apiRequest(method, url, data = null) {
    try {
      const response = await axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  static get(url) {
    return this.apiRequest('GET', url);
  }

  static post(url, data) {
    return this.apiRequest('POST', url, data);
  }

  static put(url, data) {
    return this.apiRequest('PUT', url, data);
  }

  static delete(url) {
    return this.apiRequest('DELETE', url);
  }
}

export default ApiMethods;
