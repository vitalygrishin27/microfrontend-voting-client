import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Contest from "./cards/Contest";
import { useDispatch, useSelector } from "react-redux";
import {
    clearCurrentPerformance,
    loadContestsAsync
} from "../redux/reducers/common/common.thunks";
import { getCookie } from "../helper/apiClient";
import {
    loginInAsync,
    setToastShowing
} from "../redux/reducers/login/login.thunks";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { contests, isLoading: contestsLoading } = useSelector(
        state => state.common
    );

    const { isLoginIn, error, isLoading, isToastShowing } =
        useSelector(state => state.login);

    /* INIT */
    useEffect(() => {
        dispatch(clearCurrentPerformance());

        const cookie = getCookie("voting_token");

        if (!isLoginIn && cookie) {
            dispatch(loginInAsync({ token: cookie }));
        }
    }, []);

    /* LOAD CONTESTS */
    useEffect(() => {
        if (isLoginIn) {
            dispatch(loadContestsAsync());
        }
    }, [isLoginIn]);

    /* TOASTS */
    useEffect(() => {
        if (!isToastShowing) return;

        if (error) toast.error(error);
        else if (!isLoading) toast.success("Login successful");

        dispatch(setToastShowing(false));
    }, [isToastShowing, isLoading, error]);

    const loading = contestsLoading;

    return (
        <div className="container py-5">

            {/* HERO */}
            <div className="row justify-content-center mb-5">
                <div className="col-md-8 col-lg-6">
                    <div
                        className="card border-0 shadow-lg text-center p-5"
                        style={{
                            borderRadius: "18px",
                            background: "linear-gradient(135deg, #1f1f1f, #2c2c2c)",
                            color: "white"
                        }}
                    >
                        <div style={{ fontSize: "42px" }}>🏆</div>

                        <h1 className="fw-bold">{t("VOTING CLIENT")}</h1>

                        <p style={{ opacity: 0.85 }}>
                            {!isLoginIn
                                ? "Please sign in"
                                : "Select contest to start voting"}
                        </p>
                    </div>
                </div>
            </div>

            {/* TITLE */}
            <div className="text-center mb-4">
                <h5 className="text-muted">
                    {!isLoginIn ? "Authentication required" : "Available contests"}
                </h5>
            </div>

            {/* CONTENT */}
            <div className="row g-4 justify-content-center">

                {!isLoginIn ? (
                    <div className="col-md-6 text-center">
                        <div className="card border-0 shadow-sm p-4">
                            <p className="text-muted mb-3">
                                You need to log in before accessing contests.
                            </p>
                            <a href="/login" className="btn btn-dark">
                                Login
                            </a>
                        </div>
                    </div>
                ) : loading ? (
                    <div className="col-12 text-center">
                        <div className="loading-box">
                            <div className="spinner" />
                            <h3>Loading contests...</h3>
                        </div>
                    </div>
                ) : (
                    contests?.map((contest) => (
                        <div key={contest.id} className="col-md-6 col-lg-4">
                            <Contest contest={contest} />
                        </div>
                    ))
                )}

            </div>

        </div>
    );
};

export default Home;