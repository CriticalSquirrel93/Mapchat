/*
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

        const { latitude, longitude } = position.coords;
        const time = serverTimestamp();
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=postal_code&key=AIzaSyACt-GVyeV6bjLcEjSFLm_GMQy1HDJxiJQ`;
        const response = await fetch(url);

        if (!response.ok) {
            console.error('Data NOT retrieved.');
            return null;
        }

        const data = await response.json();
        console.log('Address data retrieved:', data);
        const zip = data.results[0].address_components[0].short_name;

        return {
            zipcode: zip,
            timestamp: time
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}