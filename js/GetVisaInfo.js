import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function GetVisaInfo() {

    return (
        <div  className={"visa__container"} style={{
            overflow: 'hidden !important'
        }}>
            <img
                src={'../assets/tp_logo_thin.png'}
                alt="Trip Planner Logo"
                className={"logo__visa"}
            />
            <nav className={"visa__nav"}>
                <Link to='/' className={"nav__element"} >Login Page</Link>
                <Link to='/map' className={"nav__element"}>Go to planner</Link>
            </nav>

            <iframe
                title="sherpa° Map"
                src="https://apps.joinsherpa.io/trip?appId=spY0ODAyNT&amp;elementId=TQ5Nz&amp;language=en-GB&amp;placement=covidTesting&amp;defaultPassport=browser&amp;showFilterConnection=false&amp;visasEnabled=true&amp;showFilters=true&amp;layouts=%5Bobject%20Object%5D&amp;enableSegmentEditor=true&amp;showVisaInformation=true&amp;showTitle=false&amp;showFilterPassport=true&amp;showFilterVaccinated=true&amp;showVisaPrice=false&amp;showSegments=true&amp;showViewAllLink=true&amp;enableVisaECommerce=true&amp;travelRestrictionsEnabled=true"
                allowFullScreen
                className={"iframe__object"}
                frameBorder="0"
                data-sdk-version="1.7.1"
                data-build-date="2024-01-18 20:25"
                data-element-id="TQ5Nz"
            ></iframe>
        </div>

    );
}

export default GetVisaInfo;