import "../styles/Sidebar.css";
import {useAuth} from "../hooks/useAuth";


export function Sidebar() {
    const { user } = useAuth();

    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary sidebar-main rounded shadow">
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="#" className="nav-link active" aria-current="page">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link link-body-emphasis">
                            Search
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link link-body-emphasis">
                            Notifications
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link link-body-emphasis">
                            Messages
                        </a>
                    </li>
                    <li>
                        <a href="/profile" className="nav-link link-body-emphasis">
                            Profile
                        </a>
                    </li>
                </ul>
                <hr/>
                <div className="dropdown">
                    <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/fallenadvent.png" alt="" width="32" height="32" className="rounded-circle me-2"></img>
                        <strong> @{ user.displayName } </strong>
                    </a>
                    <ul className="dropdown-menu text-small shadow">
                        <li><a className="dropdown-item" href="/profile">Settings</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                        </ul>
                    </div>
                    </div>
        </>
    )
}