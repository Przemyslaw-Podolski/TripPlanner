import { onAuthStateChanged, signOut } from "firebase/auth";
import React, {useState, useEffect} from 'react';
import { auth } from './firebaseConfig';


const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

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
        <div>{ authUser ? <><p>{`Signed In as ${authUser.email}`} </p><button onClick={userSingOut}>Sign Out</button></> : <p>Signed Out</p>}</div>
            )

}



export default AuthDetails;