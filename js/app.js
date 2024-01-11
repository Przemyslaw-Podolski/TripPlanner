import React, {useState} from "react";
import { createRoot } from "react-dom/client";

import CarsManager from './CarsManager';
import AddCar from "./AddCar";


function App() {
    const [cars, setCars] = useState(null);
    return(
        <>
            <AddCar cars={cars} setCars={setCars}/>
            <CarsManager cars={cars} setCars={setCars}/>
        </>
        )

}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);