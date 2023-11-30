/*
Description:
    Profile component providing user-specific settings and options for customization.
    Allows users to update their username, toggle settings, and log out.

Usage:
    - Rendered on the Profile page.
    - Utilizes Firebase for user authentication and Realtime Database for storing user settings.

Credit:
    * Original content authored by Chris in Django + Firebase
    * Ported to React + Firebase by Ash
    * Some parts were adapted from the following tutorial: https://www.youtube.com/watch?v=PKwu15ldZ7k
*/
// Import necessary dependencies from React and Firebase
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { rdb } from "../firebase";
import { updateProfile } from "firebase/auth";
import { ref, update, onValue, get } from "firebase/database";
import "../styles/Profile.css";
import { Checkbox } from "./Checkbox";
import { useAuth } from "../hooks/useAuth";

// Profile component for user-specific settings and customization
export const Profile = () => {
    // Initialize variables for state management, navigation, and authentication
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    // State variables for checkbox status, error messages, loading state, and username input
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');

    // Function to handle checkbox changes and update settings in the database
    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked);

        // Update the setting in the Firebase database
        update(ref(rdb, 'Data/Users/' + user.uid + '/Settings/'), {
            [e.target.id]: e.target.checked
        }).then(() => {
            // Do nothing. No need to respond to this.
        });
    }

    // Function to handle username input changes
    const handleUserOnChange = (e) => {
        setUsername(e.target.value);
    }

    // Function to check if a username is unique in the Realtime Database
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

    // Function to handle the form submission for updating the username
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.length >= 6 && username.length <= 20 && username !== user.displayName && username !== null) {
            try {
                setError('');
                setLoading(true);

                // Get the new username from the form
                const newUsername = username;

                // Check if the new username is unique
                const isUsernameUnique = await checkUsername(newUsername);

                if (!isUsernameUnique) {
                    alert("Username already exists. Please choose a different one.");
                    return;
                }

                // Update the username in the Firebase database
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

    // Function to handle user logout
    const handleLogout = async (e) => {
        e.preventDefault();

        await logout();
        navigate('/login');
    }

    // Function to update the rendering of settings based on snapshot data
    const updateSettingsRender = (targetElement, data) => {
        targetElement.checked = data[targetElement.id];
    }

    // Effect to listen for changes in user settings and update the rendering
    useEffect(() => {
        onValue(ref(rdb, 'Data/Users/' + user.uid + '/Settings/'), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log(data);
                let mode = ((data['dark']) ? 'dark' : 'light');

                // Update the rendering of each setting based on snapshot data
                updateSettingsRender(document.getElementById('dark'), data);
                updateSettingsRender(document.getElementById('location'), data);
                updateSettingsRender(document.getElementById('business'), data);
                updateSettingsRender(document.getElementById('display'), data);

                // Move this into its own component, load that component on each page.
                document.documentElement.setAttribute('data-bs-theme', mode);
            } else {
                console.log("Snapshot data did not exist for Account Settings.");
            }
        })
    }, [user.uid])

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                        {/* Display a welcome message with the user's display name */}
                        <p>Welcome <em className="text-decoration-underline">{user.displayName}</em>. You are logged in!</p>

                        {/* Display an error message if it exists */}
                        {"" !== error && (
                            <div className="alert alert-warning" role="alert">
                                {error}
                            </div>
                        )}

                        {/* Form for updating the username */}
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="uname">@</span>
                            <input
                                type="text"
                                className="form-control"
                                id="username-change-input"
                                placeholder={user.displayName}
                                aria-label="Username"
                                onChange={(e) => handleUserOnChange(e)}
                            ></input>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Submit
                            </button>
                        </div>

                        {/* Checkbox components for various settings */}
                        <Checkbox
                            id="dark"
                            label={"Dark Mode"}
                            onChange={(e) => handleCheckboxChange(e)}
                            className="toggle"
                        />
                        <Checkbox
                            id="location"
                            label={"Chat Locally?"}
                            onChange={(e) => handleCheckboxChange(e)}
                            className="toggle"
                        />
                        <Checkbox
                            id="business"
                            label={"Business?"}
                            onChange={(e) => handleCheckboxChange(e)}
                            className="toggle"
                        />
                        <Checkbox
                            id="display"
                            label={"Display Location?"}
                            onChange={(e) => handleCheckboxChange(e)}
                            className="toggle"
                        />

                        {/* Button for user logout */}
                        <div className="d-grid gap-2 px-1">
                            <button
                                type="submit"
                                className="btn btn-primary pt-3 pb-3"
                                onClick={(e) => handleLogout(e)}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;