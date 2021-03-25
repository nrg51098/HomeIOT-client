import React, { useState, useContext, useEffect, useRef } from "react"
import { Link, useHistory } from 'react-router-dom'
import { DeviceContext } from "./DeviceProvider"
import { TagContext } from "../tags/TagProvider"
import { AuthContext } from '../auth/AuthProvider'
import "./Devices.css"

export const DeviceTable = () => {
    const { getDevices, devices, searchTerms, releaseDevice, partialyUpdateDevice } = useContext(DeviceContext)
    const { tags, searchTags } = useContext(TagContext)
    const { isAdmin } = useContext(AuthContext)
    const history = useHistory();
    const deleteDeviceModal = useRef();

    const [userId, setUserId] = useState(-1)
    const [filteredDevices, setFiltered] = useState([])
    const [deviceToBeDeleted, setDeviceToBeDeleted] = useState(0)

    const getUserId = () => {
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
            .then(res => setUserId(res.user_id))
    }

    // Initialization effect hook -> Go get device data
    useEffect(() => {
        getDevices()
        getUserId()
    }, [])

    useEffect(() => {
        devices.sort((a, b) => (a.created_datetime > b.created_datetime) ? -1 : 1)
        const matchingDevices = devices.filter(device => device.name.toLowerCase().includes(searchTerms.toLowerCase()))
        let validDevices = []
        isAdmin ? 
        (validDevices = matchingDevices.filter((device) => (Date.parse(device.created_datetime) < Date.now()))) :
        (validDevices = matchingDevices.filter((device) => (Date.parse(device.created_datetime) < Date.now())))      
        setFiltered(validDevices)
    }, [searchTerms])

    

    useEffect(() => {
        devices.sort((a, b) => (a.created_datetime > b.created_datetime) ? -1 : 1)
        let validDevices = []
        isAdmin ?
        (validDevices = devices.filter((device) => (Date.parse(device.created_datetime) < Date.now()))) :
        (validDevices = devices.filter((device) => (Date.parse(device.created_datetime) < Date.now())))
        setFiltered(validDevices)
    }, [devices])

    const handleIsActiveUpdate = e => {
        const deviceId = parseInt(e.target.value)
        const partialObject = {"is_active" : e.target.checked }    
        partialyUpdateDevice(deviceId, partialObject)        
    }

    const handleIsPublicUpdate = e => {
        const deviceId = parseInt(e.target.value)
        const partialObject = {"is_public" : e.target.checked }    
        partialyUpdateDevice(deviceId, partialObject)        
    }

    return (
        <div>
            <dialog className="dialog dialog--deleteDevice" ref={deleteDeviceModal}>
                <h4>Are you sure you want to delete this device?</h4>
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                    <button className="deleteDevice btn btn-outline-primary" onClick={() => {
                        releaseDevice(deviceToBeDeleted)
                            .then(history.push("/devices"))
                            .then(deleteDeviceModal.current.close())
                    }}>Ok</button>
                    <button className="btn btn-outline-primary" onClick={e => deleteDeviceModal.current.close()}>Cancel</button>
                </div>
            </dialog>
            <div className="d-flex flex-row justify-content-end">
                <button className="d-flex flex-row justify-content-center align-items-center device__add btn btn-primary mr-5"
                    onClick={() => history.push("/devices/create")}
                >
                    Add Device
                    <i className="fas fa-plus ml-4 mr-2"></i>
                </button>
            </div>
            <div className=" devices device__table mt-5 mx-3 px-3">
                <table className="alldevices table table-bordered table-hover table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Created By</th>
                            <th scope="col">Date</th>
                            <th scope="col">Location</th>
                            <th scope="col">Sensortype</th>
                            <th scope="col">Tags</th>
                            {isAdmin ? (<th scope="col">Is_Active</th>) : (<></>) }
                            {isAdmin ? (<th scope="col">Is_Public</th>) : (<></>) }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredDevices.map(device => (
                                <tr key={device.id}>
                                    {((device.appuser && device.appuser.id) == userId) || (isAdmin) ? (
                                        <td className="p-0">
                                            <div className="d-flex flex-row justify-content-around h-100 align-items-center">
                                                <Link to={`devices/edit/${device.id}`} ><i className="fas fa-cog"></i></Link>
                                                <i className="far fa-trash-alt text-danger device__hover__delete"
                                                    onClick={() => {
                                                        setDeviceToBeDeleted(device.id)
                                                        deleteDeviceModal.current.showModal()
                                                    }}
                                                ></i>
                                            </div>
                                        </td>) : <td></td>}
                                    <td><Link to={`/devices/${device.id}`}>{device.name}</Link></td>
                                    <td>{device.appuser && device.appuser.user.first_name} {device.appuser && device.appuser.user.last_name}</td>
                                    <td>{device.created_datetime}</td>
                                    <td>{device.location.label}</td>
                                    <td>{device.sensor_type.label}</td>
                                    <td>{device.tag && device.tag.map(tag => (
                                        <div key={tag.id}>{tag.label}</div>
                                    ))}</td>
                                    {isAdmin ? (<td>
                                        <input type="checkbox" name="isActive" checked={device.is_active} value={device.id} onChange={handleIsActiveUpdate} />
                                        </td>) : (<></>) }
                                    {isAdmin ? (<td>
                                        <input type="checkbox" name="isPublic" checked={device.is_public} value={device.id} onChange={handleIsPublicUpdate} />
                                        </td>) : (<></>) }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}