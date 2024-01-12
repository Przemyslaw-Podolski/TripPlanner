import React, { useState, useEffect } from 'react'
function fetchJSON(url) {
    return fetch(url)
        .then(function(response) {
            return response.json();
        });
}


export default function CountryBorder(setBorder, country, setCountryCenter, setMyBorderType){


    useEffect(() => {
            fetchJSON('../assets/ne_50m_admin_0_countries.geojson')
            .then(data => {

                data.features.forEach(function(feature) {
                    //console.log(feature);
                    const countryName = feature.properties.NAME;
                    var borderShape = [];
                    console.log("CountryBorder.js line:21");

                    //console.log(countryName, "Zimbabwe. Check if equal: ", countryName === "Zimbabwe", "Zimbabwe. Check if different: ", countryName !== "Zimbabwe");
                    if (countryName === country.country){


                        setCountryCenter({
                            lat: feature.properties.LABEL_Y,
                            lng: feature.properties.LABEL_X
                        })

                        if(feature.geometry.type === "Polygon"){
                            setMyBorderType("Polygon");
                            borderShape = feature.geometry.coordinates[0].map(el => (
                                {lat: el[1], lng: el[0]}
                            ))
                        } else {
                            borderShape = feature.geometry.coordinates.map(el => el.map( polygon => ( polygon.map( position => (
                                    {lat: position[1], lng: position[0]}
                                ))

                                )

                            ));
                            setMyBorderType("MultiPolygon");
                            console.log("MultiPolygon mapped");
                            console.log(borderShape);
                            console.log("MultiPolygon");
                            console.log(feature.geometry.coordinates);
                        }

                        setBorder(borderShape);
                    }
                    //console.log(countryName);
                });

            });
    }, [country]);

}