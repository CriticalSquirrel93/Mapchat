/*
Description:
    Homepage component rendering the user's homepage with a sidebar and feed.
Usage:
    - Displayed when a user navigates to their homepage.
    - Utilizes Sidebar and Feed components.
Credit:
    * Ash
*/
import React from "react";
import { Sidebar } from "./Sidebar";
import { Feed } from "./Feed";

/**
 * Homepage component renders the user's homepage with a sidebar and feed.
 */
export function Homepage() {
    return (
        <>
            {/* Container for homepage content with vertical overflow */}
            <div className="container overflow-y-auto">
                <div className="container">
                    <div className="row">
                        {/* Sidebar column */}
                        <div className="col col-3">
                            <Sidebar />
                        </div>
                        {/* Feed column */}
                        <div className="col col-6">
                            <Feed />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
