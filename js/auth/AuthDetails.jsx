import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useContext } from 'react';
import { auth } from './firebaseConfig';
import { LoginContext } from "../Contexts/LoginContext"

const AuthDetails = () => {

const {authUser, setAuthUser} = useContext(LoginContext);

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
    }).catch(error => console.log(error));
    }
    return (
        <div>{ authUser ? <><p>{`Signed In as ${authUser.email}, UID: ${authUser.uid}`} </p><button onClick={userSingOut}>Sign Out</button></> : <p>Signed Out</p>}</div>
            )
}

export default AuthDetails;