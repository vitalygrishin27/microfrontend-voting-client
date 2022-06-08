import React from 'react'
import {loginOut} from "../../redux/reducers/login/login.thunks";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {selectCurrentContest} from "../../redux/reducers/common/common.thunks";
import {useNavigate} from "react-router-dom";

const Contest = (contest) => {
    const dispatch = useDispatch();
    const {t} = useTranslation()
    const navigate = useNavigate();

    const handleSetCurrentContest = () => {
        dispatch(selectCurrentContest(contest.contest))
        navigate("/voting")
    }

    return (
        <div className={"card text-center"}>
            <div className={"overflow"}>
                <img src={contest.contest.photo} alt={"contest"} width={"200px"} height={"300px"}/>
            </div>
            <div className={"card-body text-dark"}>
                <h4 className={"card-title"}>{contest.contest.name}</h4>
            </div>
            <button className={"btn btn-success text-white"}
                    onClick={() => handleSetCurrentContest()}>{t("Select contest")} </button>
        </div>
    );
}

export default Contest;