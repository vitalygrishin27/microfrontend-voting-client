import actionTypes from "./common.actionTypes"
import initialState from "./common.initialStates"
import {isNull} from "lodash";

const commonReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.CONTEST_LOAD_START:
            return {
                ...state,
                isLoading: true,
                contests: null,
                error: null,
                isToastShowing: false,
            };
        case actionTypes.CONTEST_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                contests: payload,
                error: null,
                isToastShowing: false,
            };
        case actionTypes.CONTEST_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                contests: null,
                error: payload,
                isToastShowing: true,
            };
        case actionTypes.LOGIN_OUT:
            return {
                ...state,
                contests: null,
                currentContest: null
            };
        case actionTypes.CHANGE_TOAST_SHOWING:
            return {
                ...state,
                isToastShowing: payload,
            };
        case actionTypes.SELECT_CURRENT_CONTEST:
            return {
                ...state,
                currentContest: payload,
            };
        case actionTypes.SET_CURRENT_PERFORMANCE:
            return {
                ...state,
                currentPerformance: payload,
            };
        case actionTypes.REQUEST_ACTIVE_PERFORMANCE_ERROR:
            return {
                ...state,
                requestActivePerformanceError: payload,
            };
        case actionTypes.ADD_ACTIVE_TIMER:
            const updatedActiveTimers = state.activeTimers;
            updatedActiveTimers.push(payload)
            return {
                ...state,
                activeTimers: updatedActiveTimers,
            };
        case actionTypes.REMOVE_ACTIVE_TIMER:
            const updatedActiveTimersAfterRemoving = state.activeTimers;
            const index = updatedActiveTimersAfterRemoving.indexOf(payload);
            if (index > -1) {
                updatedActiveTimersAfterRemoving.splice(index); // 2nd parameter means remove one item only
            }
            return {
                ...state,
                activeTimers: updatedActiveTimersAfterRemoving,
            };
        case actionTypes.CLEAR_ACTIVE_TIMER:
            state.activeTimers.forEach(id => clearTimeout(id))
            return {
                ...state,
                activeTimers: [],
            };
        case actionTypes.CLEAR_CURRENT_PERFORMANCE:
            return {
                ...state,
                currentPerformance: null,
            };
        case actionTypes.CHANGE_SELECTED_MARK:
            let updatedSelectedMarks = state.selectedMarks;
            if (isNull(state.selectedMarks)) {
                updatedSelectedMarks = new Map();
            }
            updatedSelectedMarks.set(payload.criteriaId, payload.mark)
            return {
                ...state,
                selectedMarks: updatedSelectedMarks,
            };
        case actionTypes.SUBMIT_MARKS_START:
            return {
                ...state,
                isLoading: true,
                error: null,
                isToastShowing: false,
            };
        case actionTypes.SUBMIT_MARKS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentPerformance: null,
                selectedMarks: new Map(),
                error: null,
                isToastShowing: true,
            };
        case actionTypes.SUBMIT_MARKS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload,
                isToastShowing: true,
            };

        default:
            return state;
    }
};

export default commonReducer;