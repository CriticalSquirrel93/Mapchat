import React from "react";
import './App.css';
import { AuthenticatedApp } from "./components/AppStates/AuthenticatedApp";
import { UnauthenticatedApp } from "./components/AppStates/UnauthenticatedApp";
import { useAuth } from "./hooks/useAuth";

function App() {
    const { user } = useAuth();

    return user ? <AuthenticatedApp/> : <UnauthenticatedApp/>;
}

export default App;
