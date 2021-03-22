import React, { useState } from "react"

export const DeviceContext = React.createContext()

export const DeviceProvider = (props) => {
    const [devices, setDevices] = useState([])
    const [searchTerms, setTerms] = useState("")


    const getDevices = () => {
        return fetch("http://localhost:8000/devices", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
            }
        })
            .then(res => res.json())
            .then(setDevices)
    }

    const getDevicesByCurrentUserId = () => {
        const body = { "token": `${localStorage.getItem("homeiot_user_id")}` }
        return fetch("http://localhost:8000/get_current_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                fetch(`http://localhost:8000/devices?user=${res.appuser_id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
                    }
                })
                    .then(res => res.json())
                    .then(res => setDevices(res.devices))
            })
    }

    const getDevicesByUserId = (userId) => {
        return fetch(`http://localhost:8000/devices?user=${userId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
            }
        })
            .then(res => res.json())
            .then(res => setDevices(res.devices))
    }


    const getDeviceById = (id) => {
        return fetch(`http://localhost:8000/devices/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
            }
        })
            .then(res => res.json())
    }

    const addDevice = device => {
        return fetch("http://localhost:8000/devices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
            },
            body: JSON.stringify(device)
        })
            .then(res => res.json())
    }

    const updateDevice = device => {
        return fetch(`http://localhost:8000/devices/${device.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
            },
            body: JSON.stringify(device)
        })
            .then(getDevices)
    }

    const releaseDevice = (deviceId) => {
        return fetch(`http://localhost:8000/devices/${deviceId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
            },
        })
            .then(getDevices)
    }

    const partialyUpdateDevice = (deviceId, partialBody) => {
        return fetch(`http://localhost:8000/devices/${deviceId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
            },
            body: JSON.stringify(partialBody)
        })
            .then(getDevices)
    }

    return (
        <DeviceContext.Provider value={{
            devices, addDevice, getDevices, getDeviceById, getDevicesByUserId,
            searchTerms, setTerms, releaseDevice, updateDevice,
            getDevicesByCurrentUserId, partialyUpdateDevice
        }}>
            {props.children}
        </DeviceContext.Provider>
    )
}