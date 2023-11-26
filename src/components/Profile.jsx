import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { rdb } from "../firebase";
import { updateProfile } from "firebase/auth";
import { ref, update, onValue, get } from "firebase/database";
import "../styles/Profile.css";
import { Checkbox } from "./Checkbox";
import { useAuth } from "../hooks/useAuth";


/**
 * Most of the content for this page was originally written by Chris when we were on the Django+Firebase system.
 * It was ported/adapted to better take advantage of React's more OOP based features when we made the switch over.
 * **/

 export const Profile = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [checked, setChecked] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');

    const handleCheckboxChange = (e) => {
        // Set the checkbox boolean
        setChecked(e.target.checked);

        // Update the setting in the firebase db.
        update(ref(rdb, 'Data/Users/' + user.uid + '/Settings/'), {
            [e.target.id]: e.target.checked
        }).then(r => {
            // Do nothing. We don't need to respond to this.
        })
    }

    const handleUserOnChange = (e) => {
        setUsername(e.target.value);
    }

    const checkUsername = async (username) => {
        const usernamesRef = ref(rdb, 'Data/Usernames/');
        const usernamesSnapshot = await get(usernamesRef);

        if (usernamesSnapshot.exists()) {
            const usernamesData = usernamesSnapshot.val();
            const usernames = Object.values(usernamesData);

            // Check if the new username already exists
            return !usernames.includes(username);
        }

        return true; // If the node doesn't exist, the username is unique.
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.length >= 6 && username.length <= 20 && username !== user.displayName && username !== null)
        {
            try {
                setError('');
                setLoading(true);
                // Get the new username from the form
                const newUsername = username

                // Check if the new username is unique
                const isUsernameUnique = await checkUsername(newUsername);

                if (!isUsernameUnique) {
                    alert("Username already exists. Please choose a different one.");
                    return;
                }

                // Update the username in the firebase db.
                updateProfile(user, {
                    displayName: newUsername,
                }).then(() => {
                    // Update the username in the Data/Usernames/ node
                    update(ref(rdb, 'Data/Usernames/'), {
                        [user.uid]: newUsername,
                    });

                    alert("Username updated successfully.");
                }).catch((error) => {
                    alert(error);
                });
                navigate("/home");
            } catch (err) {
                setError("Sorry, something went wrong. Please try again.");
                console.log(err.message);
            }
        } else {
            setError("Please enter a valid username.");

        }
        setLoading(false);
        forceUpdate();
    };


    const handleLogout = async (e) => {
        e.preventDefault();

        await logout();
        navigate('/login');
    }

    const updateSettingsRender = (targetElement, data) => {
        targetElement.checked = data[targetElement.id];
    }

    useEffect(() => {
        onValue(ref(rdb, 'Data/Users/' + user.uid + '/Settings/'), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log(data);
                let mode = ((data['dark']) ? 'dark' : 'light');
                // This is a really bad way of doing this. But for the immediate moment it works.
                // Ideally we would have a way to iterate through all settings & fire this off for each one when the page loads the first time.
                updateSettingsRender(document.getElementById('dark'), data);
                updateSettingsRender(document.getElementById('location'), data);
                updateSettingsRender(document.getElementById('business'), data);
                updateSettingsRender(document.getElementById('display'), data);

                // Move this into it's own component, Load that component on each page.
                document.documentElement.setAttribute('data-bs-theme', mode);
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
                        <p>Welcome <em className = "text-decoration-underline">{ user.displayName }</em>. You are logged in!</p>
                        { "" !== error &&
                            <div className = "alert alert-warning" role = "alert">
                                { error }
                            </div>
                        }
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="uname">@</span>
                            <input type="text" className="form-control"
                                   id="username-change-input"
                                   placeholder={ user.displayName }
                                   aria-label="Username"
                                   onChange={(e) => handleUserOnChange(e)}></input>
                            <button type = "submit"
                                    className = "btn btn-primary"
                                    onClick = {(e) => handleSubmit(e)}>Submit</button>
                        </div>

                        <Checkbox id="dark"
                                  label={"Dark Mode"}
                                  onChange={(e) => handleCheckboxChange(e)}
                                  className="toggle" />
                        <Checkbox id="location"
                                  label={"Chat Locally?"}
                                  onChange={(e) => handleCheckboxChange(e)}
                                  className="toggle" />
                        <Checkbox id="business"
                                  label={"Business?"}
                                  onChange={(e) => handleCheckboxChange(e)}
                                  className="toggle" />
                        <Checkbox id="display"
                                  label={"Display Location?"}
                                  onChange={(e) => handleCheckboxChange(e)}
                                  className="toggle" />

                        <div className = "d-grid gap-2 px-1">
                            <button type = "submit" className = "btn btn-primary pt-3 pb-3"
                                    onClick = {(e) => handleLogout(e)}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Profile