/*
Description:
    Signup component allowing users to create a new account with a unique display name, email, and password.
    Performs validation checks, including username uniqueness, before calling the signup function from useAuth.

Usage:
    - Rendered on the Signup page.
    - Uses Firebase authentication for user registration and manages user data in the Realtime Database.

Credit:
    * Chris for the initial version of this system in Django + Firebase setup we had.
    * Ash for porting it over to React + Firebase.
*/
// Import necessary dependencies from React and React Router
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import Firebase related functions and contexts
import { useAuth } from "../hooks/useAuth";
import { get, ref } from "firebase/database";
import { rdb } from "../firebase";

// Signup component for user registration
export const Signup = () => {
    // Initialize variables for state management and navigation
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const { signup } = useAuth();

    // Function to check if the username is unique in the Realtime Database
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

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            // Check if the username is unique and meets length requirements
            if (displayName.length >= 6 && displayName.length <= 20) {
                try {
                    setError("");
                    setLoading(true);

                    // Check if the username is unique
                    const isUsernameUnique = await checkUsername(displayName);

                    if (!isUsernameUnique) {
                        alert("Username already exists. Please choose a different one.");
                        return;
                    }

                    // Call the signup function from useAuth to create a new user
                    await signup(displayName, email, password);

                    // Navigate to the home page after successful signup
                    navigate("/home");
                    forceUpdate();
                } catch (err) {
                    setError("Sorry, something went wrong. Please try again.");
                    console.log(err.message);
                }
            }
        } else {
            setError("Passwords don't match. Please try again.");
        }

        setLoading(false);
    };

    // Render the Signup form
    return (
        <div className="container">
            <div className="row justify-content-center">
                <form className="col-md-4 mt-3 pt-3 pb-3">
                    {/* Display error message if there is an error */}
                    {"" !== error && (
                        <div className="alert alert-warning" role="alert">
                            {error}
                        </div>
                    )}

                    {/* Input field for display name */}
                    <div className="form-floating mb-3">
                        <input
                            id="signupDisplayName"
                            type="text"
                            className="form-control"
                            aria-describedby="displayNameHelp"
                            placeholder="Display Name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        ></input>
                        <label htmlFor="signupDisplayName" className="form-label">Display Name</label>
                    </div>

                    {/* Input field for email address */}
                    <div className="form-floating mb-3">
                        <input
                            id="signupEmail"
                            type="email"
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <label htmlFor="signupEmail" className="form-label">Email Address</label>
                    </div>

                    {/* Input field for password */}
                    <div className="form-floating mb-3">
                        <input
                            id="signupPassword"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        ></input>
                        <label htmlFor="signupPassword" className="form-label">Password</label>
                    </div>

                    {/* Input field for confirming password */}
                    <div className="form-floating mb-3">
                        <input
                            id="confirmPassword"
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        ></input>
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    </div>

                    {/* Button to submit the form */}
                    <div className="d-grid">
                        <button
                            disabled={loading}
                            type="submit"
                            className="btn btn-primary pt-3 pb-3"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Signup
                        </button>
                    </div>

                    {/* Link to go back to login page */}
                    <div className="mt-3 text-center">
                        <span>
                            Go back to login? <Link to="/login">Click here.</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};
