import {collection, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {db} from "../firebase";
import {useEffect, useState} from "react";
import {PostBox} from "./PostBox";
import {Post} from "./Post";

export function Feed() {

    const [posts, setPosts] = useState([]);
    const queryPosts = query(
        collection(db,"posts/"),
        orderBy("createdAt", "desc"),
    );

    useEffect(() => {
        const unsubscribe = onSnapshot(queryPosts, (snapshot) => {
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
                            posterId={post.uid}
                            verified={post.verified}
                            zipcode={post.zipcode}
                            text={post.message}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}