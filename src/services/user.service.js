import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'https://localhost:8084/demo-rest-auth-login/api/test/';
const API_URL = 'https://localhost:8443/demo-rest-auth-login/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }


  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
