import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {loginOut} from "../redux/reducers/login/login.thunks";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();
    const {isLoginIn} = useSelector(state => state.login);
    const {currentContest} = useSelector(state => state.common);
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    const handleLogOut = () => {
        dispatch(loginOut());
        document.cookie = "voting_token=" + escape("") + "; expires=Thu, 01 Jan 1970 00:00:01 GMT"
        navigate("/")
    }

    return (
        <div className={"col-md-12 bg-dark py-2"}>
            <nav className="navbar navbar-dark bg-dark">
                <Link to="/"
                      className="navbar-brand mx-5">{t("Main")} {currentContest && ('(' + currentContest.name + ')')}</Link>

                <div className="mx-3" style={{"textAlign": "right", "display": "inline-block"}}>
                    {isLoginIn && currentContest &&
                        <Link to={"/members"} className={"btn btn-outline-dark text-white"}>{t("Members")}</Link>}
                    {isLoginIn && currentContest &&
                        <Link to={"/juries"} className={"btn btn-outline-dark text-white"}>{t("Juries")}</Link>}
                    {isLoginIn && currentContest &&
                        <Link to={"/categories"} className={"btn btn-outline-dark text-white"}>{t("Categories")}</Link>}
                    {!isLoginIn &&
                        <Link to={"/login"} className={"btn btn-outline-danger text-white"}>{t("Login in")}</Link>}
                    {isLoginIn && <button className={"btn btn-outline-danger text-white"}
                                          onClick={() => handleLogOut()}>{t("Login out")} </button>}
                    <div className="mx-3" style={{"display": "inline-block"}}>
                        <select id={"language"} onChange={(e) => changeLanguage(e.target.value)} defaultValue={"UA"}>
                            <option value={"ua"}>UA</option>
                            <option value={"en"}>EN</option>
                            <option value={"ru"}>RU</option>
                        </select>
                    </div>
                </div>
            </nav>
        </div>

    );
};
export default Navbar;