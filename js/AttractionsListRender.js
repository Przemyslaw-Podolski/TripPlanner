import React, { useEffect, useState } from "react";
const pageLength = 10; // number of objects per page

//IMPORTANT: OpenTripMap API Free for Non-commercial use 5 000 requests / day
//API OpenTripMap Fetch

function apiOpenTripMapGet(method, query) {
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
    const [offset, setOffset] = useState(0);
    const [fetchedData, setFetchedData] = useState([]); // State variable to store fetched data
    const [selectedXID, setSelectedXID] = useState(null);
    const [attractionsCount, setAttractionsCount] = useState(0);
    const decimals = 10; //decimals for longitude and latitude

    /*----------------------------------------------------------------------------
   /Get total number of POI's and set Offset to 0
   ----------------------------------------------------------------------------*/
    useEffect(() => {
        if (myBounds === undefined){
            return;
        }
        const boundsCode = `lon_min=${myBounds[0].lng.toFixed(decimals)}&lat_min=${myBounds[0].lat.toFixed(decimals)}&lon_max=${myBounds[3].lng.toFixed(decimals)}&lat_max=${myBounds[3].lat.toFixed(decimals)}`;
        apiOpenTripMapGet(
            "bbox?",
            `${boundsCode}&limit=${pageLength}&offset=0&rate=3h&kinds=historic_object&format=count&`
        ).then(function(data) {
            setAttractionsCount(data.count);
            setOffset(0);
        });
    },[myBounds]);

    /*----------------------------------------------------------------------------
    /Get one page of attractions in defined bounds
    ----------------------------------------------------------------------------*/
    useEffect(() => {
        if (myBounds === undefined){
            return;
        }
        const boundsCode = `lon_min=${myBounds[0].lng.toFixed(decimals)}&lat_min=${myBounds[0].lat.toFixed(decimals)}&lon_max=${myBounds[3].lng.toFixed(decimals)}&lat_max=${myBounds[3].lat.toFixed(decimals)}`;

        apiOpenTripMapGet(
            "bbox?",
            `${boundsCode}&limit=${pageLength}&offset=${offset}&rate=3&kinds=historic_object&format=json&`
        ).then(function(data) {
            setFetchedData(data);
        });
    },[myBounds,offset]);

    /*----------------------------------------------------------------------------
    /Set attractions markers to display on the map
    ----------------------------------------------------------------------------*/
    useEffect(() => {
        setMarkers(
            fetchedData.map( el => ({
                lat: el.point.lat,
                lng: el.point.lon
            }))
        );
    }, [fetchedData]);

    useEffect(() => {
    }, [markers]);

    function chooseAttraction(xid, lon, lat){
        setSelectedXID(xid);
        setMarker(
            {lat: lat,
            lng: lon
            }
        );
    }

    /*----------------------------------------------------------------------------
    /Next page button handler
    ----------------------------------------------------------------------------*/
    function nextBtnHandler(){
        setOffset(prevState => prevState + pageLength);
    }
    function prevBtnHandler(){
        setOffset(prevState => prevState - pageLength);
    }


    // TODO: next button add
    return(
        <>
            { selectedXID
                ?
                <div className={"selected__attraction__container"}>
                    <AttractionInfoShow xid={selectedXID}/>
                </div>
                :
                <></>
            }

            <div className={"attractions__container"}>
                <h5 className={"attractions__title"}>Spot list: </h5>
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
                    <div className={"attractions__pagination"}>
                        <p className={"pagination__info"}>Page {Math.floor((offset + pageLength) / pageLength)} from {Math.ceil(attractionsCount / pageLength)}</p>
                        {offset > 0 ? <button className={"list__btn btn"} onClick={e => prevBtnHandler()}>Prev</button> : <></>}
                        {attractionsCount > offset + pageLength ? <button className={"list__btn btn"} onClick={e => nextBtnHandler()}>Next</button> : <></>}
                    </div>
                </ul>
            </div>
        </>
    )
};

/*----------------------------------------------------------------------------
/Show one selected attraction
----------------------------------------------------------------------------*/
const AttractionInfoShow =  ({xid}) => {

    // TODO: description add and wiki link
    // TODO: if array from fetch is smaller that 10 change rate
    const [fetchedData, setFetchedData] = useState([]); // State variable to store fetched data

    useEffect(() => {
        if (xid === undefined) {
            return;
        }

        apiOpenTripMapGet(
            `xid/${xid}?`
        ).then(function (data) {
            setFetchedData(data);
        });
    }, [xid]);


    let Image = (<></>);
    if (fetchedData.preview !== undefined) {
        Image = (
            <img src={fetchedData.preview.source} alt={"No image"} className={"image_attraction"}/>
        );
    } else{
        Image = (<></>);
    }

    return (
        <>
            <h5 className={"attractions__title"} >Preview: {fetchedData.name}</h5>
            <div className={"image__container"}>{Image}</div>
        </>
    )
}

export default AttractionsListRender;