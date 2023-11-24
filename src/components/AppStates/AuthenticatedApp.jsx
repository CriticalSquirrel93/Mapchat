import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Layout} from "../Layout";
import {Landing} from "../Landing";
import {Homepage} from "../Homepage";
import {Login} from "../Login";
import {ResetPassword} from "../ResetPassword";
import {Signup} from "../Signup";
import {Chat} from "../Chat";
import React from "react";
import Profile from "../Profile";
import {NotFound} from "../NotFound";

export const AuthenticatedApp = () => {
    return (
        <>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path = "/" element = { <Layout /> }>
                            <Route index element = { <Landing /> } ></Route>
                            <Route path = "/home" element = { <Homepage /> }></Route>
                            <Route path = "/login" element = { <Login /> }></Route>
                            <Route path = "/reset" element = { <ResetPassword />} ></Route>
                            <Route path = "/signup" element = { <Signup /> } ></Route>
                            <Route path = "/profile" element = { <Profile /> } ></Route>
                            <Route path = "/chat" element = { <Chat /> }></Route>
                            <Route path="*" element={ <NotFound />} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </>
    )
}