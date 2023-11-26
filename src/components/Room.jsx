import {Chat} from "./Chat";
import {useState, useRef, useEffect} from "react";
import {getLocationData} from "../contexts/geocode";


export const Room = () => {
    const [state, setState] = useState({
        loading: true,
        room: false
    });
    const roomInputRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            await getLocationData().then((result) => {
                setState({
                    loading: false,
                    room: result.zipcode
                });
            });
        };

        fetchData().then(r => {
            console.log("Location data fetched.");
        });
    }, []);

    if (state.loading) {
        return null;
    } else {
        return (
            <div>
                <Chat room={state.room}/>
            </div>
        )
    }

/*    getLocationData().then(response => {
        setRoom(response.zipcode);
        console.log(room);
        return (
            <div>
                <Chat room={{room}}/>
            </div>
        )
    }).catch(err => {
        console.error("Location data not received");
    });

 */

/*
    return (
        <div>
            {isLoading ? (

                <div>
                    Awaiting Location Data
                </div>
            ): (
                <Chat room={{room}}/>
                )}
        </div>
    );

 */
}
