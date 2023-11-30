/*
    Description:
        Collects messages for the appropriate location-based feed and displays them.
    Credit:
        * Ash
*/
// Import necessary dependencies from Firebase and React
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { PostBox } from "./PostBox";
import { Post } from "./Post";

// Functional component representing a feed of posts
export function Feed() {
    // State variable to store an array of posts retrieved from Firebase
    const [posts, setPosts] = useState([]);

    // Define a Firestore query to get posts sorted by timestamp in descending order
    const queryPosts = query(
        collection(db, "posts/"),
        orderBy("createdAt", "desc"),
    );

    // Effect hook to subscribe to changes in the posts collection and update state
    useEffect(() => {
        // Subscribe to the snapshot of the posts query
        const unsubscribe = onSnapshot(queryPosts, (snapshot) => {
            const postArray = [];

            // Iterate through the documents in the snapshot and push data to the postArray
            snapshot.forEach((doc) => {
                postArray.push(doc.data());
            });

            // Update the state with the collected postArray
            setPosts(postArray);
        });

        return () => {
            // Unsubscribe from the snapshot listener when the component unmounts
            unsubscribe();
        };
    }, []);

    // Render the feed with a PostBox and mapped Post components for each post
    return (
        <>
            <div className="container-fluid">
                <div className="feed">
                    {/* Component for creating new posts */}
                    <PostBox />

                    {/* Map through posts and render Post components with relevant data */}
                    {posts.map((post) => (
                        <Post
                            key={post.id} // Ensure each Post has a unique key
                            posterId={post.uid}
                            verified={post.verified}
                            zipcode={post.zipcode}
                            text={post.message}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
