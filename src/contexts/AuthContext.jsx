/*
Description:
    AuthProvider component that manages user authentication state using Firebase.
    It provides authentication-related functions and user data through the AuthContext.

Usage:
    - Wrap the root of the application with AuthProvider to enable authentication functionality.
    - Access authentication state and functions in child components using the AuthContext.

Credit:
    * Ash
*/
// Import necessary dependencies from React and Firebase
import React, { useEffect, useState } from "react";
import {
    auth,
    registerWithEmailAndPassword,
    logInWithEmailAndPassword,
    sendPasswordReset,
    logoutFirebase
} from "../firebase";

// Create an AuthContext for managing authentication state
export const AuthContext = React.createContext(undefined);

// AuthProvider component manages user authentication state and functions
export const AuthProvider = ({ children }) => {
    // State variables for user data and loading status
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Asynchronous function to register a new user with Firebase
    async function signup(name, email, password) {
        return await registerWithEmailAndPassword(name, email, password);
    }

    // Asynchronous function to log in an existing user with Firebase
    async function login(email, password) {
        const user = await logInWithEmailAndPassword(email, password);
        setUser(user);
    }

    // Asynchronous function to log out the currently authenticated user
    async function logout() {
        return logoutFirebase();
    }

    // Function to send a password reset email to the provided email address
    function resetPassword(email) {
        return sendPasswordReset(email);
    }

    // Function to update the email address associated with the current user
    function updateEmail(email) {
        return user.updateEmail(email);
    }

    // Function to update the password associated with the current user
    function updatePassword(password) {
        return user.updatePassword(password);
    }

    // Effect hook to set up a listener for changes in authentication state
    useEffect(() => {
        // Subscribe to the onAuthStateChanged event and update user and loading state
        return auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    // Set up an additional effect to update the user state on any auth state change
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user);
        });
    });

    // Context value containing user data and authentication functions
    const value = {
        user,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    };

    // Render the AuthProvider with the AuthContext.Provider and children
    return (
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    );
};
