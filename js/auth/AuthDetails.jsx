import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useContext } from 'react';
import { auth } from './firebaseConfig';
import { LoginContext } from "../Contexts/LoginContext"

const AuthDetails = () => {
    const loginInfoSelector = document.querySelector(".login__info__text");
    const loginInfoBoxSelector = document.querySelector(".login__info");
    const headerNavSelector = document.querySelector(".nav");
    const {authUser, setAuthUser} = useContext(LoginContext);
    const classInfoDynamic = authUser ? "login__green__text login__info__text" : "login__info__text";
    const classInfoBoxDynamic = authUser ? "logged__in login__info" : "login__info";

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user){
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        }
    }, []);


    const userSingOut = () => {
    signOut(auth).then(() => {
        console.log("singed out succesfull")
        loginInfoSelector.classList.remove("login__green__text");
        loginInfoBoxSelector.classList.remove("logged__in");
        headerNavSelector.classList.remove("logged__in__nav");
    }).catch(error => console.log(error));
    }

    //TODO: authUser.uid: use this as path to save data in DB

    return (
        <div className={classInfoBoxDynamic}>
            { authUser
                ?
                <>
                    <p className={classInfoDynamic}>{`Signed In as ${authUser.email}`} </p>
                    <button className={"signout_button"} onClick={userSingOut}>Sign Out</button>
                </>
                :
                <p className={"login__info__text"}>Signed Out</p>}</div>
            )
}

export default AuthDetails;