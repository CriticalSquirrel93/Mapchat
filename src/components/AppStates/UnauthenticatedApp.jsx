/*
Description:
    UnauthenticatedApp component representing the main application for unauthenticated users.
    It uses React Router for navigation and includes routes for various application pages.

Usage:
    - This component is typically rendered when a user is not authenticated.
    - Utilizes React Router for client-side navigation within the unauthenticated application.

Credit:
    * Ash
*/
// Import necessary dependencies from React and React Router
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import components for different pages within the application
import { NotFound } from "../NotFound";
import { AccessDenied } from "../AccessDenied";
import { Landing } from "../Landing";
import { Login } from "../Login";
import { ResetPassword } from "../ResetPassword";
import { Signup } from "../Signup";
import { Layout } from "../Layout";

// UnauthenticatedApp component representing the main application for unauthenticated users
export const UnauthenticatedApp = () => {
    return (
        <>
            <div className="App">
                {/* Set up React Router for client-side navigation */}
                <Router>
                    <Routes>
                        {/* Route for the main layout */}
                        <Route path="/" element={<Layout />}>
                            {/* Index route for the landing page */}
                            <Route index element={<Landing />} />

                            {/* Routes for various pages in the unauthenticated application */}
                            <Route path="/home" element={<AccessDenied />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/reset" element={<ResetPassword />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/profile" element={<AccessDenied />} />
                            <Route path="/chat" element={<AccessDenied />} />
                            <Route path="/room" element={<AccessDenied />} />

                            {/* Route for handling 404 (Not Found) errors */}
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </>
    );
};
