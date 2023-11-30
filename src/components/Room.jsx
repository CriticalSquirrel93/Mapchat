/*
Description:
    This file functions as a redirect page while awaiting location data.
Credit:
    * Cole Simonse
    * Nico Stovall
 */

import {Chat} from "./Chat";
import {useState, useEffect} from "react";
import {getLocationData} from "../contexts/geocode";
import {Homepage} from "./Homepage";


export const Room = () => {
    const [state, setState] = useState({
        loading: true, // true if page is loading
        room: false // true if location received
    });

    // useEffect triggers once
    useEffect(() => {
        const fetchData = async () => {
            // fetchData funciton returns a promise, fetches the zipcode and assigns it to the room variable
            // it also updates the loading var
            await getLocationData().then((result) => {
                setState({
                    loading: false,
                    room: result.zipcode
                });
            }).catch((err) => {
                alert("Location required to chat!\n\nPlease refresh and allow mapchat to access your location.");
                // if location access denied, prompt user to share and don't allow them to enter the chat.
            });
        };

        fetchData().then(r => {
            console.log("Location data fetched.");
        });
    }, []);

    if (state.loading) {
        return null;
    } else {
        // send user to the appropriate chatroom.
        return (
            <div>
                <Chat room={state.room}/>
            </div>
        )
    }
}
