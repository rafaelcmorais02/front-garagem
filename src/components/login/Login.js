import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [connectionStatus, setConnectionStatus] = useState(false)
    const handlerSubmit = () => {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const data = JSON.stringify({
            "username": email,
            "password": password
        });

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
                setConnectionStatus(true)
                console.log(data)
            })
            .catch((error) => {
                window.alert('erro ao realizar a chamada')
                console.log(error)
            })
    }
    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="button" className="btn btn-primary" onClick={handlerSubmit}>Submit</button>
                <h1>{connectionStatus ? 'True' : 'False'}</h1>
            </form>
        </>
    )
}

export default Login