import apiClient from "../helper/apiClient";

class PerformanceService {
    getActivePerformance = (contestId, id) => apiClient().get('client/contest/' + contestId + '/performance/' + id);
}

export default new PerformanceService();