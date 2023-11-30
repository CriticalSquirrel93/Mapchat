/*
Description:
    404 Not Found page for when a user tries to access a non-existent page.
Usage:
    - Rendered when a user tries to access a non-existent page.
    - Provides a link to the home page and login page.
Credit:
    * Ash
*/
import React from "react";

export const NotFound = () => {
    return (
        <>
            {/* Container for centering content */}
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    {/* Display a large "404" heading */}
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3">
                        {/* Inform the user that the page is not found */}
                        <span className="text-danger">Oops!</span> Page not found.
                    </p>
                    <p className="lead">
                        {/* Provide a lead message about the non-existent page */}
                        The page you’re looking for doesn’t exist.
                    </p>
                    {/* Buttons for navigating home or logging in again */}
                    <a href="/" className="btn btn-primary mx-1">
                        Go Home
                    </a>
                    <a href="/login" className="btn btn-primary mx-1">
                        Login Again?
                    </a>
                </div>
            </div>
        </>
    );
};
