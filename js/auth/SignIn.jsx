import React, {useState, useEffect, useContext} from 'react';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { PrimeReactProvider } from 'primereact/api';
import {LoginContext} from "../Contexts/LoginContext";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFail, setLoginFail] = useState(false);
    const loginInfoSelector = document.querySelector(".login__info__text");
    const loginInfoBoxSelector = document.querySelector(".login__info");
    const headerNavSelector = document.querySelector(".nav");
    const {authUser, setAuthUser} = useContext(LoginContext);

    const signIn = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                setLoginFail(false);
                loginInfoSelector.classList.add("login__green__text");
                loginInfoBoxSelector.classList.add("logged__in");
                headerNavSelector.classList.add("logged__in__nav");
            }).catch((error) => {
                console.log(error);
                setLoginFail(true);
                });
        setEmail('');
        setPassword('');
    };

    return(
        <div className="sign-in-container auth__container">
            <form className={"auth__form"} onSubmit={signIn}>
                <h3 className={"auth__title"}>Log In to your account</h3>
                {loginFail ? <p className={"auth__error"}>Login attempt failed</p>:<></>}
                <PrimeReactProvider>
                <span className="p-float-label">
                    <InputText id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="username">e-mail</label>
                </span>
                <div style={{height:"25px"}}></div>
                <span className="p-float-label">
                    <Password inputId="password" value={password} feedback={false} onChange={(e) => setPassword(e.target.value)} toggleMask />
                    <label htmlFor="password">password</label>
                </span>
                    <div style={{height:"25px"}}></div>
                    <Button label={'Log In'} style={{borderRadius:"5px"}}/>
                </PrimeReactProvider>

            </form>
        </div>
    )
}

export default SignIn;