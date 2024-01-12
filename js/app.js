import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import MapFrame from "./MapFrame";
import CountrySelect from "react-bootstrap-country-select";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';


function App() {
    const [selectedCountry, setSelectedCountry] = useState("");

    const handleCountryChange = (country) => {
        setSelectedCountry(country);
        console.log(selectedCountry);
    };

    const handleTextChange = (country) => {
        console.log(country);
    };
    return(
        <>
            <img
                src={'./assets/tp_logo.png'}
                alt="Trip Planner Logo"
            />
            <div style={{width:"500px"}}>
                <CountrySelect
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    onTextChange={handleTextChange}
                    flush={false}
                />
            </div>
            <p>{selectedCountry.name}</p>
            <MapFrame country={selectedCountry}/>
        </>
        )
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

//                {/*valueAs={name}*/}