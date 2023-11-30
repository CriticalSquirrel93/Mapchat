/*
Description:
    Login component for user authentication.
Usage:
    - Allows users to log in with their email and password.
    - Redirects to the homepage if the user is already logged in.
Credit:
    * Chris for the initial version of this system in Django + Firebase setup we had.
    * Ash for porting it over to React + Firebase.
*/
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

//Login component for user authentication.
export const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, login } = useAuth();

    // Redirect user to home page if they are already logged in.
    useEffect(() => {
        if (loading) {
            // Maybe trigger a loading screen.
            return;
        }
        if (user) navigate("/home");
    }, [user, loading]);


    // Handle form submission to log in the user.
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(email, password);
            navigate('/home');
        } catch (err) {
            setError("Invalid User Credentials, Please try again.");
            console.log(err.message);
        }

        setLoading(false);
    };

    return (
        <>
            {/* Container for login content */}
            <div className="container">
                <div className="row justify-content-center">
                    {/* Login form */}
                    <form className="col-md-4 mt-3 pt-3 pb-3">
                        {/* Display error message if there is an authentication error */}
                        {"" !== error && (
                            <div className="alert alert-warning" role="alert">
                                {error}
                            </div>
                        )}
                        {/* Email input */}
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email address
                            </label>
                        </div>
                        {/* Password input */}
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password
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
                                Submit
                            </button>
                        </div>
                        {/* Link to signup page */}
                        <div className="mt-3 text-center">
                            <span>
                                Need to sign up for an account? <Link to="/signup">Click here.</Link>
                            </span>
                        </div>
                        {/* Link to password reset page */}
                        <div className="mt-2 text-center">
                            <span>
                                Password Reset <Link to="/reset">Click here.</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
