import React, {useContext, useEffect, useState} from "react";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {getLocationData} from "./geocode";

const AuthContext = React.createContext(undefined);

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider ({ children }) {

    const [currentUser, setCurrentUser] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [zipcode, setZipcode] = useState(undefined);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    function getLocation() {
        return getLocationData();
    }

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
    },[]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
    }, []);

    useEffect(() => {
       setZipcode(getLocation());
    })

    const value  = {
        currentUser,
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
