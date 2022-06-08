import actions from "./common.actions"
import ContestService from "../../../services/contest.service";
import PerformanceService from "../../../services/performance.service";
import {getCookie} from "../../../helper/apiClient";

const delay = 5000;

export const loadContestsAsync = () => (dispatch) => {
    dispatch(actions.contestsLoadStart())
    dispatch(actions.clearCurrentPerformance())

    const jury={
        token: getCookie("voting_token")
    }
    ContestService.getAvailableContests(jury)
        .then(response => dispatch(actions.contestsLoadSuccess(response.data)))
        .catch(error => dispatch(actions.contestsLoadError(error.response.data ? error.response.data : error.message)))
};
export const loginOut = () => (dispatch) => {
    dispatch(actions.loginOut())
};
export const setToastShowing = (flag) => (dispatch) => {
    dispatch(actions.setToastShowing(flag))
};
export const selectCurrentContest = (contest) => (dispatch) => {
    dispatch(actions.selectCurrentContest(contest))
};
export const setCurrentPerformance = (performance) => (dispatch) => {
    dispatch(actions.setCurrentPerformance(performance))
};
export const requestForActivePerformance = (contestId, previousId) => (dispatch) => {
    dispatch(actions.requestActivePerformance())
    console.debug("Starting periodical calling server for new performance. ContestId =" + contestId + ". Current performanceId =" + previousId + ". Delay is = " + delay);
    let timerId = setTimeout(function request() {
        PerformanceService.getActivePerformance(contestId, previousId)
            .then(response => {
                console.log(response.data)
                dispatch(actions.setCurrentPerformance(response.data))
                dispatch(actions.removeActiveTimer(timerId))
            })
            .catch(error => {
                dispatch(actions.requestActivePerformanceError(error))
                dispatch(actions.removeActiveTimer(timerId))
                dispatch(actions.clearCurrentPerformance())
            })
    }, delay);
    console.log("created timer - " + timerId)
    dispatch(actions.addActiveTimer(timerId))
};

export const clearActiveTimers = () => (dispatch) => {
    dispatch(actions.clearActiveTimers())
};

export const clearCurrentPerformance = () => (dispatch) => {
    dispatch(actions.clearCurrentPerformance())
};
