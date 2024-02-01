import React, { useEffect, useContext } from 'react';
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import AuthDetails from "../auth/AuthDetails";
import { LoginContext } from "../Contexts/LoginContext"
import {Link} from "react-router-dom";


const LoginPage = () => {
    return(
        <>
            <SignIn />
            <SignUp />
            <AuthDetails />
            <Link to='/map'>Go to planner</Link>
            <Link to='/visa'>Get Visa Info</Link>
        </>
    )
}

export default LoginPage;