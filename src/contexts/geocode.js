/*
Description:
    This file contains the asynchronous function getLocationData() which returns a promise
    on resolution of that promise, the caller will receive a timestamp and a location.
    Credit:
    * GitHub:
        https://gist.github.com/bomsn/ca43368ff4cd554a612871ddfa18c4c9
    * Google maps geocoding documentation:
        https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding
    * Nico Stovall
 */

import { serverTimestamp } from 'firebase/firestore';

export async function getLocationData() {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        // position receives a location object containing (among other things) latitude and longitude

        const { latitude, longitude } = position.coords; // these variables contain latitude and longitude
        const time = serverTimestamp(); // this contains date and time parsable by our database
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=postal_code&key=AIzaSyACt-GVyeV6bjLcEjSFLm_GMQy1HDJxiJQ`;
        // url: this var contains an API key that allows the program to access a googlemaps API
        const response = await fetch(url); // response will contain an object, importantly containing zipcode

        // error on no response
        if (!response.ok) {
            console.error('Data NOT retrieved.');
            return null;
        }

        const data = await response.json(); // response converted to json
        const zip = data.results[0].address_components[0].short_name; // zip is the zipcode as extracted from data

        return {
            zipcode: zip,
            timestamp: time
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}