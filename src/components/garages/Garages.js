import React from "react";
import { useLocation } from "react-router-dom";

const Garages = () => {
    const state = useLocation()
    const email = state.state.data.email
    return (
        <h1>
            Bem vindo {email}
        </h1>
    )
}
export default Garages