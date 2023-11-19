import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { auth, rdb } from "../firebase";
import { ref, update, onValue } from "firebase/database"
import { signOut } from "firebase/auth";
import "../styles/Profile.css";
import { Checkbox } from "./Checkbox";

export const Profile = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const [checked, setChecked] = useState(false);
    // [username, setUsername] = useState('');

    function handleChange(e) {
        setChecked(e.target.checked);

        update(ref(rdb, 'Data/Users/' + user.uid + '/Settings/'), {
            [e.target.id]: e.target.checked
        }).then(r => {
        })
    }

    // Example of a listener for if the user's auth state changes.
    auth.onAuthStateChanged(function (user) {
        if (user) {

        }
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        await signOut(auth);
        navigate("/login");
    }

    const updateSettingsRender = (targetElement, data) => {
        targetElement.checked = data[targetElement.id];
    }

    useEffect(() => {
        onValue(ref(rdb, 'Data/Users/' + user.uid + '/Settings/'), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // This is a really bad way of doing this. But for the immediate moment it works.
                // Ideally we would have a way to itterate through all settings & fire this off for each one when the page loads the first time.
                updateSettingsRender(document.getElementById('dark'), data);
                updateSettingsRender(document.getElementById('location'), data);
                updateSettingsRender(document.getElementById('business'), data);
                updateSettingsRender(document.getElementById('display'), data);
            } else {
                console.log("Snapshot data did not exist for Account Settings.");
            }
        })
    },[user.uid])

    return(
        <>
            <div className = "container">
                <div className = "row justify-content-center">
                    <div className = "col-md-4 text-center">
                        <p>Welcome <em className = "text-decoration-underline">{ user.email }</em>. You are logged in!</p>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="uname">@</span>
                            <input type="text" className="form-control" id="username-change-input" placeholder={ user.displayName } aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder={ user.email } aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                            <span className="input-group-text" id="basic-addon2">@example.com</span>
                        </div>
                        <Checkbox id="dark" label={"Dark Mode"} onChange={(e) => handleChange(e)} className="toggle" />
                        <Checkbox id="location" label={"Chat Locally?"} onChange={(e) => handleChange(e)} className="toggle" />
                        <Checkbox id="business" label={"Business?"} onChange={(e) => handleChange(e)} className="toggle" />
                        <Checkbox id="display" label={"Display Location?"} onChange={(e) => handleChange(e)} className="toggle" />
                        <div className = "d-grid gap-2 px-1">
                            <button type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => handleSubmit(e)}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>




    )






}



export default Profile