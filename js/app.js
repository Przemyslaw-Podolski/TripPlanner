import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import MapFrame from "./MapFrame";
import CountrySelect from "react-bootstrap-country-select";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';


const  App = () => {
    const [selectedCountry, setSelectedCountry] = useState({name: ""});
    console.log(selectedCountry);

    const handleCountryChange = (country) => {
        setSelectedCountry(country);
        console.log(`app.js line:15 country:`);
        console.log(country);
        console.log(`app.js line:17 selectedCountry`);
        console.log(selectedCountry);
    };

    function SelCountryDisplay(){
        if (selectedCountry !== null){
            return(
                <>
                    <p>{selectedCountry.name}</p>
                    <MapFrame country={selectedCountry.name}/>
                </>

            )
        } else{
            return(
                <>
                    <MapFrame country={"Poland"}/>
                </>
                )
        }

    }

    const handleTextChange = (country) => {
        if (selectedCountry.name !== null) {
            selectedCountry.name = "";
        }
        console.log(`app.js line:44 handleTextChange`);
        console.log(country);
        }



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
            <SelCountryDisplay />
        </>
        )
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

//                {/*valueAs={name}*/}