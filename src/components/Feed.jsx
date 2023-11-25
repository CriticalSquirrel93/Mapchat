import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";
import {useEffect, useState} from "react";
import {PostBox} from "./PostBox";
import {Post} from "./Post";

export function Feed() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
            const postArray = [];
            snapshot.forEach((doc) => {
                postArray.push(doc.data());
            });
            setPosts(postArray);
        });

        return () => {
            // Unsubscribe from the snapshot listener when the component unmounts.
            unsubscribe();
        };
    }, []);


    return (
        <>
            <div className="container-fluid">
                <div className="feed">
                    <PostBox />
                    {posts.map((post) => (
                        <Post
                            displayName={post.displayName}
                            username={post.username}
                            verified={post.verified}
                            text={post.message}
                            likes={post.likes}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}