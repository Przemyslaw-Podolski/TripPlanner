import React, { useState, Component } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import MapFrame from "./MapFrame";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { LoginContext } from "./Contexts/LoginContext"
import { SelectedCountryContext } from "./Contexts/SelectedCountryContext"
import LoginPage from "./auth/LoginPage";
import GetVisaInfo from "./GetVisaInfo";

const  App = () => {
    const [selectedCountry, setSelectedCountry] = useState({name: "Poland", alpha3: "pol"});
    const [authUser, setAuthUser] = useState(null);

    class NotFound extends Component {
        render() {
            return <h1>404,Nothing is here. Wrong Address.</h1>;
        }
    }

    return(
        <>
            <LoginContext.Provider value={{ authUser, setAuthUser }}>
                <SelectedCountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
                <HashRouter>
                    <Routes>
                            <Route path='/' element={<LoginPage/>}/>
                            <Route path='map' element={<MapFrame />}/>
                            <Route path='/visa' element={<GetVisaInfo />}/>
                            <Route path="*" element={<NotFound />} />
                    </Routes>
                </HashRouter>
                </SelectedCountryContext.Provider>
            </LoginContext.Provider>
        </>
    )
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);