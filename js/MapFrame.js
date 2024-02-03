import React, {useState, useEffect, useContext } from 'react';
import { GoogleMap, Marker, useJsApiLoader, Polyline } from '@react-google-maps/api';
import CountryBorder, { getLatLngBounds } from "./CountryBorder";
import AttractionsListRender from "./AttractionsListRender";
import CustomMarker from "../assets/custom_marker.png";
import { SelectedCountryContext } from "./Contexts/SelectedCountryContext";
import {Link} from "react-router-dom";
import CountrySelect from "react-bootstrap-country-select";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';

const center = {
    lat: 50.60749435424805,
    lng: 16.77910041809082
};

const polandBound = [
    {lat: 49.0273953314, lng: 14.0745211117},
    {lat: 54.8515359564, lng: 14.0745211117},
    {lat: 49.0273953314, lng: 24.0299857927},
    {lat: 54.8515359564, lng: 24.0299857927},
]

const  MapFrame = () => {
    const {isLoaded,loadError} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY //API KEY as environmental variable
    })
    const [map, setMap] = React.useState(null);
    const [myBorders, setMyBorders] = React.useState(null);
    const [myBorderType, setMyBorderType] = React.useState("Polygon");
    const [myBounds, setMyBounds] = React.useState(polandBound); //getLatLngBounds funkcja zwracajaca maxymalne zakresy kraju
    const [countryCenter, setCountryCenter] = React.useState({lat: 50.60749435424805, lng: 16.77910041809082});
    const [attractionsMarkers, setAttractionsMarkers] = React.useState([{lat: 0, lon: 0}]);//Markers to show on the map after country select
    const [selectedMarker, setSelectedMarker] = React.useState(center);
    const { selectedCountry, setSelectedCountry } = useContext(SelectedCountryContext);

   const onLoad = React.useCallback(
        (mapInstance) => {
            setMap(mapInstance);
        },
        [setMap]
    );

    const onUnmount = React.useCallback(function callback() {
        setMap(null)
    }, [setMap])

    const country = selectedCountry ? selectedCountry.alpha3 : "pol";

    CountryBorder(setMyBorders, country, setCountryCenter, setMyBorderType);

    useEffect(() => {
        setMyBounds(getLatLngBounds(myBorders, myBorderType));
    }, [myBorders, myBorderType]);


    useEffect(() => {

        if (!map || !myBounds || myBounds.length < 1) {
            return;
        }
        // Calculate bounds
        const bounds = new window.google.maps.LatLngBounds();
        myBounds.forEach(marker => {
            bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng));
        });
        // Fit the bounds to the map
        map.fitBounds(bounds);

    }, [map, myBounds]);

    const handleCountryChange = (country) => {
        setSelectedCountry(country);
    };
    const handleTextChange = (country) => {
        setSelectedCountry({ name: "" });
    };


    const RenderCountry = () => {
        if (myBorderType === "Polygon"){
            //Return  Polyline component for countries Polygon border
            return (<Polyline visible={true} editable={false} draggable={false} path={myBorders}/>);
        } else {

            //Return multiple Polyline components for countries with Multi Polygon border
            return ( myBorders.map(element => (<Polyline key={element[0][0].lat*1e+12} visible={true} editable={false} draggable={false} path={element[0]}/>)));
        }
    }

    if (loadError) {
        return <div>Error loading Google Maps API</div>;
    }

    return isLoaded ? (
        <div className={"map__container"}>
            <img
                src={'../assets/tp_logo_thin.png'}
                alt="Trip Planner Logo"
                className={"logo__map"}
            />
            <img
                src={'../assets/tp_logo_mobile_small.png'}
                alt="Trip Planner Logo"
                className={"logo__map_small"}
            />
            <nav className={"map__nav"}>
                <Link to='/' className={"nav__element"}>Login Page</Link>
                <Link to='/visa' className={"nav__element"}>Get Visa Info</Link>
            </nav>

            <div className={"country__select__container"}>
                <h5 className={"country__title"}>Select destination country:</h5>
                <CountrySelect
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    onTextChange={handleTextChange}
                    flush={false}
                />
            </div>
            <div className={"content__container"}>
                <GoogleMap
                    mapContainerClassName={"map__render"}
                    center={countryCenter}
                    zoom={4}
                    mapTypeId={"terrain"}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    gestureHandling={'auto'}
                    options={{streetViewControl: false}}
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    <Marker
                        position={selectedMarker}
                        options={{
                            icon: CustomMarker,
                        }}
                        zIndex={1000}
                    /> { /* Shows red marker in center of the map */}
                    {attractionsMarkers.map((el) => (<Marker key={el.lat} position={el}/>))}
                    <RenderCountry />
                </GoogleMap>
                <AttractionsListRender myBounds={myBounds} setMarkers={setAttractionsMarkers} markers={attractionsMarkers} setMarker={setSelectedMarker}/>
            </div>
        </div>

    ) : null;
}

export default React.memo(MapFrame); //Using memo improves performance for components that will look the same