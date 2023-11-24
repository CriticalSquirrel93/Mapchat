import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            try {
                setError("");
                setLoading(true);
                await signup(email, password);
                navigate("/");
            } catch (err) {
                setError("Sorry, something went wrong. Please try again.");
                console.log(err.message);
            }
        } else {
            setError("Passwords don't match. Please try again.");
        }

        setLoading(false);
    };

    return(
        <div className = "container">
            <div className = "row justify-content-center">
                <form className = "col-md-4 mt-3 pt-3 pb-3">
                    { "" !== error &&
                        <div className = "alert alert-warning" role = "alert">
                            { error }
                        </div>
                    }
                    <div className = "form-floating mb-3">
                        <input id = "signupEmail" type = "email" className = "form-control" aria-describedby = "emailHelp" placeholder = "name@example.com" value = { email } onChange = { (e) => setEmail(e.target.value) }></input>
                        <label htmlFor = "signupEmail" className = "form-label">Enter an email address for your username</label>
                    </div>
                    <div className = "form-floating mb-3">
                        <input id = "signupPassword" type = "password" className = "form-control" placeholder = "Password" value = { password } onChange = { (e) => setPassword(e.target.value) }></input>
                        <label htmlFor = "signupPassword" className = "form-label">Password</label>
                    </div>
                    <div className = "form-floating mb-3">
                        <input id = "confirmPassword" type = "password" className = "form-control" placeholder = "Confirm Password" value = { confirmPassword } onChange = { (e) => setConfirmPassword(e.target.value) }></input>
                        <label htmlFor = "confirmPassword" className = "form-label">Confirm Password</label>
                    </div>
                    <div className = "d-grid">
                        <button disabled = { loading } type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => handleSubmit(e)}>Signup</button>
                    </div>
                    <div className = "mt-3 text-center">
                        <span>Go back to login? <Link to = "/login">Click here.</Link></span>
                    </div>
                </form>
            </div>
        </div>
        )
}