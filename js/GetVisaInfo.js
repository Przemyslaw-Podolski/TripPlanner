import React from 'react';
import {Link} from "react-router-dom";

function GetVisaInfo() {
    return (
        <div  style={{
            overflow: 'hidden !important',
            width: '1000px',
            height: '1000px'
        }}>
            <Link to='/map'>Go to planner</Link>
            <Link to='/'>Login Page</Link>
            <iframe
                title="sherpa° Map"
                src="https://apps.joinsherpa.io/trip?appId=spY0ODAyNT&amp;elementId=TQ5Nz&amp;language=en-GB&amp;placement=covidTesting&amp;defaultPassport=browser&amp;showFilterConnection=false&amp;visasEnabled=true&amp;showFilters=true&amp;layouts=%5Bobject%20Object%5D&amp;enableSegmentEditor=true&amp;showVisaInformation=true&amp;showTitle=false&amp;showFilterPassport=true&amp;showFilterVaccinated=true&amp;showVisaPrice=false&amp;showSegments=true&amp;showViewAllLink=true&amp;enableVisaECommerce=true&amp;travelRestrictionsEnabled=true"
                allowFullScreen
                style={{
                    overflow: 'hidden',
                    minWidth: '300px',
                    width: '100%',
                    border: 'none',
                    height: '1000px'
                }}
                frameBorder="0"
                data-sdk-version="1.7.1"
                data-build-date="2024-01-18 20:25"
                data-element-id="TQ5Nz"
            ></iframe>
        </div>

    );
}

export default GetVisaInfo;