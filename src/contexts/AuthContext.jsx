import React, { useEffect, useState } from "react";
import { auth,
    registerWithEmailAndPassword,
    logInWithEmailAndPassword,
    sendPasswordReset,
    logoutFirebase } from "../firebase";

export const AuthContext = React.createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function signup(name, email, password) {
        return await registerWithEmailAndPassword(name, email, password);
    }

    async function login(email, password) {
        const user = await logInWithEmailAndPassword(email, password);
        setUser(user);
    }

    async function logout() {
        return logoutFirebase();
    }

    function resetPassword(email) {
        return sendPasswordReset(email);
    }

    function updateEmail(email) {
        return user.updateEmail(email);
    }

    function updatePassword(password) {
        return user.updatePassword(password);
    }

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });
    });

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user);
        });
    });

    const value  = {
        user,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    }

    return (
        <AuthContext.Provider value = { value }>
            { !loading && children }
        </AuthContext.Provider>
    )
}
