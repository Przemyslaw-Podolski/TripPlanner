import React, { useEffect, useContext } from 'react';
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import AuthDetails from "../auth/AuthDetails";
import { LoginContext } from "../Contexts/LoginContext"


const LoginPage = () => {
    return(
        <>
            <SignIn />
            <SignUp />
            <AuthDetails />
        </>
    )
}

export default LoginPage;