import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export function ResetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { resetpass } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError("");
            setLoading(true);
            await resetpass(auth, email);
            setError("If an account for specified email exists, email will be sent shortly.");
            navigate("/login");

        } catch {
            setError("Please enter a valid email address.");
        }
        
        setLoading(false);
    };

    return (
        <div className = "container">
            <div className = "row justify-content-center">
                <form className = "col-md-4 mt-3 pt-3 pb-3">
                    { "" !== error &&
                        <div className = "alert alert-warning" role = "alert">
                            { error }
                        </div>
                    }
                    <div className = "form-floating mb-3">
                        <input id = "resetEmail" type = "email" className = "form-control" aria-describedby = "emailHelp" placeholder = "name@example.com" value = { email } onChange = { (e) => setEmail(e.target.value) }></input>
                        <label htmlFor = "resetEmail" className = "form-label">Email</label>
                    </div>
                    <div className = "d-grid">
                        <button disabled = { loading } type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => handleSubmit(e)}>Send Email</button>
                    </div>
                    <div className = "mt-3 text-center">
                        <span>Go back to login? <Link to = "/login">Click here.</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}