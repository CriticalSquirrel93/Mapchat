import React from "react";

export const AccessDenied = () => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">403</h1>
                    <p className="fs-3"> <span className="text-danger">Oops!</span> Access Denied.</p>
                    <p className="lead">
                        Looks like you need to be logged in to access that page.
                    </p>
                    <a href="/" className="btn btn-primary mx-1">Go Home</a>
                    <a href="/login" className="btn btn-primary mx-1">Login</a>
                </div>
            </div>
        </>
    )
}