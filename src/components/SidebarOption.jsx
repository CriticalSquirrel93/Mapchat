import React from "react";

export function SidebarOption({text, active}) {
    return (
        <>
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <h2>{ text }</h2>
            </div></>
    )
}