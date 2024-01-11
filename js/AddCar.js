import React, {useState, useEffect, useRef} from 'react';

const API_URL = 'http://localhost:3000/cars';

export default function AddCar({cars, setCars}) {

    const [newCar, setNewCar] = useState(null);
    const newModel = useRef(null);
    const newName = useRef(null);
    const newFuel = useRef(null);
    const newHP = useRef(null);

    useEffect(() => {
        if (newCar !== null) {
            handleAdd(newCar);
            setCars(prev => [...prev,newCar]);
            setNewCar(null); // Reset newCar after handling
        }
    }, [newCar]);


    function handleGetInputValues(e) {
        e.preventDefault();
        const id = cars[cars.length - 1].id + 1;
        const model = newModel.current.value;
        const name = newName.current.value;
        const fuel = newFuel.current.value;
        const hp = newHP.current.value;

        if (model !== "" && name !== "" ){
            setNewCar(
                {
                    "id": id,
                    "name": model,
                    "brand": name,
                    "engine": {
                        "type": fuel,
                        "hp": hp
                    }
                }
            );
        }
        newHP.current.value = null;
        newFuel.current.value = null;
        newName.current.value = null;
        newModel.current.value = null;
    }


    function handleAdd(inp) {
        fetch(`${API_URL}`, {
            method: 'POST',
            body: JSON.stringify(inp),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Fetch data from API: ", data);
            })
            .catch(error => console.error(error));
    }

    return(
        <form className="header" style={{margin:"100px"}}>
            <h2>Dodaj nowy samochód</h2>
            <input
                type="text"
                placeholder="Model"
                ref={newModel}
                className="uncontrolled-input input-model"
                defaultValue=""
            />
            <input
                type="text"
                placeholder="Name"
                ref={newName}
                className="uncontrolled-input input-name"
                defaultValue=""
            />
            <input
                type="text"
                placeholder="Fuel type"
                ref={newFuel}
                className="uncontrolled-input input-fuel"
                defaultValue=""
            />
            <input
                type="text"
                placeholder="Power"
                ref={newHP}
                className="uncontrolled-input input-hp"
                defaultValue=""
            />

            <button className="btn-add"  onClick={handleGetInputValues}>Dodaj</button>
        </form>
    )
}