import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Profile } from "./components/Profile";
import { ResetPassword } from "./components/ResetPassword";

function App() {

    const CollectionPublic = () => {
        return "Public Collection Content";
    }
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path = "/" element = { <Layout /> }>
                        <Route index element = { <Login /> } ></Route>
                        <Route path = "/reset" element = { <ResetPassword />} ></Route>
                        <Route path = "/signup" element = { <Signup /> } ></Route>
                        <Route path = "/profile" element = { <Profile /> } ></Route>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
