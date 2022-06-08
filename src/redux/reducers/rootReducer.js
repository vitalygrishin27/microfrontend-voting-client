import {combineReducers} from "redux";
import loginReducer from "./login/login.reducer";
import commonReducer from "./common/common.reducer";

const rootReducer = () =>
    combineReducers({
        common: commonReducer,
        login: loginReducer,
    });

export default rootReducer;