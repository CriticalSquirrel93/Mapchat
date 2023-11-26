import { serverTimestamp } from 'firebase/firestore';

export async function getLocationData() {
    let zip, lat, long, time;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                time = serverTimestamp();
                const url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
                    + lat + "," + long + "&result_type=postal_code&key=AIzaSyACt-GVyeV6bjLcEjSFLm_GMQy1HDJxiJQ";
                // please be careful with this api key: high enough usage will cost me money!! -Nico
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
                                    console.log(zip);
                                });
                        }
                    )
                    .catch(error => console.error(error))
                // JSON result in `data` variable
            }
        );

        return {
            zipcode: zip,
            timestamp: time
        };

    } else {
        alert("Sorry, Geolocation is not supported by your browser.");
    }
}