import React, { useContext } from 'react';
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import AuthDetails from "../auth/AuthDetails";
import { LoginContext } from "../Contexts/LoginContext"
import { Link } from "react-router-dom";

const LoginPage = () => {
    const {authUser} = useContext(LoginContext);
    const classDynamic = authUser ? "nav logged__in__nav" : "nav";
    const classLogoDynamic = authUser ? "logo__login logo__small logo__hide" : "logo__login logo__small";
    const classLogoBigDynamic = authUser ? "logo__login logo__small" : "logo__login logo__small logo__hide";

    //tp_logo_mobile_small
    //tp_logo_square
    return(
        <div className={"login container__login"}>
        <header className="header">
            <img
                src={'../assets/tp_logo.png'}
                alt="Trip Planner Logo"
                className={"logo__login logo__big"}
            />
            <img
                src={'../assets/tp_logo_mobile_small.png'}
                alt="Trip Planner Logo"
                className={classLogoDynamic}
            />
            <img
                src={'../assets/tp_logo_square.png'}
                alt="Trip Planner Logo"
                className={classLogoBigDynamic}
            />
            <nav className={classDynamic}>
                <ul className="header__nav">
                    {authUser ?
                        <>
                            <li className="nav__element"><Link to='/map' className={"nav__link"}>Go To Planner</Link></li>
                            <li className="nav__element"><Link to='/visa' className={"nav__link"}>Get Visa Info</Link></li>
                        </>
                        :
                        <>
                            <li className="nav__element"><span className={"nav__link__disabled"} style={{cursor: 'not-allowed'}}>Go To Planner</span></li>
                            <li className="nav__element"><span className={"nav__link__disabled"} style={{cursor: 'not-allowed'}}>Get Visa Info</span></li>
                        </>
                    }
                </ul>
            </nav>
            <AuthDetails className={"user__info"}/>
        </header>
            <div className={"user__forms"}>
                <div className={"welcome"}>
                    <h3 className={"welcome__title"}>Welcome</h3>
                    <p className={"welcome__content"}>This Trip Planner Application is a React-based web app designed to help users plan their trips.
                        It will help you find visa information. You will also find attractions by listing them for every country.</p>
                </div>
                {!authUser ?<SignIn className={"signin_form"}/> : <></>}
                {!authUser ?<SignUp className={"signup_form"}/> : <></>}
            </div>
        </div>
    )
}

export default LoginPage;
