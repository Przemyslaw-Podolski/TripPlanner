import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import React, { useState } from 'react';
import firebase from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// IMPORTANT: Public name of the App Trip-Planner-App, Contact mail: wrazumichin@gmail.com
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
    apiKey: "AIzaSyBKdcaSe9BO31gwGnvytfZi2dlqQ1Vkzu4",
    authDomain: "tripplanner-c8c61.firebaseapp.com",
    projectId: "tripplanner-c8c61",
    storageBucket: "tripplanner-c8c61.appspot.com",
    messagingSenderId: "630968463946",
    appId: "1:630968463946:web:ef44b9f3ce0f0e819e6cb3",
    measurementId: "G-5R797M726B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(email, password);
            console.log('User created successfully');
            // Navigate to home page or show success message
        } catch (error) {
            console.error('Registration Error:', error);
        }
    };

    return (
        <div>
            <h3>Register</h3>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={register}>Register</button>
        </div>
    );
};

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log('User signed in successfully');
            // Navigate to home page or show success message
        } catch (error) {
            console.error('Sign In Error:', error);
        }
    };

    return (
        <div>
            <h3>Log In</h3>
            <input
                type="email"
                value={email}
                onChange

                    ={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={signIn}>Sign In</button>
        </div>
    );
};