import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail,
    signInWithEmailAndPassword, signOut } from "firebase/auth";
import {getLocationData} from "./geocode";

export const AuthContext = React.createContext(undefined);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [zipcode, setZipcode] = useState(undefined);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    async function login(email, password) {
        const user = await signInWithEmailAndPassword(auth, email, password);
        if (!user) {
            // TODO : Handle Failed Login
        }
        setUser(user);
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function updateEmail(email) {
        return user.updateEmail(email);
    }

    function updatePassword(password) {
        return user.updatePassword(password);
    }

    function getLocation() {
        return getLocationData();
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

    useEffect(() => {
       setZipcode(getLocation());
    });

    const value  = {
        user,
        zipcode,
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
