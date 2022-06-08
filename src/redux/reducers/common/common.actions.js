import actionTypes from './common.actionTypes'

const contestsLoadStart = () => ({
    type: actionTypes.CONTEST_LOAD_START
})

const contestsLoadSuccess = (contests) => ({
    type: actionTypes.CONTEST_LOAD_SUCCESS,
    payload: contests
})

const contestsLoadError = (error) => ({
    type: actionTypes.CONTEST_LOAD_ERROR,
    payload: error

})
const loginOut = () => ({
    type: actionTypes.LOGIN_OUT
})
const setToastShowing = (flag) => ({
    type: actionTypes.CHANGE_TOAST_SHOWING,
    payload: flag
})
const selectCurrentContest = (contest) => ({
    type: actionTypes.SELECT_CURRENT_CONTEST,
    payload: contest
})
const setCurrentPerformance = (performance) => ({
    type: actionTypes.SET_CURRENT_PERFORMANCE,
    payload: performance
})

const requestActivePerformance = () => ({
    type: actionTypes.REQUEST_ACTIVE_PERFORMANCE,
})

const requestActivePerformanceError = (error) => ({
    type: actionTypes.REQUEST_ACTIVE_PERFORMANCE_ERROR,
    payload: error

})

const addActiveTimer = (timerId) => ({
    type: actionTypes.ADD_ACTIVE_TIMER,
    payload: timerId
})

const removeActiveTimer = (timerId) => ({
    type: actionTypes.REMOVE_ACTIVE_TIMER,
    payload: timerId
})

const clearActiveTimers = () => ({
    type: actionTypes.CLEAR_ACTIVE_TIMER,
})

const clearCurrentPerformance = () => ({
    type: actionTypes.CLEAR_CURRENT_PERFORMANCE,
})

const actions = {
    contestsLoadStart,
    contestsLoadSuccess,
    contestsLoadError,
    setToastShowing,
    loginOut,
    selectCurrentContest,
    setCurrentPerformance,
    requestActivePerformance,
    requestActivePerformanceError,
    addActiveTimer,
    removeActiveTimer,
    clearActiveTimers,
    clearCurrentPerformance
}

export default actions;