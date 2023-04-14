import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import ToDos from "../ToDos";
import NotFound from "../NotFound";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/todo" element={<ToDos />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;
