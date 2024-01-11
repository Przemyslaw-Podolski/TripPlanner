import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/cars';

export default function CarsManager({cars, setCars}) {

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.ok && response.json())
            .then(data => setCars(data))
            .catch(error => console.error(error));
    }, []);

    function handleSell(id) {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setCars(prevCars => prevCars.filter(car => car.id !== id));
                }
            })
            .catch(error => console.error(error));
    }

    return (
        <div>
            <ul style={{width:"1000px", display:"flex", flexWrap:"wrap"}}>
                {
                    cars && cars.map(({ id, name, brand, engine: { type, hp } }) => (
                        <li key={id} style={{ listStyle: 'none', border: '1px solid black', margin: '10px', padding: '10px', width:"300px"}}>
                            <p>Model: {name}</p>
                            <p>Marka: {brand}</p>
                            <p>Paliwo: {type}</p>
                            <p>HP: {hp}</p>
                            <button onClick={() => handleSell(id)}>Sprzedany</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )

}
