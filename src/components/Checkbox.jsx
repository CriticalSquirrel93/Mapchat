import React from "react";

export const Checkbox = ({ id, label, checked, onChange }) => {
    return (
        <>
            <div className="input-group mb-3">
                <input id = { id } value = { checked } type = "checkbox" onChange = { onChange } className="toggle" />
                <label htmlFor={id}> { label } </label>
            </div>
        </>
    )
}