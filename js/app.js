import React, { useState, useEffect, Component } from "react";
import { createRoot } from "react-dom/client";
import {
    HashRouter,
    Route,
    Routes,
    Link,
    NavLink,
    Outlet
} from "react-router-dom";
import MapFrame from "./MapFrame";
import CountrySelect from "react-bootstrap-country-select";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import { LoginContext } from "./Contexts/LoginContext"
import LoginPage from "./auth/LoginPage";


const  App = () => {
    const [selectedCountry, setSelectedCountry] = useState({name: "Poland", alpha3: "pol"});
    const [authUser, setAuthUser] = useState(null);

    const handleCountryChange = (country) => {
        setSelectedCountry(country);
    };
    const handleTextChange = (country) => {
        setSelectedCountry({ name: "" });
        console.log(`Text changed: ${country}`);
    };

    const renderCountryDisplay = () => {
        const countryName = selectedCountry ? selectedCountry.name : "Poland";
        const countryCode = selectedCountry ? selectedCountry.alpha3 : "pol";
        console.log("countryName", countryName);
        console.log("countryName", countryCode);
        return (
            <div>
                <p>{countryName}</p>aA
                <MapFrame country={countryCode} />
            </div>
        );
    };

    return(
        <>
            <img
                src={'./assets/tp_logo.png'}
                alt="Trip Planner Logo"
            />
            { authUser !== null ? <p>User Logged in</p> : <p>Please Log in</p>}
            <LoginContext.Provider value={{ authUser, setAuthUser }}>
                <LoginPage/>
                <div style={{width:"500px"}}>
                    <CountrySelect
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        onTextChange={handleTextChange}
                        flush={false}
                    />
                </div>
                {renderCountryDisplay()}
            </LoginContext.Provider>
            <div style={{height:"300px"}}></div>
        </>
        )
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

// {/*valueAs={name}*/}