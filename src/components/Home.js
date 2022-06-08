import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import Contest from "./cards/Contest";
import {useDispatch, useSelector} from "react-redux";
import {clearCurrentPerformance, loadContestsAsync} from "../redux/reducers/common/common.thunks";
import {isEmpty} from "lodash";
import {getCookie} from "../helper/apiClient"
import {loginInAsync, setToastShowing} from "../redux/reducers/login/login.thunks";
import {toast} from "react-toastify";

const Home = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation()
    const {contests} = useSelector(state => state.common);
    const {isLoginIn, error, isLoading, isToastShowing} = useSelector(state => state.login);

    useEffect(() => {
        dispatch(clearCurrentPerformance());
        if (!isLoginIn) {
            const cookie = getCookie("voting_token");
            if (!isEmpty(cookie)) {
                const data = {
                    token: cookie,
                }
                dispatch(loginInAsync(data));
            }
            return;
        }
        if (!contests) {
            dispatch(loadContestsAsync());
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isLoginIn) {
            return
        }
        if (!contests || isEmpty(contests)) {
            dispatch(loadContestsAsync());
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoginIn]);

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(error)
                dispatch(setToastShowing(false));
            } else if (!isLoading) {
                toast.success("Login was successful!")
                dispatch(setToastShowing(false));
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    return (
        <div className={"container-fluid d-flex justify-content-center"}>
            <div className={"row"}>

                <h1 style={{"textAlign": "center"}}>{t("VOTING CLIENT")}</h1>
                {contests && contests.map((contest, id) => (
                    <div key={id} className={"col-md-6"}>
                        <div>

                            <Contest key={contest.id} contest={contest}/>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home