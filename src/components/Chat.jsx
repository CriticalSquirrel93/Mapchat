import { useState, useEffect } from 'react';
import {
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy
} from "firebase/firestore";
import {auth, db, rdb} from "../firebase";
import "../styles/Chat.css";
import {where} from "firebase/firestore"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {onValue, ref} from "firebase/database";

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
                    setUsername(auth.currentUser.email);
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
            user: auth.currentUser.email,
            username,
            room
        });
        setNewMessage("");
    };

    return (
        <div className="chat-app">
            <div className="header">
                <h1>Welcome to: {room}</h1>
            </div>
            <div className="messages">
                {messages.map((message) => (
                    <div className="message" key={message.id}>
                        <span className="text-white-50 user"> {message.username} </span>
                        {message.text}
                    </div>
                    ))}
            </div>

            <form onSubmit={handleSubmit} className="new-message-form">
                <input
                    className="new-message-input"
                    placeholder="Type your message here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    );

};