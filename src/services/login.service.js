import apiClient from "../helper/apiClient";

class LoginService {
    loginIn = (jury) => apiClient().post('client/loginIn', jury);
}

export default new LoginService();