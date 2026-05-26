import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginInAsync, setToastShowing } from "../redux/reducers/login/login.thunks";

const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const { isLoading, error, isToastShowing } =
        useSelector(state => state.login);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(loginInAsync({
            login,
            password
        }));
    };

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(error);
            } else if (!isLoading) {
                toast.success("Login is successful!");
                navigate("/");
            }

            dispatch(setToastShowing(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-6 col-lg-4">

                    {/* AUTH CARD */}
                    <div className="card border-0 shadow-lg p-4">

                        {/* HEADER */}
                        <div className="text-center mb-4">
                            <div style={{ fontSize: "40px" }}>🔐</div>
                            <h3 className="fw-bold mb-1">Login</h3>
                            <p className="text-muted mb-0">
                                Sign in to access voting system
                            </p>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <input
                                    required
                                    type="text"
                                    placeholder="Login"
                                    className="form-control"
                                    value={login}
                                    onChange={e => setLogin(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-dark w-100"
                                disabled={isLoading}
                            >
                                {isLoading ? "Loading..." : "Enter"}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;