import React from "react";
import './App.css';
import { AuthenticatedApp } from "./components/AppStates/AuthenticatedApp";
import { UnauthenticatedApp } from "./components/AppStates/UnauthenticatedApp";
import { useAuth } from "./contexts/AuthContext";

function App() {
    const { currentUser } = useAuth();

    return currentUser ? <AuthenticatedApp/> : <UnauthenticatedApp/>;
}

export default App;
