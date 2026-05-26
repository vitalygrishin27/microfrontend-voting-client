import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    requestForActivePerformance,
    clearActiveTimers,
    clearCurrentPerformance,
    changeSelectedMark,
    submitMarksAsync,
    setToastShowing
} from "../redux/reducers/common/common.thunks";

import Header from "./Header";
import { toast } from "react-toastify";
import "./Voting.css";

const marks = [1, 2, 3, 4, 5];

const Voting = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const {
        currentContest,
        currentPerformance,
        requestActivePerformanceError,
        selectedMarks,
        isToastShowing,
        error,
        isLoading
    } = useSelector(state => state.common);

    const { isLoginIn } = useSelector(state => state.login);

    /* LOGIN GUARD */
    useEffect(() => {
        dispatch(setToastShowing(false));
        dispatch(clearActiveTimers());
        dispatch(clearCurrentPerformance());

        if (!isLoginIn) {
            navigate("/");
        }
    }, [isLoginIn, dispatch, navigate]);

    /* FETCH PERFORMANCE */
    useEffect(() => {
        if (!currentContest) return;

        for (let i = 0; i < 20; i++) {
            clearTimeout(i);
        }

        dispatch(
            requestForActivePerformance(
                currentContest.id,
                currentPerformance ? currentPerformance.id : -1
            )
        );
    }, [currentPerformance, requestActivePerformanceError, currentContest, dispatch]);

    /* TOAST */
    useEffect(() => {
        if (!isToastShowing) return;

        if (error) {
            toast.error(error);
        } else if (!isLoading) {
            toast.success("Marks uploaded successfully!");
        }

        dispatch(setToastShowing(false));
    }, [isToastShowing, error, isLoading, dispatch]);

    const handleSetMark = (criteriaId, mark) => {
        dispatch(
            changeSelectedMark({
                criteriaId,
                mark
            })
        );
    };

    const handleSubmit = () => {
        const marksArray = [];

        selectedMarks.forEach((value, key) => {
            marksArray.push({
                criteriaId: key,
                value
            });
        });

        const payload = {
            ...currentPerformance,
            marks: marksArray
        };

        dispatch(submitMarksAsync(payload));
    };

    const countMarks = () => {
        let sum = 0;
        selectedMarks.forEach(v => (sum += v));
        return sum;
    };

    return (
        <div className="voting-page">

            {/* WAITING SCREEN */}
            {!currentPerformance && currentContest && (
                <div className="waiting-screen">
                    <div
                        className="waiting-background"
                        style={{
                            backgroundImage: `url(${currentContest.photo})`
                        }}
                    />

                    <div className="waiting-overlay">
                        <div className="waiting-content">

                            <img
                                src={currentContest.photo}
                                alt="contest"
                                className="waiting-logo"
                            />

                            <h1 className="waiting-title">
                                Waiting for next performer
                            </h1>

                        </div>
                    </div>
                </div>
            )}

            {/* VOTING */}
            {currentPerformance && (
                <div className="voting-layout">

                    <div className="voting-header">
                        <Header performance={currentPerformance} />
                    </div>

                    <div className="voting-body">

                        <div className="criteria-list">

                            {currentPerformance.category.criteria?.map(criteria => (
                                <div className="criteria-card" key={criteria.id}>

                                    <div className="criteria-header">
                                        <h2>{criteria.name}</h2>
                                    </div>

                                    <div className="marks-row">

                                        {marks.map(mark => (
                                            <button
                                                key={mark}
                                                className={`mark-button ${
                                                    selectedMarks.get(criteria.id) === mark
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleSetMark(criteria.id, mark)
                                                }
                                            >
                                                {mark}
                                            </button>
                                        ))}

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* FOOTER */}
                    <div className="submit-bar">
                        <div className="submit-bar-inner">

                            <div className="total-score">
                                <span>{t("Total score")}</span>
                                <h1>{countMarks()}</h1>
                            </div>

                            <button
                                className="submit-button"
                                disabled={isLoading}
                                onClick={handleSubmit}
                            >
                                {isLoading ? "Uploading..." : "Submit"}
                            </button>

                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Voting;