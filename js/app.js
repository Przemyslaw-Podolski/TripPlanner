import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import MapFrame from "./MapFrame";
import CountrySelect from "react-bootstrap-country-select";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import AuthDetails from "./auth/AuthDetails";

const  App = () => {
    const [selectedCountry, setSelectedCountry] = useState({name: "Poland", alpha3: "pol"});

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
            <SignIn />
            <SignUp />
            <AuthDetails />
            <div style={{width:"500px"}}>
                <CountrySelect
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    onTextChange={handleTextChange}
                    flush={false}
                />
            </div>
            {renderCountryDisplay()}
            <div style={{height:"300px"}}></div>
        </>
        )
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

// {/*valueAs={name}*/}