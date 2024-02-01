import React, {useState, useEffect} from 'react';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { PrimeReactProvider } from 'primereact/api';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            }).catch((error) => {console.log(error);});
    };

    return(
        <div className="sign-in-container">
            <form onSubmit={signIn}>
                <h1>Log In to your account</h1>
                <div style={{height:"25px"}}></div>
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

//feedback={false}