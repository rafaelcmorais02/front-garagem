import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useLocation } from "react-router-dom";
import './garages.css'

const Garages = () => {
    const [garage, setGarage] = useState({
        garages: [],
        vehicles: {}
    })
    const [flagGarage, setFlagGarage] = useState(false)

    const state = useLocation()
    const email = state.state.data.email
    const userId = state.state.data.user_id

    useEffect(() => {
        const frontAPIData = {}
        async function getData() {
            const config = {
                method: 'get',
                url: `http://127.0.0.1:8000/api/v1/garages?user=${userId}`,
                headers: {}
            };
            const garageAPI = await axios(config)
            frontAPIData.garages = garageAPI.data.data
            frontAPIData.vehicles = {}
            for (const garageData of garageAPI.data.data) {
                const config = {
                    method: 'get',
                    url: `http://127.0.0.1:8000/api/v1/garages/vehicles?garage=${garageData.id}`,
                    headers: {}
                };

                const vehicleAPI = await axios(config)
                frontAPIData.vehicles[`${garageData.id}`] = []
                for (const vehicleItem of vehicleAPI.data.data) {
                    frontAPIData.vehicles[`${garageData.id}`].push(vehicleItem)
                }
            }
            setGarage(frontAPIData)
        } getData()
        console.log(frontAPIData)
    }, [])


    const handleRemoveGarage = (garageId) => {
        const config = {
            method: 'delete',
            url: `http://127.0.0.1:8000/api/v1/garages/delete/${garageId}`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.alert('Garagem deletada com sucesso')
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
                window.alert('Erro ao deletar garagem')
            });
    }

    const handleRegisterGarage = () => {
        const garageName = document.getElementById('garageName').value
        if (garageName) {
            const data = {
                garage_name: garageName,
                user: userId
            }
            const config = {
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/garages/register',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    window.alert('Garagem cadastrado com sucesso')
                    window.location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            window.alert('Preencha todos os campos para continuar')
        }
    }

    const handlerVehicleRegister = () => {
        const garagem = document.getElementById('garagem').value
        const tipo = document.getElementById('tipo').value
        const modelo = document.getElementById('modelo').value
        const cor = document.getElementById('cor').value

        if (garagem && tipo && modelo && cor) {
            const data = {
                garage: garagem,
                type: tipo,
                model: modelo,
                color: cor,
            }
            const config = {
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/garages/vehicle/register',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then(function (response) {
                    window.alert('Veículo cadastrado com sucesso')
                    document.getElementById('garagem').value = ''
                    document.getElementById('tipo').value = ''
                    document.getElementById('modelo').value = ''
                    document.getElementById('cor').value = ''
                    window.location.reload();
                })
                .catch(function (error) {
                    window.alert('Erro no cadastro do veiculo')
                });
        } else {
            window.alert('Preencha todos os campos para continuar')
        }
    }

    const addGarage = () => {
        if (flagGarage) {
            return (
                <>
                    <form className="customForm">
                        <div className="mb-3">
                            <label htmlFor="garageName" className="form-label">Nome da garagem</label>
                            <input type="text" className="form-control" id="garageName" />
                        </div>

                        <button type="button" className="btn btn-dark" onClick={handleRegisterGarage}>Registrar</button>
                    </form>
                </>
            )
        }
    }

    const formVehicles = () => {
        if (garage.garages[0]) {
            return (
                <form className="customForm">
                    <h1>Registrar veículo:</h1>
                    <hr></hr>
                    <div className="mb-3">
                        <label htmlFor="garagem" className="form-label">Escolha sua garagem</label>
                        <select className="form-select" id="garagem">
                            <option defaultValue>Choose...</option>
                            {(garage.garages || []).map(garageData => {
                                return (
                                    <option key={garageData.id} value={garageData.id}>{garageData.garage_name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tipo" className="form-label">Escolha a categoria</label>
                        <select className="form-select" id="tipo">
                            <option defaultValue>Choose...</option>
                            <option value="C">Carro</option>
                            <option value="M">Moto</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="modelo" className="form-label">Modelo</label>
                        <input type="text" className="form-control" id="modelo" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cor" className="form-label">Cor</label>
                        <input type="text" className="form-control" id="cor" />
                    </div>
                    <button type="button" className="btn btn-dark" onClick={handlerVehicleRegister}>Registrar</button>
                </form>
            )
        }
    }

    const addGarageForm = () => {
        setFlagGarage(!flagGarage)
    }

    return (
        <div>
            <div className='customTitle' >
                <h1>
                    Bem vindo {email}
                </h1>
            </div>
            <hr></hr>
            <div className='customCreateGarage'>
                <h2>
                    Clique abaixo para criar uma garagem
                </h2>
                <button type="button" className="btn btn-success CustomAddButton" onClick={addGarageForm}>Adicionar</button>
                {addGarage()}
            </div>
            <hr></hr>
            <div className='customRow'>
                <div className='customColumn'>
                    {(garage.garages || []).map(garageData => {
                        return (
                            <div className="customCard" key={garageData.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{garageData.garage_name}</h5>
                                        <p className="card-text">Abaixo estão os veículos associados a sua garagem</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        {(garage.vehicles[`${garageData.id}`] || []).map(vehicleData => {
                                            return (
                                                <div key={vehicleData.id}>
                                                    < li className="list-group-item" >{`${vehicleData.type} - ${vehicleData.model} - ${vehicleData.color}`}</li>
                                                </div>
                                            )
                                        })}
                                    </ul>
                                    <div className="card-body">
                                        <button type="button" className="btn btn-dark" onClick={() => { handleRemoveGarage(garageData.id) }}>Remover</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='customColumn'>
                    {formVehicles()}
                </div>
            </div>
        </div >
    )
}
export default Garages