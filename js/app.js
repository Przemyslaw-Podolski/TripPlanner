import React, {useState} from "react";
import { createRoot } from "react-dom/client";

import MapFrame from "./MapFrame";

function App() {
    const [cars, setCars] = useState(null);
    return(
        <>
            <img
                src={'./assets/tp_logo.png'}
                alt="Trip Planner Logo"
            />
            <MapFrame/>
        </>
        )

}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);