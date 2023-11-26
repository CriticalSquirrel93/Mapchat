import React, {useEffect, useState} from "react";
import {get, ref} from "firebase/database";
import {rdb} from "../firebase";

export function Post({ posterId, verified, zipcode, text }) {
    const [posterUsername, setPosterUsername] = useState('');
    const [likes, setLikes] = useState(0);
    const [loading, setLoading] = useState(true);

    const checkUsername = async (idToFind) => {
        const usernamesRef = ref(rdb, 'Data/Usernames/');
        const usernamesSnapshot = await get(usernamesRef);

        if (usernamesSnapshot.exists()) {
            const usernamesData = usernamesSnapshot.val();

            const username = usernamesData[idToFind];
            setLoading(false);
            return username ? username : null; // Return the username if found, otherwise null
        }

        return "Unknown User"; // If the node doesn't exist, return null.
    };

    useEffect(() => {

        // Use the checkUsername function to get the username for the given UID
        const fetchUsername = async () => {
            const username = await checkUsername(posterId);
            setPosterUsername(username || 'Unknown User'); // Set the username or default to 'Unknown User'
        };

        fetchUsername();
    }, [posterId]);

    if (loading) {
        return <p>Loading...</p>; // You can replace this with a loading spinner or any other loading indicator
    }

    return (
        <>
            <div className="card text-left mb-3 shadow">
                <div className="card-header">
                    <div className="d-flex align-items-center link-body-emphasis text-decoration-none px-1 py-2" aria-expanded="false">
                        <img src={"https://github.com/" + posterUsername + ".png"} alt="" width="32" height="32" className="rounded-circle me-2"></img>
                        <strong> @{ posterUsername } </strong>
                        <div className="card-subtitle text-muted px-3 m-1"><span className="fw-semibold fs-6">Zone :</span> {zipcode}</div>
                    </div>
                </div>
                <div className="card-body">
                        <div className="card-text text-left">
                            <p className="text-left">{text}</p>
                        </div>
                </div>
                <div className="card-footer">
                    <div className="btn card-link px-3">Reply</div>
                    <div className="btn card-link px-3">Repost</div>
                    <div className="btn card-link px-3">Like {likes ? (likes) : null }</div>
                    <div className="btn card-link px-3">Share</div>
                </div>
            </div>
        </>
    )
}