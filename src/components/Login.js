import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {loginInAsync, setToastShowing} from "../redux/reducers/login/login.thunks";

const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const {isLoading, error, isToastShowing} = useSelector(state => state.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            login: login,
            password: password,
        }
        dispatch(loginInAsync(data));
    };

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(error)
                dispatch(setToastShowing(false));
            } else if (!isLoading) {
                toast.success("Login in is successful!")
                dispatch(setToastShowing(false));
                navigate("/");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    return (
        <div className={"container"}>
            <div className={"row"}>
                <h3 className={"display-7 text-center"}>Login in</h3>
                <div className={"col-md-6 shadow mx-auto p-5"}>
                    <form onSubmit={handleSubmit}>
                        <div className={"form-group mb-2"}>
                            <input required type={"text"} placeholder={"Login"} className={"form-control"}
                                   value={login} onChange={e => setLogin(e.target.value)}/>
                        </div>
                        <div className={"form-group mb-2"}>
                            <input type={"text"} placeholder={"Password"} className={"form-control"}
                                   value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div className={"form-group"}>
                            <input type={"submit"} value={"ENTER"} className={"btn btn-dark"}
                                   style={{"width": "100%"}}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default Login