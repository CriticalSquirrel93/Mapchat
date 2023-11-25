import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function PostBox() {

    const [postMessage, setPostMessage] = useState("");
    const [postImage, setPostImage] = useState("");
    const { user } = useAuth();

    const sendPost = async (e) => {
        e.preventDefault();

        try {
            // Use the 'collection' function and 'addDoc' function to add a document to the 'posts' collection
            await addDoc(collection(db, "posts"), {
                uid: user.email,
                displayName: user.displayName,
                verified: user.emailVerified,
                message: postMessage,
            })

            // Clear the input fields
            setPostMessage("");
            setPostImage("");
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
                        <input
                            value={postMessage}
                            className="form-control"
                            onChange={(e) => setPostMessage(e.target.value)}
                            placeholder="What's happening?"
                            type="textbox"
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