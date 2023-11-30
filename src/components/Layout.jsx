/*
Description:
    Layout component for rendering the overall structure of the application, including navigation bar, main content, and footer.
Usage:
    - Provides a consistent layout for different sections of the application.
    - Renders navigation links based on user authentication status.
Credit:
    * Ash for main layout
    * Chris for logout functionality
*/
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { rdb } from "../firebase";

// Layout component for rendering the overall structure of the application.
export const Layout = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // Handle logout action.
    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate("/login");
    };

    // Listen for changes in user settings and update theme accordingly.
    useEffect(() => {
        if (user) {
            onValue(ref(rdb, 'Data/Users/' + user.uid + '/Settings/'), (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    let mode = data['dark'] ? 'dark' : 'light';

                    document.documentElement.setAttribute('data-bs-theme', mode);
                } else {
                    console.log("Snapshot data did not exist for Account Settings.");
                }
            });
        }
    }, [user]);

    return (
        <>
            {/* Navigation bar */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    {/* Application logo */}
                    <i className="bi bi-geo d-inline-block align-top px-1" style={{ fontSize: 1.25 + 'rem' }}></i>
                    <a className="navbar-brand" href="/">
                        MapChat
                    </a>
                    {/* Navigation links */}
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href={user ? "/home" : "/"}>
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={user ? "/room" : "/login"}>
                                    Chat
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={user ? "/profile" : "/login"}>
                                    {user ? user.displayName : "Profile"}
                                </a>
                            </li>
                            <li className="nav-item">
                                {/* Conditional rendering of login/logout link */}
                                <Link className="nav-link" to="/login" onClick={(e) => handleLogout(e)} style={{ cursor: 'pointer' }}>
                                    {user ? "Logout" : "Login"}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <div className="container-fluid">
                <div className="row justify-content-center mt-3">
                    {/* Render child components based on route */}
                    <Outlet />
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center fixed-bottom py-3 bg-dark-subtle text-white">
                <p>&copy; 2023 MapChat. All rights reserved.</p>
            </footer>
        </>
    );
};
