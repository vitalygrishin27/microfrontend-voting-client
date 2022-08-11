import apiClient from "../helper/apiClient";

class PerformanceService {
    getActivePerformance = (contestId, id, token) => apiClient().get('contest/' + contestId + '/performance/' + id + '/' + token);
    submitMarks = (performance) => apiClient().post('marks', performance);
}

export default new PerformanceService();