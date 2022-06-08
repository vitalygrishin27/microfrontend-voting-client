import actions from "./login.actions"
import LoginService from "../../../services/login.service";

export const loginInAsync = (jury) => (dispatch) => {
    dispatch(actions.loginInStart())

    LoginService.loginIn(jury)
        .then(response => {
            dispatch(actions.loginInSuccess(response.data));
            const expires = new Date(Date.now() + 864e5).toUTCString()
            document.cookie = "voting_token=" + encodeURIComponent(response.data) + "; expires=" + expires + "; path=/"
        })
        .catch(error => dispatch(actions.loginInError(error.response.data ? error.response.data : error.message)))
};

export const loginOut = () => (dispatch) => {
    dispatch(actions.loginOut())
};

export const setToastShowing = (flag) => (dispatch) => {
    dispatch(actions.setToastShowing(flag))
};