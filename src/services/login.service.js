import apiClient from "../helper/apiClient";

class LoginService {
    loginIn = (jury) => apiClient().post('loginIn', jury);
}

export default new LoginService();