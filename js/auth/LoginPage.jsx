import React, { useEffect, useContext } from 'react';
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import AuthDetails from "../auth/AuthDetails";
import { LoginContext } from "../Contexts/LoginContext"
import { Link } from "react-router-dom";

const LoginPage = () => {
    const {authUser} = useContext(LoginContext);
    return(
        <div className={"container container__login"}>
        <header className="header">
            <img
                src={'../assets/tp_logo.png'}
                alt="Trip Planner Logo"
            />
            <nav>
                <ul className="header__nav">
                    <li className="nav__element"><Link to='/map'>Go to planner</Link></li>
                    <li className="nav__element"><Link to='/visa'>Get Visa Info</Link></li>
                </ul>
            </nav>
            <AuthDetails className={"user__info"}/>
        </header>
            <div className={"user__forms"}>
                <SignIn />
                <SignUp />
            </div>

        </div>
    )
}

export default LoginPage;
