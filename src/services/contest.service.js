import apiClient from "../helper/apiClient";

class ContestService {
    getAvailableContests = (jury) => apiClient().post('client/contests', jury);
}

export default new ContestService();