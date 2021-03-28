import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from '../auth/AuthProvider'
import { Link, useHistory } from "react-router-dom"

import "./NavBar.css"
import Logo from "./homeiot.jpg"

export const NavBar = () => {
    const { getUserAdminStatus, isAdmin } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        getUserAdminStatus()
    }, [])

    return (
        <ul className="mt-3">
            <div className="d-flex flex-row flex-nowrap">
                <li className="navbar__item mx-3">
                    <Link to="/">
                        <img className="navbar__logo rounded-circle" alt="" src={Logo} />
                    </Link>
                </li>
                <li className="navbar__item mx-3">
                    <div className="d-flex justify-content-center">
                        <Link to="/devices" className="btn btn-outline-primary w-100">All Devices</Link>
                    </div>
                </li>
                <li className="navbar__item mx-3">
                    <div className="d-flex justify-content-center">
                        <Link to="/user/devices" className="btn btn-outline-primary w-100">My Devices</Link>
                    </div>
                </li>
                {/* <li className="navbar__item mx-3">
                    <div className="d-flex justify-content-center">
                        <Link to="/subscriptions" className="btn btn-outline-primary w-100">My Subscriptions</Link>
                    </div>
                </li> */}
                {isAdmin ? (
                    <li className="navbar__item mx-3">
                        <div className="d-flex justify-content-center">
                            <Link to="/locations" className="btn btn-outline-primary w-100">Location Manager</Link>
                        </div>
                    </li>
                ) : (<></>)}
                {isAdmin ? (
                    <li className="navbar__item mx-3">
                        <div className="d-flex justify-content-center">
                            <Link to="/sensortypes" className="btn btn-outline-primary w-100">Sensor Manager</Link>
                        </div>
                    </li>
                ) : (<></>)}
                {isAdmin ? (
                    <li className="navbar__item mx-3">
                        <div className="d-flex justify-content-center">
                            <Link to="/tags" className="btn btn-outline-primary w-100">Tag Manager</Link>
                        </div>
                    </li>
                ) : (<></>)}
                {/* Change 'true' to whatever the is_admin check will be */}
                {isAdmin ? (
                    <li className="navbar__item mx-3">
                        <div className="d-flex justify-content-center">
                            <Link to="/users" className="btn btn-outline-primary w-100">User Manager</Link>
                        </div>
                    </li>
                ) : (<></>)}
                <li className="navbar__item mx-3">
                    <div className="d-flex justify-content-center">
                        <Link to="/userpreferences" className="btn btn-outline-primary w-100">User Preferences</Link>
                    </div>
                </li>
                {
                    (localStorage.getItem("homeiot_user_id") !== null) ?
                        <li className="navbar__item ml-auto mr-3">
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-outline-primary w-100"
                                    onClick={() => {
                                        localStorage.removeItem("homeiot_user_id");
                                        history.push({ pathname: "/" });
                                    }}
                                >Logout</button>
                            </div>
                        </li> :
                        <>
                            <li className="navbar__item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="navbar__item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                }
            </div>
        </ul>
    )
}