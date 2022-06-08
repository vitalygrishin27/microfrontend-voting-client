import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import './Voting.css'
import {
    requestForActivePerformance,
    clearActiveTimers,
    clearCurrentPerformance
} from "../redux/reducers/common/common.thunks";
import {isEmpty} from "lodash";
import {Accordion, Badge, Carousel} from "react-bootstrap";

const Voting = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {currentContest, currentPerformance, requestActivePerformanceError} = useSelector(state => state.common);
    const {isLoginIn} = useSelector(state => state.login);

    useEffect(() => {
        console.log("clearing all timers")
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

    return (
        <div>
            {currentContest && !currentPerformance && <img src={currentContest.photo} alt={"contest"} id="bg"/>}
            <div className={"container"}>
                {currentPerformance && (
                    <div className={"row"}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={currentContest.photo}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h1>{currentPerformance.name}</h1>
                                    <h2>{currentPerformance.fullName}</h2>
                                    <p>{currentPerformance.place}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>




                    </div>
                )}

            </div>
        </div>
    )
}
export default Voting