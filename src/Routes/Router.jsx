import React from "react";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ToDos from "../pages/ToDos";
import NotFound from "../pages/NotFound";
import { LoggedInRoute, PrivateRoute } from "../libs/useAuth";

import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate replace to="/signin" />,
    },
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
        errorElement: <NotFound />,
    },
]);

export default router;
