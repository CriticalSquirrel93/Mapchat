import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export const Profile = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    // Example of a listener for if the user's auth state changes.
    auth.onAuthStateChanged(function (user) {
        if (user) {
            // Do nothing
        } else {
            navigate("/");
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signOut(auth);
        navigate("/login");
    }

    return(
        <>
            <div className = "container">
                <div className = "row justify-content-center">
                    <div className = "col-md-4 text-center">
                        <p>Welcome <em className = "text-decoration-underline">{ user.email }</em>. You are logged in!</p>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">@</span>
                            <input type="text" className="form-control" placeholder={ user.displayName } aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder={ user.email } aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                            <span className="input-group-text" id="basic-addon2">@example.com</span>
                        </div>
                        <div className="input-group mb-3">
                            <input type="checkbox" id="Dark" className="toggle"></input>
                            <label htmlFor="Dark">Dark Mode</label>
                        </div>
                        <div className="input-group mb-3">
                            <input type="checkbox" id="Dark" className="toggle"></input>
                            <label htmlFor="Dark">Business</label>
                        </div>
                        <div className="input-group mb-3">
                            <input type="checkbox" id="A" className="toggle"></input>
                            <label htmlFor="A">An "A" for a pizza?</label>
                        </div>




                        <div className = "d-grid gap-2">
                            <button type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => handleSubmit(e)}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>




    )






}



export default Profile