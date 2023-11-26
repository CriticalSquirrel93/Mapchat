import {Chat} from "./Chat";
import {useState, useRef} from "react";
import {getLocationData} from "../contexts/geocode";


export const Room = () => {
    const [room, setRoom] = useState(null);
    const roomInputRef = useRef(null);
    const locData = getLocationData();


    return (
        <div>
            {room ? (
                <Chat room={{room}}/>

            ): (
                <div className="room">
                    <label>Join your room :</label>
                    <input ref={roomInputRef} />
                    <button onClick={() => setRoom(roomInputRef.current.value)}>
                        Enter Chat
                    </button>
                </div>
                )}




        </div>
    );
}
