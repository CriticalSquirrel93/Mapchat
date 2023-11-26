import {Chat} from "./Chat";
import {useState, useEffect} from "react";
import {getLocationData} from "../contexts/geocode";


export const Room = () => {
    const [state, setState] = useState({
        loading: true,
        room: false
    });

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
}
