import React, { useEffect, useState } from "react";
import {Image} from "react-bootstrap";
const pageLength = 15; // number of objects per page
let bounds = `lon_min=14.0745211117&lat_min=49.0273953314&lon_max=24.0299857927&lat_max=54.8515359564`;
let offset = 0; // offset from first object in the list
let count; // total objects count
const kinds = "&kinds=interesting_places"
const format = "&format=geojson";

//IMPORTANT: OpenTripMap API Free for Non-commercial use 5 000 requests / day
//IMPORTANT: http://api.opentripmap.com/0.1/en/places/bbox?lon_min=38.364285&lat_min=59.855685&lon_max=38.372809&lat_max=59.859052&kinds=churches&format=geojson&apikey=5ae2e3f221c38a28845f05b6989c3a66a18d9e755cb330371f1afda6
//API OpenTripMap Fetch


function apiOpenTripMapGet(method, query) {
    console.log("AttractionsListRender apiOpenTripMapGet call");
    return new Promise(function(resolve, reject) {
        let otmAPI =
            "http://api.opentripmap.com/0.1/en/places/" +
            method +
            "apikey=" + process.env.OPEN_TRIP_MAP_API_KEY;
        if (query !== undefined) {
            otmAPI += "&" + query;
        }

        fetch(otmAPI)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(function(err) {
                console.log("Fetch Error :-S", err);
            });

    });
}

// TODO: If attractions list length<10 use lower rate and repeat fetch
/*IMPORTANT: rate = 3h - maximum spot popularity and heritage place, 3 - popular places
* IMPORTANT: search by:
*            -radius (m), offset, lon, lat OR
*            -bbox?lon_min=38.364285&lat_min=59.855685&lon_max=38.372809&lat_max=59.859052
*/

const AttractionsListRender = ({myBounds, setMarkers, markers, setMarker}) =>{
    const [fetchedData, setFetchedData] = useState([]); // State variable to store fetched data
    const [selectedXID, setSelectedXID] = useState(null);
    const decimals = 10;

    useEffect(() => {

        console.log("AttractionsListRender component call");
        if (myBounds === undefined){
            console.log("AttractionsListRender: MyBounds: ", myBounds);
            return;
        }
        const boundsCode = `lon_min=${myBounds[0].lng.toFixed(decimals)}&lat_min=${myBounds[0].lat.toFixed(decimals)}&lon_max=${myBounds[3].lng.toFixed(decimals)}&lat_max=${myBounds[3].lat.toFixed(decimals)}`;

        console.log("Bounds Code Calculated:",boundsCode);
        apiOpenTripMapGet(
            "bbox?",
            `${boundsCode}&limit=${pageLength}&offset=${offset}&rate=3h&kinds=historic_object&format=json&`
        ).then(function(data) {
            console.log("AttractionsListRender apiOpenTripMapGet returned data: ")
            console.log(data);
            setFetchedData(data);
        });
    },[myBounds]);


    useEffect(() => {
        console.log("Fetched data in useEffect: ", fetchedData);
        setMarkers(
            fetchedData.map( el => ({
                lat: el.point.lat,
                lng: el.point.lon
            }))
        );

    }, [fetchedData]);

    useEffect(() => {
        console.log("Attractions markers set: ", markers);
    }, [markers]);

    function chooseAttraction(xid, lon, lat){
        console.log("chooseAttraction xid:", xid);
        setSelectedXID(xid);
        console.log("Selected attraction lon: ", lon, "lat: ", lat);
        setMarker(
            {lat: lat,
            lng: lon
            }
        );
    }

    return(
        <>
            <h2 className={"attractions__title"}>Spot list: </h2>
            <ul className={"attractions__list"}>
                {fetchedData.map(item =>
                    (<li
                        className={"attractions__element"}
                        key={item.xid}
                        onClick={(e) => chooseAttraction(item.xid, item.point.lon, item.point.lat)}
                    >
                        {item.name}
                    </li>))
                }
            </ul>
            <AttractionInfoShow xid={selectedXID}/>
        </>
    )
};

const AttractionInfoShow =  ({xid}) => {
    // TODO: https://api.opentripmap.com/0.1/en/places/xid/W167176809?apikey=5ae2e3f221c38a28845f05b6989c3a66a18d9e755cb330371f1afda6
    // TODO: http://api.opentripmap.com/0.1/en/places/geojson&apikey=5ae2e3f221c38a28845f05b6989c3a66a18d9e755cb330371f1afda6
    // /
    const [fetchedData, setFetchedData] = useState([]); // State variable to store fetched data
    const [imageLink, setImageLink] = useState("");

    useEffect(() => {
        if (xid === undefined) {
            console.log("AttractionInfoShow: xid: ", xid);
            return;
        }

        apiOpenTripMapGet(
            `xid/${xid}?`
        ).then(function (data) {
            console.log("AttractionsListRender apiOpenTripMapGet returned data: ")
            console.log(data);
            setFetchedData(data);
        });

    }, [xid]);


    let Image = (<></>);
    if (fetchedData.preview !== undefined) {
        Image = (
            <img src={fetchedData.preview.source} alt={"image of attraction"} height={400} width={400}/>
        );
    } else{
        Image = (<></>);
    }

    return (
        <>
            <h1>Selected attraction: {fetchedData.name}</h1>
            {Image}
        </>
    )
}

export default AttractionsListRender;