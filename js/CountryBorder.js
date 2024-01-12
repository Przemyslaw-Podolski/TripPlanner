import React, { useState, useEffect } from 'react'
function fetchJSON(url) {
    return fetch(url)
        .then(function(response) {
            return response.json();
        });
}


export default function CountryBorder(props){


    useEffect(() => {
            fetchJSON('../assets/ne_50m_admin_0_countries.geojson')
            .then(data => {

                data.features.forEach(function(feature) {
                    //console.log(feature);
                    const countryName = feature.properties.NAME;
                    var borderShape = [];

                    //console.log(countryName, "Zimbabwe. Check if equal: ", countryName === "Zimbabwe", "Zimbabwe. Check if different: ", countryName !== "Zimbabwe");
                    if (countryName === "Poland"){
                        console.log("My object border");
                        console.log(typeof countryName, ". Country: ", countryName);
                        borderShape = feature.geometry.coordinates[0].map(el => (
                            {lat: el[1], lng: el[0]}
                        ))
                        props.setBorder(borderShape);
                    }
                    //console.log(countryName);
                });

            });
    }, []);

    return (
        <>
            <h1>Elo !</h1>
        </>
    )
}