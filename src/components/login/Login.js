import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
    useEffect(() => {
        const authentication = localStorage.getItem('authentication')
        if (authentication) {
            console.log(`Informação armazenada localmente${authentication}`)
        }
    }, [])
    let navigate = useNavigate();
    const handleSubmit = (event) => {
        window.alert('Algo foi enviado')
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const data = JSON.stringify({
            "username": email,
            "password": password
        });
        event.preventDefault()

        const config = {
            method: 'post',
            url: 'http://localhost:8000/api/v1/users/api-token-auth/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then((data) => {
                window.alert('chamada realizada com sucesso')
                console.log(data)
                const authentication = {
                    token: data.data.token,
                    user: email,
                    password: password
                }
                navigate('/garages', { state: { data: data.data } })
                localStorage.setItem("authentication", JSON.stringify(authentication));
            })
            .catch((error) => {
                window.alert('erro ao realizar a chamada')
                console.log(error.request.response)
            })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Faça seu login:</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Seu endereço de email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">Aplicação feita para testes. Por segurança não forneça dados reais</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
            <h3>Caso não tenha conta, registre-se aqui:</h3>
        </>
    )
}

export default Login