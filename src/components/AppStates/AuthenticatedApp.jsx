/*
Description:
    AuthenticatedApp component representing the main application for authenticated users.
    It uses React Router for navigation and includes routes for various application pages.

Usage:
    - This component is typically rendered when a user is authenticated.
    - Utilizes React Router for client-side navigation within the authenticated application.

Credit:
    * Ash
*/
// Import necessary dependencies from React and React Router
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import components for different pages within the application
import { Layout } from "../Layout";
import { Landing } from "../Landing";
import { Homepage } from "../Homepage";
import { Login } from "../Login";
import { ResetPassword } from "../ResetPassword";
import { Signup } from "../Signup";
import { Chat } from "../Chat";
import { Profile } from "../Profile";
import { NotFound } from "../NotFound";
import { Room } from "../Room";

// AuthenticatedApp component representing the main application for authenticated users
export const AuthenticatedApp = () => {
    return (
        <>
            <div className="App content-wrap">
                {/* Set up React Router for client-side navigation */}
                <Router>
                    <Routes>
                        {/* Route for the main layout */}
                        <Route path="/" element={<Layout />}>
                            {/* Index route for the landing page */}
                            <Route index element={<Landing />} />

                            {/* Routes for various pages in the authenticated application */}
                            <Route path="/home" element={<Homepage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/reset" element={<ResetPassword />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/chat" element={<Chat />} />
                            <Route path="/room" element={<Room />} />

                            {/* Route for handling 404 (Not Found) errors */}
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </>
    );
};
