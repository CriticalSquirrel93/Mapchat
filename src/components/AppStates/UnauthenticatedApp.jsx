import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {NotFound} from "../NotFound";
import {Landing} from "../Landing";
import {Login} from "../Login";
import {ResetPassword} from "../ResetPassword";
import {Signup} from "../Signup";
import {Layout} from "../Layout";

export const UnauthenticatedApp = () => {
    const  { login } = useAuth();

    return (
        <>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path = "/" element={ <Layout /> }>
                            <Route path="*" element={ <NotFound />} />
                            <Route index element = { <Landing /> } ></Route>
                            <Route path = "/login" element = { <Login /> }></Route>
                            <Route path = "/reset" element = { <ResetPassword />} ></Route>
                            <Route path = "/signup" element = { <Signup /> } ></Route>
                        </Route>
                    </Routes>
                </Router>
            </div>
        </>
    )
}