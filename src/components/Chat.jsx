/*
Credit:
    * https://www.youtube.com/watch?v=0gLr-pBIPhI&ab_channel=PedroTech
    * Cole (Built out general chat functionality)
    * Nico (Implemented rooms based on location)
 */

import { useState, useEffect } from 'react';
import {
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy
} from "firebase/firestore";
import { db, rdb } from "../firebase";
import "../styles/Chat.css";
import { where } from "firebase/firestore"
import { useAuth } from "../hooks/useAuth";
import { onValue, ref } from "firebase/database";
import { Sidebar } from "./Sidebar";
import ReactScrollableFeed from "react-scrollable-feed";

export const Chat = (props) => {
    const {room} = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");

    const { user } = useAuth();


    useEffect(() => {
        if (user) {
            onValue(ref(rdb, 'Data/Usernames/' + user.uid + '/'), (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUsername(data);

                } else {
                    setUsername(user.email);
                }
            })
        }
    },[user])

    const messagesRef = collection(db,"messages/");

    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            where("room", "==",room),
            orderBy("createdAt")
            );
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});

            });
            setMessages(messages);
        });


        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: user.uid,
            username,
            room
        });
        setNewMessage("");
    };


    return (
        <>
            <div className="container">
                <div className="container">
                    <div className="row">
                        <div className="col col-3">
                            <Sidebar />
                        </div>
                        <div className="col col-9">
                            <div className="card shadow chat-app">
                                <div className="card-header">
                                    <span className="card-title fw-semibold fs-2">Now Chatting with {room}</span>
                                </div>
                                <div className="card-body messages justify-content-evenly" style={{height: 50 + 'vh'}}>
                                    <ReactScrollableFeed>
                                        {messages.map((message) => (
                                            <div className="message mb-1" key={message.id}>
                                                <span className="text-white-50 mx-2 user"> {message.username} </span>
                                                {message.text}
                                            </div>
                                        ))}
                                    </ReactScrollableFeed>
                                </div>

                                <div className="card-footer">
                                    <form onSubmit={(e) => handleSubmit(e)} className="input-group p-3">
                                        <input type="text" className="form-control" id="newMessage" value={newMessage}
                                            placeholder="Type your message here..."
                                            onChange={(e) => setNewMessage(e.target.value)}
                                        />
                                        <button type="submit"
                                                className="btn shadow btn-primary">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};