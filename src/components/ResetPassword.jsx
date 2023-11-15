import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export function ResetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [notice, setNotice] = useState("");

    const sendResetEmail = async (e) => {
        e.preventDefault()

        try {
            await sendPasswordResetEmail(auth, email);
            setNotice("If an account for specified email exists, email will be sent shortly.");

        } catch {
            setNotice("Please enter a valid email address.");
        }
    };

    return (
        <div className = "container">
            <div className = "row justify-content-center">
                <form className = "col-md-4 mt-3 pt-3 pb-3">
                    { "" !== notice &&
                        <div className = "alert alert-warning" role = "alert">
                            { notice }
                        </div>
                    }
                    <div className = "form-floating mb-3">
                        <input id = "resetEmail" type = "email" className = "form-control" aria-describedby = "emailHelp" placeholder = "name@example.com" value = { email } onChange = { (e) => setEmail(e.target.value) }></input>
                        <label htmlFor = "resetEmail" className = "form-label">Email</label>
                    </div>
                    <div className = "d-grid">
                        <button type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => sendResetEmail(e)}>Send Email</button>
                    </div>
                    <div className = "mt-3 text-center">
                        <span>Go back to login? <Link to = "/">Click here.</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}