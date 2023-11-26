import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import {useEffect, useState} from "react";
import { useAuth } from "../hooks/useAuth";
import {getLocationData} from "../contexts/geocode";

export function PostBox() {

    const [postMessage, setPostMessage] = useState("");
    const [state, setState] = useState({
        loading: true,
        zip: false
    });
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            await getLocationData().then((result) => {
                setState({
                    loading: false,
                    zip: result.zipcode
                });
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
                verified: user.emailVerified,
                zipcode: state.zip,
                message: postMessage,
            })

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
                            Tweet
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}