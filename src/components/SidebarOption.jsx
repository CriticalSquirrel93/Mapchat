/*
Description:
    SidebarOption component for rendering individual navigation options in the sidebar.
Usage:
    - Displays a text option with an optional indicator for being active.
Credit:
    * Ash
*/
import React from "react";

// SidebarOption component for rendering individual navigation options in the sidebar.
export function SidebarOption({ text }) {
    return (
        <>
            {/* Container for individual sidebar option */}
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                {/* Heading to display the text of the option */}
                <h2>{text}</h2>
            </div>
        </>
    );
}
