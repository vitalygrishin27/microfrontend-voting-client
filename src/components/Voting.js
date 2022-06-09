import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import './Voting.css'
import {
    requestForActivePerformance,
    clearActiveTimers,
    clearCurrentPerformance, changeSelectedMark, submitMarksAsync, setToastShowing
} from "../redux/reducers/common/common.thunks";
import {Badge} from "react-bootstrap";
import Footer from "./Footer";
import {toast} from "react-toastify";

const Voting = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {
        currentContest,
        currentPerformance,
        requestActivePerformanceError,
        selectedMarks, isToastShowing, error, isLoading
    } = useSelector(state => state.common);
    const {isLoginIn} = useSelector(state => state.login);

    useEffect(() => {
        console.log("Stating voting...")
        dispatch(setToastShowing(false));
        dispatch(clearActiveTimers())
        dispatch(clearCurrentPerformance())
        if (!isLoginIn) {
            navigate("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        for (let i = 0; i > -1; i--) {
            clearTimeout(i)
        }
        if (currentContest)
            dispatch(requestForActivePerformance(currentContest.id, currentPerformance ? currentPerformance.id : -1));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPerformance, requestActivePerformanceError]);

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(error)
                dispatch(setToastShowing(false));
            } else if (!isLoading) {
                toast.success("Marks were uploaded! Thanks!")
                dispatch(setToastShowing(false));
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    const handleSetMark = (criteriaId, mark) => {
        const changeMark = {
            criteriaId: criteriaId,
            mark: mark,
        }
        dispatch(changeSelectedMark(changeMark))
    }

    const handleSubmit = () => {
        const marks = [];
        selectedMarks.forEach((value, key, map) => {
            const mark = {
                criteriaId: key,
                value: value
            }
            marks.push(mark);
        })
        currentPerformance.marks = marks;

        dispatch(submitMarksAsync(currentPerformance));
    }

    const countMarks = () => {
        let sum = 0;
        selectedMarks.forEach((value, key, map) => {
            sum += value
        })
        return sum;
    }
//https://habr.com/ru/post/509258/  --- size of window
    return (
        <div>
            {currentContest && !currentPerformance && <img src={currentContest.photo} alt={"contest"} align={"center"} id={"bg"} height={document.documentElement.clientHeight-72}/>}
            <div className={"container"}>
                {currentPerformance && (
                    <div className={"row"}>
                        <div className={"col-md-10 mx-auto mt-3"}>
                            <table className={"table table-hover"}>
                                <thead className={"text-white bg-dark text-center"}>
                                </thead>
                                <tbody>
                                {currentPerformance.category.criteria && currentPerformance.category && currentPerformance.category.criteria.map((criteria, id) => (
                                    <tr key={id}>
                                        <td className={"text-white bg-dark text-center"}><h2>{criteria.name}</h2>
                                            <br/>
                                            <h1 className={"mx-3"} style={{"display": "inline-block"}}>
                                                <Badge pill
                                                       bg={selectedMarks.get(criteria.id) === 1 ? "info" : "warning"}
                                                       text="dark"
                                                       onClick={() => handleSetMark(criteria.id, 1)}
                                                       style={{"cursor": "pointer"}}>1</Badge>
                                            </h1>
                                            <h1 className={"mx-3"} style={{"display": "inline-block"}}>
                                                <Badge pill
                                                       bg={selectedMarks.get(criteria.id) === 2 ? "info" : "warning"}
                                                       text="dark"
                                                       onClick={() => handleSetMark(criteria.id, 2)}
                                                       style={{"cursor": "pointer"}}>2</Badge>
                                            </h1>
                                            <h1 className={"mx-3"} style={{"display": "inline-block"}}>
                                                <Badge pill
                                                       bg={selectedMarks.get(criteria.id) === 3 ? "info" : "warning"}
                                                       text="dark"
                                                       onClick={() => handleSetMark(criteria.id, 3)}
                                                       style={{"cursor": "pointer"}}>3</Badge>
                                            </h1>
                                            <h1 className={"mx-3"} style={{"display": "inline-block"}}>
                                                <Badge pill
                                                       bg={selectedMarks.get(criteria.id) === 4 ? "info" : "warning"}
                                                       text="dark"
                                                       onClick={() => handleSetMark(criteria.id, 4)}
                                                       style={{"cursor": "pointer"}}>4</Badge>
                                            </h1>
                                            <h1 className={"mx-3"} style={{"display": "inline-block"}}>
                                                <Badge pill
                                                       bg={selectedMarks.get(criteria.id) === 5 ? "info" : "warning"}
                                                       text="dark"
                                                       onClick={() => handleSetMark(criteria.id, 5)}
                                                       style={{"cursor": "pointer"}}>5</Badge>
                                            </h1>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className={"text-white bg-dark text-center"}>
                                        <h1>Total score: </h1><br/>
                                        <h1 className={"mx-3"} style={{"fontSize": 55}}>
                                            <Badge bg="success" text="white"
                                                   onClick={() => handleSubmit()}
                                                   style={{"cursor": "pointer"}}>{countMarks()}</Badge>
                                        </h1><br/>press button to send mark
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <Footer performance={currentPerformance}/>
                    </div>
                )}

            </div>
        </div>
    )
}
export default Voting