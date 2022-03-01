import React from "react";
import { useLocation } from "react-router-dom";
import './garages.css'

const Garages = () => {
    const state = useLocation()
    const email = state.state.data.email
    return (
        <div>
            <div className='customTitle' >
                <h1>
                    Bem vindo {email}
                </h1>
            </div>
            <hr></hr>
            <div className='customGrid'>
                <div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Sua garagem</h5>
                            <p className="card-text">Abaixo estão os veículos associados a sua garagem</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">An item</li>
                            <li className="list-group-item">A second item</li>
                            <li className="list-group-item">A third item</li>
                        </ul>
                        <div className="card-body">
                            <a href="a" className="card-link">Card link</a>
                            <a href="a" className="card-link">Another link</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Garages