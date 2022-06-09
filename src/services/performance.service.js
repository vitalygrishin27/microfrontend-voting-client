import apiClient from "../helper/apiClient";

class PerformanceService {
    getActivePerformance = (contestId, id, token) => apiClient().get('client/contest/' + contestId + '/performance/' + id + "/" + token);
    submitMarks = (performance) => apiClient().post('client/marks', performance);
}

export default new PerformanceService();