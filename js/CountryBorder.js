import React, { useState, useEffect } from 'react'

function fetchJSON(url) {
    return fetch(url)
        .then(function(response) {
            return response.json();
        });
}

export default function CountryBorder(setBorder, country, setCountryCenter, setMyBorderType){
    useEffect(() => {
        fetchJSON('../assets/ne_10m_admin_0_countries.geojson')
            .then(data => {
                data.features.forEach(function(feature) {
                    const countryName = feature.properties.NAME; //To be used when needed
                    const countryCode = feature.properties.ADM0_A3.toLowerCase();
                    let borderShape = [];

                    if (countryCode === country.country){
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
                                )))
                            ));
                            setMyBorderType("MultiPolygon");
                        }
                        setBorder(borderShape);
                    }
                });
            });
    }, [country]);
}

function getLatLngBoundsforPolygon(border){
    if (border === null){
        return;
    }
    let minLat = border[0].lat;
    let maxLat = border[0].lat;
    let minLng = border[0].lng;
    let maxLng = border[0].lng;
    //console.log("getLatLngBoundsforPolygon, maxLng: ", maxLng);
    //console.log("getLatLngBoundsforPolygon, minLng: ", minLng);

// Iterate through the array to find min and max values
    border.forEach(marker => {
        minLat = Math.min(minLat, marker.lat);
        maxLat = Math.max(maxLat, marker.lat);
        minLng = Math.min(minLng, marker.lng);
        maxLng = Math.max(maxLng, marker.lng);

    });
    //console.log("getLatLngBoundsforPolygon, After maxLng: ", maxLng);
    //console.log("getLatLngBoundsforPolygon, After minLng: ", minLng);

    //return [maxLat - minLat, maxLng - minLng];
    return ([
        {lat: minLat, lng: minLng},
        {lat: minLat, lng: maxLng},
        {lat: maxLat, lng: minLng},
        {lat: maxLat, lng: maxLng}
    ])
}

function getLatLngBoundsForMulti(border){
    if (border === null){
        return;
    }

    let minLat = border[0][0][0].lat;
    let maxLat = border[0][0][0].lat;
    let minLng = border[0][0][0].lng;
    let maxLng = border[0][0][0].lng;


// Iterate through the array to find min and max values
    border.forEach(marker => { marker[0].forEach( el => {
        minLat = Math.min(minLat, el.lat);
        maxLat = Math.max(maxLat, el.lat);
        minLng = Math.min(minLng, el.lng);
        maxLng = Math.max(maxLng, el.lng);
    })
    });

    return ([
        {lat: minLat, lng: minLng},
        {lat: minLat, lng: maxLng},
        {lat: maxLat, lng: minLng},
        {lat: maxLat, lng: maxLng}
    ])
    //return [maxLat - minLat, maxLng - minLng];
}

export function getLatLngBounds(border, type) {
    //console.log("getLatLngBounds line:110 myBounds", border, "type: ", type)
    if (border === null || type === null) {
        return;
    }
    if (type === "Polygon") {
        //console.log("getLatLngBounds Polygon line:110 LatLng", getLatLngBoundsforPolygon(border))
        return getLatLngBoundsforPolygon(border);
    }else{
        //console.log("getLatLngBounds Multi line:110 LatLng", getLatLngBoundsForMulti(border))
        return getLatLngBoundsForMulti(border);
    }
}
