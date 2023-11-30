/*
Description:
    This file contains the PostBox function which provides functionality for users to post to the feed
Credit:
    * Ash
 */
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import { db } from "../firebase";
import {useEffect, useState} from "react";
import { useAuth } from "../hooks/useAuth";
import {getLocationData} from "../contexts/geocode";

export function PostBox() {
    // Post message is the message to be posted, setPostMessage is the function to set the message
    const [postMessage, setPostMessage] = useState("");
    // state contains loading and zip, loading is true if loading, else false, zip contains user zipcode, else false
    const [state, setState] = useState({
        loading: true,
        zip: false
    });
    const { user } = useAuth(); // user object containing username, email, uid, etc.

    useEffect(() => { // occurs exactly once per PostBox call
        const fetchData = async () => { //get location data from getLocationData()
            await getLocationData().then((result) => {
                setState({
                    loading: false,
                    zip: result.zipcode
                }); // upon promise resolution update loading/zip
            });
        };

        fetchData().then(r => {
            console.log("Location data fetched.");
        });
    }, []);

    const sendPost = async (e) => {
        e.preventDefault();

        try {
            // Use the 'collection' function and 'addDoc' function to add a document to the 'posts' collection
            await addDoc(collection(db, "posts"), {
                uid: user.uid,
                createdAt: serverTimestamp(),
                verified: user.emailVerified,
                zipcode: state.zip,
                message: postMessage,
            }) // create a new collection in the database.

            // Clear the input fields
            setPostMessage("");
        } catch (error) {
            // Handle any potential errors here
            console.error("Error adding document: ", error);
        }
    };
    return (
        <>
            <div className="container shadow">
                <form>
                    <div className="input-group mb-3">
                        <textarea
                            value={postMessage}
                            className="form-control"
                            onChange={(e) => setPostMessage(e.target.value)}
                            placeholder="What's happening?"
                        />
                        <button onClick={(e) => sendPost(e)} type="submit" className="btn btn-primary">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}