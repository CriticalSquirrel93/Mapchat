import { Outlet } from "react-router-dom";
import { auth } from "../firebase";

export const Layout = () => {

    const user = auth.currentUser;

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className = "container-fluid">
                    <i className="bi bi-geo d-inline-block align-top"></i>
                    <a className="navbar-brand" href="/">
                        Mapchat
                    </a>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pricing</a>
                            </li>
                            <li className = "nav-item">
                                <a className = "nav-link" href = "#">Something Reactive</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className = "container-fluid">
                <div className = "row justify-content-center mt-3">
                    <div className= "col-md-4 text-center">
                        <p className = "lead">
                            React With Firebase Authentication
                        </p>
                    </div>
                    <Outlet />
                </div>
            </div>

            <footer className="text-center fixed-bottom py-3 bg-dark-subtle text-white">
                <p>&copy; 2023 Mapchat. All rights reserved.</p>
            </footer>
        </>
    )
}

