import React from "react";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import ToDos from "../ToDos";
import NotFound from "../NotFound";
import { LoggedInRoute, PrivateRoute } from "../libs/useAuth";

import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <LoggedInRoute />,
        children: [
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "signin",
                element: <SignIn />,
            },
        ],
        errorElement: <NotFound />,
    },

    {
        path: "/",
        element: <PrivateRoute />,
        children: [
            {
                path: "todo",
                element: <ToDos />,
            },
        ],
    },
]);

export default router;
