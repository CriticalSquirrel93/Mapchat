/*
Description:
    Checkbox component representing a styled checkbox input with a label.

Usage:
    - Renders a checkbox input with a corresponding label.
    - Props include id, label, checked state, and an onChange function.

Credit:
    * Original idea and implementation in Django + Firebase by Chris
    * Ported and modularized into a component for React + Firebase by Ash
*/
// Import necessary dependencies from React
import React from "react";

// Checkbox component for a styled checkbox input
export const Checkbox = ({ id, label, checked, onChange }) => {
    return (
        <>
            {/* Container for the checkbox input and label */}
            <div className="input-group mb-3">
                {/* Checkbox input with specified id, checked state, and onChange function */}
                <input id={id} value={checked} type="checkbox" onChange={onChange} className="toggle" />
                {/* Label associated with the checkbox input */}
                <label htmlFor={id}> {label} </label>
            </div>
        </>
    );
};
