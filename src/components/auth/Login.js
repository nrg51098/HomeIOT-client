import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"

export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const errorDialog = useRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch('http://127.0.0.1:8000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid) {
                    localStorage.setItem("homeiot_user_id", res.token)
                    history.push("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
            .catch(err => errorDialog.current.showModal())
    }

    return (
        <main className="container vh-100">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Email or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <dialog className="dialog dialog--auth" ref={errorDialog}>
                <div>Could not contact server.</div>
                <button className="button--close" onClick={e => errorDialog.current.close()}>Close</button>
            </dialog>
            <header>
                <h1 className="mt-5 text-center">Rare</h1>
            </header>
            <div className="mt-5">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img className="mt-5" src="https://via.placeholder.com/200x75" />
                </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center h-50">
                <form onSubmit={handleLogin}>
                    <input ref={username} type="text" id="username" className="form-control mb-5" placeholder="Username" required autoFocus />
                    <input ref={password} type="password" id="password" className="form-control mb-5" placeholder="Password" required />
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-primary w-100" type="submit">Login</button>
                    </div>
                </form>
                <div className="mt-3">
                    <small className="underline text-primary">
                        <Link to="/register">
                            Don't have an account yet? Click here to sign up!
                        </Link>
                    </small>
                </div>
            </div>
        </main >
    )
}