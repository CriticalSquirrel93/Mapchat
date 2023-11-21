import React, { useState } from 'react';

export let getLocationData = () => {
    let zip;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude,
                    long = position.coords.longitude,
                    url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
                        + lat + "," + long + "&result_type=postal_code&key=AIzaSyACt-GVyeV6bjLcEjSFLm_GMQy1HDJxiJQ";
                fetch(url)
                    .then(response => {
                        if (response.ok) {
                            console.log('Address data retrieved!');
                        } else {
                            console.error('Data NOT retrieved.');
                        }
                        response.json()
                            .then(data => {
                                console.log(data);
                                zip = data.results[0].address_components[0].short_name;
                            });
                        }
                    )
                    .catch(error => console.error(error))
                // JSON result in `data` variable
            }
        );
        /*
        return {
            lat: lat,
            long: long,
            zip: zipcode,
            time: time
        };
        */
    } else {
        alert("Sorry, Geolocation is not supported by your browser.");
    }
    return (zip)

}