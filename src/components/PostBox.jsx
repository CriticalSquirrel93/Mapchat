import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useState } from "react";

export function PostBox() {

    const [postMessage, setPostMessage] = useState("");
    const [postImage, setPostImage] = useState("");
    const currentUser = auth.currentUser;

    const sendPost = async (e) => {
        e.preventDefault();

        try {
            // Use the 'collection' function and 'addDoc' function to add a document to the 'posts' collection
            await addDoc(collection(db, "posts"), {
                username: currentUser.email,
                displayName: currentUser.displayName,
                verified: currentUser.emailVerified,
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
            <div className="tweetBox">
                <form>
                    <div className="input-group">
                        <input
                            value={postMessage}
                            onChange={(e) => setPostMessage(e.target.value)}
                            placeholder="What's happening?"
                            type="text"
                        />
                    </div>
                    <button onClick={(e) => sendPost(e)} type="submit" className="btn btn-primary">
                        Tweet
                    </button>
                </form>
            </div>
        </>
    )
}