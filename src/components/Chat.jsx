import { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../styles/Chat.css";

export const Chat = () => {

    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db,"messages")

    useEffect(() => {
        const queryMessages = query(messagesRef)
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});

            });
            setMessages(messages);
        });


        return () => unsubscribe();
    }, [messagesRef]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.email,
        });
    };

    return (
        <div className="chat-app">
            <div className="header">
                <h1> Welcome to:Mapchat</h1>
            </div>
            <div className="messages">
                {messages.map((message) => (
                    <div className="message" key={message.id}>
                        <span className="user"> {message.user} </span>
                        {message.text}
                    </div>
                    ))}
            </div>

            <form onSubmit={handleSubmit} className="new-message-form">
                <input
                    className="new-message-input"
                    placeholder="Type your message here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    );



};