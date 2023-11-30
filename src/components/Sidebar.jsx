/*
Description:
    Sidebar component for displaying navigation links and user profile information.
Usage:
    - Renders navigation links to Home, Local Chat, and Profile.
    - Displays the user's profile image, username, and provides a dropdown for settings and signing out.
Credit:
    - https://getbootstrap.com/docs/5.0/examples/sidebars/
    * Ash
*/
import "../styles/Sidebar.css";
import { useAuth } from "../hooks/useAuth";

// Sidebar component for displaying navigation links and user profile information.
export function Sidebar() {
    const { user, logout } = useAuth();

    return (
        <>
            {/* Main container for the sidebar */}
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary sidebar-main rounded shadow">
                {/* Navigation links */}
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="/home" className="nav-link active" aria-current="page">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/room" className="nav-link link-body-emphasis">
                            Local Chat
                        </a>
                    </li>
                    <li>
                        <a href="/profile" className="nav-link link-body-emphasis">
                            Profile
                        </a>
                    </li>
                </ul>
                {/* Horizontal line to separate navigation links and user profile */}
                <hr />
                {/* Dropdown for user profile information */}
                <div className="dropdown">
                    {/* Profile image, username, and dropdown toggle */}
                    <a
                        href="#"
                        className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img src={"https://github.com/" + user.displayName + ".png"} alt="" width="32" height="32" className="rounded-circle me-2"></img>
                        <strong> @{user.displayName} </strong>
                    </a>
                    {/* Dropdown menu with settings and sign out options */}
                    <ul className="dropdown-menu text-small shadow">
                        <li>
                            <a className="dropdown-item" href="/profile">
                                Settings
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <a className="dropdown-item" href="" onClick={logout}>
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
