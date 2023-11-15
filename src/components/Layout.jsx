import { Link, Outlet } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export const Layout = () => {

    const { currentUser, logout } = useAuth();

    auth.onAuthStateChanged((user) => {
        if (user !== null) {
            let displayName = user.displayName;
            let email = user.email;
            let photoURL = user.photoURL;
            let emailVerified = user.emailVerified;
            let uid = user.uid;
        }
    });


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className = "container-fluid">
                    <i className="bi bi-geo d-inline-block align-top px-1" style={{fontSize: 1.25 + 'rem'}}></i>
                    <a className="navbar-brand" href="/">
                        MapChat
                    </a>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact</a>
                            </li>
                            <li className = "nav-item">
                                <a className = "nav-link"> { currentUser ? currentUser.email : <Link to = "./login">Login</Link> } </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className = "container-fluid">
                <div className = "row justify-content-center mt-3">
                    <Outlet />
                </div>
            </div>

            <footer className="text-center fixed-bottom py-3 bg-dark-subtle text-white">
                <p>&copy; 2023 MapChat. All rights reserved.</p>
            </footer>
        </>
    )
}

