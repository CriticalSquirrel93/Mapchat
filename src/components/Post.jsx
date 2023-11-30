/*
    Description:
        Individual post component for the feed.
    Credit:
        * Ash
*/

// Import necessary dependencies from React and Firebase
import React, { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { rdb } from "../firebase";

// Functional component representing a post
export function Post({ posterId, verified, zipcode, text }) {
    // State variables to store poster's username, likes count, and loading status
    const [posterUsername, setPosterUsername] = useState('');
    const [likes, setLikes] = useState(0);
    const [loading, setLoading] = useState(true);

    // Asynchronous function to check and retrieve the username based on user ID
    const checkUsername = async (idToFind) => {
        // Reference to the 'Usernames' node in the Firebase Realtime Database
        const usernamesRef = ref(rdb, 'Data/Usernames/');

        // Fetch the data snapshot from the 'Usernames' node
        const usernamesSnapshot = await get(usernamesRef);

        // Check if the node exists in the database
        if (usernamesSnapshot.exists()) {
            // Extract data from the snapshot
            const usernamesData = usernamesSnapshot.val();

            // Get the username based on the provided user ID
            const username = usernamesData[idToFind];

            // Update loading status and return the username if found, otherwise return null
            setLoading(false);
            return username ? username : null;
        }

        // If the 'Usernames' node doesn't exist, return a default value
        return "Unknown User";
    };

    // Effect hook to fetch and set the poster's username when the component mounts or when 'posterId' changes
    useEffect(() => {
        // Use the checkUsername function to get the username for the given UID
        const fetchUsername = async () => {
            const username = await checkUsername(posterId);
            // Set the username or default to 'Unknown User'
            setPosterUsername(username || 'Unknown User');
        };

        // Call the fetchUsername function
        fetchUsername();
    }, [posterId]);

    // If data is still loading, render a loading indicator
    if (loading) {
        return <p>Loading...</p>;
    }

    // Render the post content once data is loaded
    return (
        <>
            {/* Post card container */}
            <div className="card text-left mb-3 shadow">
                {/* Card header section */}
                <div className="card-header">
                    {/* User information section */}
                    <div className="d-flex align-items-center link-body-emphasis text-decoration-none px-1 py-2" aria-expanded="false">
                        {/* User avatar */}
                        <img src={"https://github.com/" + posterUsername + ".png"} alt="" width="32" height="32" className="rounded-circle me-2"></img>
                        {/* User handle */}
                        <strong> @{posterUsername} </strong>
                        {/* Additional user information */}
                        <div className="card-subtitle text-muted px-3 m-1"><span className="fw-semibold fs-6">Zone :</span> {zipcode}</div>
                    </div>
                </div>
                {/* Card body section */}
                <div className="card-body">
                    {/* Post text content */}
                    <div className="card-text text-left">
                        <p className="text-left">{text}</p>
                    </div>
                </div>
                {/* Card footer section */}
                <div className="card-footer">
                    {/* Action buttons for the post (Reply, Repost, Like, Share)
                        At this time, these are non-functional due to time restrictions. */}
                    <div className="btn card-link px-3">Reply</div>
                    <div className="btn card-link px-3">Repost</div>
                    <div className="btn card-link px-3">Like {likes ? (likes) : null}</div>
                    <div className="btn card-link px-3">Share</div>
                </div>
            </div>
        </>
    )
}
