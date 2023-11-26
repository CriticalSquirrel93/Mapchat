import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NotFound} from "../NotFound";
import {AccessDenied} from "../AccessDenied";
import {Landing} from "../Landing";
import {Login} from "../Login";
import {ResetPassword} from "../ResetPassword";
import {Signup} from "../Signup";
import {Layout} from "../Layout";

export const UnauthenticatedApp = () => {
    return (
        <>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path = "/" element = { <Layout /> }>
                            <Route index element = { <Landing /> } ></Route>
                            <Route path = "/home" element = { <AccessDenied /> }></Route>
                            <Route path = "/login" element = { <Login /> }></Route>
                            <Route path = "/reset" element = { <ResetPassword />} ></Route>
                            <Route path = "/signup" element = { <Signup /> } ></Route>
                            <Route path = "/profile" element = { <AccessDenied /> } ></Route>
                            <Route path = "/chat" element = { <AccessDenied /> }></Route>
                            <Route path = "/room" element={ <AccessDenied />}></Route>
                            <Route path="*" element={ <NotFound />} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </>
    )
}