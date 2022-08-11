import apiClient from "../helper/apiClient";

class ContestService {
    getAvailableContests = (jury) => apiClient().post('contests', jury);
}

export default new ContestService();