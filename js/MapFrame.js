import React, {useState, useEffect} from 'react'
import { GoogleMap, Marker, useJsApiLoader, Polyline } from '@react-google-maps/api';
import CountryBorder from "./CountryBorder";

const containerStyle = {
    width: '1100px',
    height: '800px'
};


const center = {
    lat: 50.60749435424805,
    lng: 16.77910041809082
};


const markers = [
    {lat: 50.63, lng: 16.707},
    {lat: 50.62, lng: 16.714},
    {lat: 50.60, lng: 16.781},
    {lat: 50.59, lng: 16.742}
]




const  MapFrame = (country) => {
        const {isLoaded} = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: process.env.API_KEY //API KEY as environmental variable
        })


        const [map, setMap] = React.useState(null)
        const [myBorders, setMyBorders] = React.useState(null)
        const [myBorderType, setMyBorderType] = React.useState("Polygon")
        const [countryCenter, setCountryCenter] = React.useState({
            lat: 50.60749435424805,
            lng: 16.77910041809082
        })


        const onUnmount = React.useCallback(function callback(map) {
            setMap(null)
        }, [])

        CountryBorder(setMyBorders, country, setCountryCenter, setMyBorderType);

    const RenderCountry = () => {
        if (myBorderType === "Polygon"){
            //Return  Polyline component for countries Polygon border
            return (<Polyline visible={true} editable={false} draggable={false} path={myBorders}/>);
        } else {
            //Return multiple Polyline components for countries with Multi Polygon border
            return ( myBorders.map(element => (<Polyline key={element[0][0].lat*1e+12} visible={true} editable={false} draggable={false} path={element[0]}/>)));
        }
    }


        return isLoaded ? (

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={countryCenter}
                zoom={6}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <Marker position={center}/> { /* Shows red marker in center of the map */}
                {markers.map((el) => (<Marker key={el.lat} position={el}/>))}
                <RenderCountry />
                <>
                    onUnmount={onUnmount}
                </>
            </GoogleMap>
        ) : null;
    }


export default MapFrame; //Using memo improves performance for components that will look the same


/*
Do rozkminy

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        map.setZoom(10);

        setMap(map)
    }, [])
)
          JSX
          <>
            onLoad={onLoad}
          </>
 */