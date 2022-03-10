import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./components/login/Login";
import Garages from "./components/garages/Garages";

const webRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login></Login>} path="/" exact />
                <Route element={<Garages></Garages>} path="/garages" exact />
            </Routes>
        </BrowserRouter>
    )
}

export default webRoutes;