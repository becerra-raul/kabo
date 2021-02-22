import React from "react";
import {Redirect} from "react-router-dom";

export const RedirectRoute = ({location}) => {
    let redirectLocation = location.search.length ? location.search.split("?location=")[1] : "";
    if (redirectLocation) {
        return window.location = redirectLocation.indexOf('http') >= 0
            ? redirectLocation
            : 'https://' + redirectLocation;
    } else {
        return <Redirect to="/" />
    }
};