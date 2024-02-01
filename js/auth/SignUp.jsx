import React, {useState, useEffect} from 'react';
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { PrimeReactProvider } from 'primereact/api';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            }).catch((error) => {console.log(error);});
    };

    return(
        <div className="sign-in-container">
            <form onSubmit={signUp}>
                <h1>Create Account</h1>
                <PrimeReactProvider>
                <div style={{height:"25px"}}></div>
                <span className="p-float-label">
                    <InputText id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="username">e-mail</label>
                </span>
                    <div style={{height:"25px"}}></div>
                    <span className="p-float-label">
                    <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
                    <label htmlFor="password">password</label>
                </span>
                    <div style={{height:"25px"}}></div>
                    <Button label={'Sign Up'} style={{borderRadius:"5px"}}/>
                </PrimeReactProvider>
            </form>
        </div>
    )
}

export default SignUp;