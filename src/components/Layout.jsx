import { Outlet} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Layout = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async (e) => {
        e.preventDefault();

        await logout();
        navigate("/login");
    }

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
                                <a className="nav-link active" aria-current="page" href={ user ? "/home" : "/" }>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/chat">Chat</a>
                            </li>
                            <li className = "nav-item">
                                <a className = "nav-link" href = { user ? "/profile" : "/login" }> { user ? "Profile" : "Profile" } </a>
                            </li>
                            <li className = "nav-item">
                                <a className = "nav-link" href = { user ? (e) => handleLogout(e) : "/login" }> { user ? "Logout" : "Login" } </a>
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

