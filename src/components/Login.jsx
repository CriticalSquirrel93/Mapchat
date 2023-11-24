import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(email, password);
            navigate('/profile');
        } catch (err) {
            setError("Invalid User Credentials, Please try again.");
            console.log(err.message);
        }

        setLoading(false);
    }


    return (
        <>
            <div className = "container">
                <div className = "row justify-content-center">
                    <form className = "col-md-4 mt-3 pt-3 pb-3">
                        { "" !== error &&
                            <div className = "alert alert-warning" role = "alert">
                                { error }
                            </div>
                        }
                        <div className = "form-floating mb-3">
                            <input type = "email" className = "form-control" id = "exampleInputEmail1" aria-describedby = "emailHelp" placeholder = "name@example.com" value = { email } onChange = { (e) => setEmail(e.target.value) }></input>
                            <label htmlFor = "exampleInputEmail1" className = "form-label">Email address</label>
                        </div>
                        <div className = "form-floating mb-3">
                            <input type = "password" className = "form-control" id = "exampleInputPassword1" placeholder = "Password" value = { password } onChange = { (e) => setPassword(e.target.value) }></input>
                            <label htmlFor = "exampleInputPassword1" className = "form-label">Password</label>
                        </div>
                        <div className = "d-grid">
                            <button disabled = { loading } type="submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => handleSubmit(e)}>Submit</button>
                        </div>
                        <div className = "mt-3 text-center">
                            <span>Need to sign up for an account? <Link to = "/signup">Click here.</Link></span>
                        </div>
                        <div className = "mt-2 text-center">
                            <span>Password Reset <Link to = "/reset">Click here.</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}