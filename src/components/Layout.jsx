import {Outlet} from "react-router-dom";

export const Layout = () => {
    return (
        <div className = "container-fluid">
            <div className = "row justify-content-center mt-3">
                <div className = "col-md-4 text-center">
                    <p className = "lead">
                        React With Firebase Authentication
                    </p>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

