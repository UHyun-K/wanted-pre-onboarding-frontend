import React from "react";
import { cls } from "../libs/utils";

export default function Button({ disabled = "", dataTestId, type, text }) {
    return (
        <button
            data-testid={dataTestId}
            type={type}
            disabled={disabled}
            className={cls(
                "w-full  text-white  px-4 border border-transparent rounded-md shadow-sm font-medium focus:outline-none p-3",
                disabled
                    ? "bg-gray-300"
                    : "bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 "
            )}
        >
            {text}
        </button>
    );
}
