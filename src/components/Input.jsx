import React from "react";
import {Outlet} from "react-router-dom"

export default function Input({
    label,
    name,
    required = true,
    dataTestId,
    onChange,
    value,children}) {
    return (
        <div>
            <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor={name}
            >
                {label}
            </label>
            <div className="rounded-md relative flex  items-center shadow-sm">
                <input
                    data-testid={dataTestId}
                    value={value}
                    id={name}
                    type={name}
                    required={required}
                    onChange={onChange}
                    className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                 />
            </div>
        {children}
        </div>
    );
}
