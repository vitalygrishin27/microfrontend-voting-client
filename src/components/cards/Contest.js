import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectCurrentContest } from "../../redux/reducers/common/common.thunks";
import { useNavigate } from "react-router-dom";
import "./Contest.css";

/* =========================
   helpers
========================= */
const stringToColor = (str = "") => {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 45%)`;
};

const getContestIcon = (name = "") => {
    const n = name.toLowerCase();

    if (n.includes("m")) return "🎤";
    if (n.includes("d")) return "💃";
    if (n.includes("t")) return "🎨";
    if (n.includes("r")) return "🎭";
    if (n.includes("s")) return "🏆";
    if (n.includes("k")) return "🧸";

    return "🎬";
};

/* =========================
   SKELETON CARD
========================= */
const ContestSkeleton = () => {
    return <div className="contest-skeleton" />;
};

/* =========================
   COMPONENT
========================= */
const Contest = ({ contest }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { isLoading } = useSelector(state => state.common);

    const handleSetCurrentContest = () => {
        dispatch(selectCurrentContest(contest));
        navigate("/voting");
    };

    const hasImage = !!contest.photo;
    const fallbackColor = stringToColor(contest.name);

    return (
        <div
            className="contest-card"
            onClick={handleSetCurrentContest}
            style={{ minWidth: 0 }}  /* 🔥 FIX overflow safety */
        >

            <div className="contest-image">

                {hasImage ? (
                    <img
                        src={contest.photo}
                        alt={contest.name}
                        style={{ minWidth: 0 }}
                    />
                ) : (
                    <div
                        className="contest-image-fallback"
                        style={{
                            background: `linear-gradient(135deg, ${fallbackColor}, #0f172a)`,
                            minWidth: 0
                        }}
                    >
                        <div className="fallback-icon">
                            {getContestIcon(contest.name)}
                        </div>
                    </div>
                )}

            </div>

            <div className="contest-info" style={{ minWidth: 0 }}>

                <h3 className="contest-title">
                    {contest.name}
                </h3>

                <div className="contest-action">
                    {t("Select contest")}
                </div>

            </div>

        </div>
    );
};

export default Contest;