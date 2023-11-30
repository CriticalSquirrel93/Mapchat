/*
Description:
    ResetPassword component for resetting user passwords.
Usage:
    - Allows users to request a password reset by providing their email.
    - Displays an error message for invalid email addresses.
Credit:
    * Chris for the initial version of this system in Django + Firebase setup we had.
    * Ash for porting it over to React + Firebase.
*/

// Import necessary dependencies from React and React Router
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Import Firebase authentication and custom hook for user authentication
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";

// ResetPassword component for resetting user password
export function ResetPassword() {
    // Initialize the navigate function from React Router
    const navigate = useNavigate();

    // State variables for email, error messages, and loading status
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Custom hook for user authentication
    const { resetpass } = useAuth();

    // Handle form submission to reset user password
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            // Call the resetpass function to send a password reset email
            await resetpass(auth, email);
            setError("If an account for the specified email exists, an email will be sent shortly.");
            // Redirect to the login page
            navigate("/login");

        } catch {
            setError("Please enter a valid email address.");
        }

        setLoading(false);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                {/* Reset password form */}
                <form className="col-md-4 mt-3 pt-3 pb-3">
                    {/* Display error message if there is an error */}
                    {"" !== error && (
                        <div className="alert alert-warning" role="alert">
                            {error}
                        </div>
                    )}
                    {/* Email input */}
                    <div className="form-floating mb-3">
                        <input
                            id="resetEmail"
                            type="email"
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <label htmlFor="resetEmail" className="form-label">
                            Email
                        </label>
                    </div>
                    {/* Submit button */}
                    <div className="d-grid">
                        <button
                            disabled={loading}
                            type="submit"
                            className="btn btn-primary pt-3 pb-3"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Send Email
                        </button>
                    </div>
                    {/* Link to login page */}
                    <div className="mt-3 text-center">
                        <span>
                            Go back to login? <Link to="/login">Click here.</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
