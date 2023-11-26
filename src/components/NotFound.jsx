import React from "react";

export const NotFound = () => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3"> <span className="text-danger">Oops!</span> Page not found.</p>
                    <p className="lead">
                        The page you’re looking for doesn’t exist.
                    </p>
                    <a href="/" className="btn btn-primary mx-1">Go Home</a>
                    <a href="/login" className="btn btn-primary mx-1">Login Again?</a>
                </div>
            </div>
        </>
    )
}
