import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { loginOut } from "../redux/reducers/login/login.thunks";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const { isLoginIn } = useSelector(state => state.login);
    const { currentContest } = useSelector(state => state.common);

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    const handleLogOut = () => {
        dispatch(loginOut());
        document.cookie = "voting_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">

            {/* BRAND / LEFT */}
            <Link to="/" className="navbar-brand fw-bold">
                {t("Main")}
                {currentContest && ` (${currentContest.name})`}
            </Link>

            {/* MOBILE TOGGLER */}
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainNavbar"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* COLLAPSIBLE AREA */}
            <div className="collapse navbar-collapse" id="mainNavbar">

                {/* LEFT MENU
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    {isLoginIn && currentContest && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/members">
                                    {t("Members")}
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/juries">
                                    {t("Juries")}
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/categories">
                                    {t("Categories")}
                                </Link>
                            </li>
                        </>
                    )}

                </ul>*/}

                {/* RIGHT CONTROLS */}
                <div className="d-flex align-items-center gap-2">

                    {!isLoginIn && (
                        <Link className="btn btn-outline-danger btn-sm" to="/login">
                            {t("Login in")}
                        </Link>
                    )}

                    {isLoginIn && (
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={handleLogOut}
                        >
                            {t("Login out")}
                        </button>
                    )}
                    {/*
                    <select
                        className="form-select form-select-sm w-auto"
                        onChange={changeLanguage}
                        defaultValue="ua"
                    >
                        <option value="ua">UA</option>
                        <option value="en">EN</option>
                        <option value="ru">RU</option>
                    </select>*/}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;